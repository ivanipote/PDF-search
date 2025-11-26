const REPO_OWNER = "ivanipote";
const REPO_NAME = "PDF-search";
const FOLDER_PATH = "premium";   // ← dossier premium à la racine, pas premium/files

const API_URL = `https://api.github.com/repos/\( {REPO_OWNER}/ \){REPO_NAME}/contents/${FOLDER_PATH}`;
const RAW_BASE = `https://raw.githubusercontent.com/\( {REPO_OWNER}/ \){REPO_NAME}/main/${FOLDER_PATH}/`;

let allFiles = [];

async function loadFiles() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Dossier premium introuvable");
    const data = await response.json();

    allFiles = data
      .filter(item => item.type === "file" && item.size > 100)
      .map(file => ({
        name: file.name,
        url: RAW_BASE + encodeURIComponent(file.name),
        size: file.size,
        type: getFileType(file.name)
      }));

    if (allFiles.length === 0) {
      document.getElementById('results').innerHTML = "<p style='text-align:center;color:#94a3b8;margin:120px 0;font-size:1.4rem'>Dossier vide<br>Ajoute des fichiers dans /premium/</p>";
      return;
    }
    displayResults(allFiles);
  } catch (err) {
    document.getElementById('results').innerHTML = `<p style="text-align:center;color:#f87171;margin:100px 0;">${err.message}</p>`;
  }
}

function getFileType(n) { const e = n.split('.').pop().toLowerCase(); return ["pdf"].includes(e)?"pdf":["jpg","jpeg","png","gif","webp","svg"].includes(e)?"image":["mp3","wav","ogg","m4a"].includes(e)?"audio":["mp4","webm","mov"].includes(e)?"video":"other"; }
function formatSize(b) { if (!b) return "?"; const m = b/(1024*1024); return m<1?(b/1024).toFixed(1)+" Ko":m.toFixed(1)+" Mo"; }
function getIcon(t) { return {pdf:"fa-file-pdf",image:"fa-image",audio:"fa-file-audio",video:"fa-file-video",other:"fa-file"}[t] || "fa-file"; }

function displayResults(files) {
  const c = document.getElementById('results'); c.innerHTML = "";
  files.forEach(f => {
    const url = RAW_BASE + encodeURIComponent(f.name);
    let btn = "";
    if (f.type==="pdf") btn = `<button onclick="openPreview('${url}')" class="btn-preview">Aperçu</button>`;
    if (f.type==="image") btn = `<button onclick="openPreview('${url}')" class="btn-preview">Voir</button>`;
    if (f.type==="audio") btn = `<button onclick="playAudio('\( {url}',' \){f.name}')" class="btn-preview">Écouter</button>`;

    c.innerHTML += `
      <div class="card">
        <div class="card-header"><i class="far ${getIcon(f.type)}"></i></div>
        <div class="card-body">
          <div class="card-title">${f.name}</div>
          <div class="card-meta">${formatSize(f.size)}</div>
          <div class="card-actions">
            ${btn}
            <a href="${url}" download class="btn-download">Télécharger</a>
          </div>
        </div>
      </div>`;
  });
}

function performSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) { displayResults(allFiles); return; }
  const filtered = allFiles.filter(f => f.name.toLowerCase().includes(q));
  displayResults(filtered);
}

function openPreview(u) {
  const m = document.createElement('div'); m.className="preview-modal"; m.onclick=()=>m.remove();
  m.innerHTML = `<div class="preview-content" onclick="event.stopPropagation()">
    <span onclick="this.parentElement.parentElement.remove()" class="close-preview">×</span>
    \( {u.endsWith('.pdf')?`<iframe src=" \){u}#zoom=100" style="width:100%;height:100%;border:none;"></iframe>`
      :`<img src="${u}" style="max-width:100%;max-height:100%;object-fit:contain;">`}
  </div>`;
  document.body.appendChild(m);
}

function playAudio(u,n) {
  const p = document.createElement('div'); p.className="audio-player";
  p.innerHTML = `<div class="audio-header"><i class="fas fa-music"></i> ${n}
    <span onclick="this.parentElement.parentElement.remove()" class="close-preview">×</span>
  </div><audio controls autoplay style="width:100%;margin-top:10px"><source src="${u}"></audio>`;
  document.body.appendChild(p);
}

document.getElementById('searchInput').addEventListener('input', performSearch);
document.querySelector('.search-btn').addEventListener('click', performSearch);
loadFiles();

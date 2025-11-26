const REPO_OWNER = "ivanipote";
const REPO_NAME = "PDF-search";
const FOLDER_PATH = "premium/files";

const API_URL = `https://api.github.com/repos/\( {REPO_OWNER}/ \){REPO_NAME}/contents/${FOLDER_PATH}`;
const RAW_BASE = `https://raw.githubusercontent.com/\( {REPO_OWNER}/ \){REPO_NAME}/main/${FOLDER_PATH}/`;

let allFiles = [];

// Charge tous les fichiers du dossier premium/files
async function loadFiles() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Dossier non trouvé ou repo privé");
    const data = await response.json();

    allFiles = data
      .filter(item => item.type === "file")
      .map(file => ({
        name: file.name,
        url: file.download_url || RAW_BASE + encodeURIComponent(file.name),
        size: file.size,
        type: getFileType(file.name)
      }));

    displayResults(allFiles);
  } catch (err) {
    document.getElementById('results').innerHTML = `
      <p style="text-align:center;color:#f87171;margin:100px 0;">
        Erreur : ${err.message}<br>
        Vérifie que le dossier <strong>premium/files</strong> existe et contient des fichiers.
      </p>`;
  }
}

function getFileType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (["pdf"].includes(ext)) return "pdf";
  if (["jpg","jpeg","png","gif","webp","svg","bmp"].includes(ext)) return "image";
  if (["mp3","wav","ogg","m4a","aac"].includes(ext)) return "audio";
  if (["mp4","webm","mov","avi","mkv"].includes(ext)) return "video";
  if (["doc","docx","xls","xlsx","ppt","pptx"].includes(ext)) return "office";
  return "other";
}

function formatSize(bytes) {
  if (!bytes) return "Taille inconnue";
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + " Ko";
  return (kb / 1024).toFixed(1) + " Mo";
}

function getIcon(type) {
  const icons = {
    pdf: "fa-file-pdf",
    image: "fa-image",
    audio: "fa-file-audio",
    video: "fa-file-video",
    office: "fa-file-word",
    other: "fa-file"
  };
  return icons[type] || icons.other;
}

function displayResults(files) {
  const container = document.getElementById('results');
  if (files.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#94a3b8;margin:120px 0;font-size:1.4rem'>Aucun fichier trouvé</p>";
    return;
  }

  container.innerHTML = "";
  files.forEach(file => {
    const rawUrl = RAW_BASE + encodeURIComponent(file.name);
    let actionBtn = "";

    if (file.type === "pdf") {
      actionBtn = `<button onclick="openPreview('${rawUrl}', 'pdf')" class="btn-preview">Aperçu</button>`;
    } else if (file.type === "image") {
      actionBtn = `<button onclick="openPreview('${rawUrl}', 'image')" class="btn-preview">Voir</button>`;
    } else if (file.type === "audio") {
      actionBtn = `<button onclick="playAudio('\( {rawUrl}', ' \){file.name}')" class="btn-preview">Écouter</button>`;
    }

    const card = `
      <div class="card">
        <div class="card-header">
          <i class="far ${getIcon(file.type)}"></i>
        </div>
        <div class="card-body">
          <div class="card-title">${file.name}</div>
          <div class="card-meta">${formatSize(file.size)}</div>
          <div class="card-actions">
            ${actionBtn}
            <a href="${rawUrl}" download class="btn-download">Télécharger</a>
          </div>
        </div>
      </div>`;
    container.innerHTML += card;
  });
}

function performSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!query) {
    displayResults(allFiles);
    return;
  }
  const filtered = allFiles.filter(f => 
    f.name.toLowerCase().includes(query)
  );
  displayResults(filtered);
}

// Aperçu PDF / Image
function openPreview(url, type) {
  const modal = document.createElement('div');
  modal.className = "preview-modal";
  modal.onclick = () => modal.remove();
  modal.innerHTML = `
    <div class="preview-content" onclick="event.stopPropagation()">
      <span onclick="this.parentElement.parentElement.remove()" class="close-preview">&times;</span>
      ${type === 'pdf' 
        ? `<iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>`
        : `<img src="${url}" style="max-width:100%;max-height:100%;object-fit:contain;">`
      }
    </div>`;
  document.body.appendChild(modal);
}

// Lecteur audio
function playAudio(url, name) {
  const player = document.createElement('div');
  player.className = "audio-player";
  player.innerHTML = `
    <div class="audio-header">
      <i class="fas fa-music"></i> ${name}
      <span onclick="this.parentElement.parentElement.remove()" class="close-preview">&times;</span>
    </div>
    <audio controls autoplay style="width:100%;margin-top:10px">
      <source src="${url}" type="audio/mpeg">
    </audio>`;
  document.body.appendChild(player);
}

// Événements
document.getElementById('searchInput').addEventListener('input', performSearch);
document.querySelector('.search-btn').addEventListener('click', performSearch);

// Démarrage
loadFiles();
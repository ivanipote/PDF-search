// script.js – À LA RACINE DU REPO

const MOT_DE_PASSE = "MEGANE2025"; // ← Tu changes ici quand tu veux !!

if (localStorage.getItem("meganeConnected") === "yes") {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("mainSite").style.display = "block";
}

document.getElementById("loginBtn")?.addEventListener("click", () => {
  const input = document.getElementById("passwordInput").value.trim();
  if (input === MOT_DE_PASSE) {
    localStorage.setItem("meganeConnected", "yes");
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainSite").style.display = "block";
  } else {
    alert("❌ Mot de passe incorrect");
  }
});

// Onglet actif
document.querySelectorAll(".bottom-nav a").forEach(a => {
  if (a.href === location.href) a.classList.add("active");
});

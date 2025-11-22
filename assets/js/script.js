// assets/js/script.js

// === CHANGE LE MOT DE PASSE ICI QUAND TU VEUX (majuscules/minuscules sensibles) ===
const MOT_DE_PASSE = "MEGANE2025";

// Vérifie si l'utilisateur est déjà connecté
if (localStorage.getItem("meganeConnected") === "yes") {
  showMainSite();
} else {
  showLoginScreen();
}

function showLoginScreen() {
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("mainSite").style.display = "none";
}

function showMainSite() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("mainSite").style.display = "block";
}

// Validation du mot de passe
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const input = document.getElementById("passwordInput").value.trim();
  if (input === MOT_DE_PASSE) {
    localStorage.setItem("meganeConnected", "yes");
    showMainSite();
  } else {
    alert("❌ Mot de passe incorrect");
  }
});

// Valider avec Entrée
document.getElementById("passwordInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") document.getElementById("loginBtn").click();
});

// Onglet actif dans la barre de nav
document.querySelectorAll(".bottom-nav a").forEach(link => {
  if (link.getAttribute("href") === location.pathname.split("/").pop()) {
    link.classList.add("active");
  }
});

// script.js - VERSION CORRIGÉE (ça marche à 100% maintenant)

const MOT_DE_PASSE = "MEGANE2025"; // ← Tu changes ici quand tu veux !!

const loginScreen = document.getElementById("loginScreen");
const mainSite = document.getElementById("mainSite");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");

// Si déjà connecté → on passe direct
if (localStorage.getItem("meganeConnected") === "yes") {
  loginScreen.style.display = "none";
  mainSite.style.display = "block";
}

// Bouton cliqué OU touche Entrée
const valider = () => {
  const code = passwordInput.value.trim();
  if (code === MOT_DE_PASSE) {
    localStorage.setItem("meganeConnected", "yes");
    loginScreen.style.display = "none";
    mainSite.style.display = "block";
  } else {
    alert("❌ Mot de passe incorrect");
    passwordInput.value = "";
    passwordInput.focus();
  }
};

loginBtn.addEventListener("click", valider);
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") valider();
});

// Onglet actif dans la barre
document.querySelectorAll(".bottom-nav a").forEach(a => {
 0 => {
  if (a.href === location.href) a.classList.add("active");
});

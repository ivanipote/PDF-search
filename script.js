// script.js – PUBLIC (seulement l'onglet actif)
document.querySelectorAll(".bottom-nav a").forEach(a => {
  if (a.href === location.href) a.classList.add("active");
});

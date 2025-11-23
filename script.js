// script.js – PUBLIC (seulement l'onglet actif)
document.querySelectorAll(".bottom-nav a").forEach(a => {
  if (a.href === location.href) a.classList.add("active");
});
const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("closeBtn");

    function openSidebar() {
      sidebar.classList.add("active");
      overlay.classList.add("active");
      hamburger.classList.add("active");
    }

    function closeSidebar() {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
    }

    hamburger.onclick = openSidebar;
    closeBtn.onclick = closeSidebar;
    overlay.onclick = closeSidebar;
  </script>

  <script src="script.js"></script>

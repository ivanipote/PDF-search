const CODES = JSON.parse(localStorage.getItem("meganeCodes") || "[]");

async function initierPaiement() {
  const phone = document.getElementById("phone").value.trim();
  if (!phone || phone.length < 10) {
    alert("Numéro invalide");
    return;
  }

  // Génère le code immédiatement
  const code = "MEGANE-" + Math.random().toString(36).substring(2,8).toUpperCase();
  const expire = Date.now() + (10 * 24 * 60 * 60 * 1000);
  CODES.push({ code, expire, phone });
  localStorage.setItem("meganeCodes", JSON.stringify(CODES));

  // Appelle ton backend Vercel pour envoyer le SMS + paiement
  await fetch("https://ton-site.vercel.app/api/wave-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code })
  });

  alert(`Paiement lancé !\nTu recevras ton code par SMS en 10 secondes\nCode temporaire (au cas où) : ${code}`);

  // Ouvre Wave
  window.open("https://pay.wave.com/m/M_ci_tEommx3CEV8p/c/ci/?amount=5", "_blank");
}

function verifierCode() {
  const input = document.getElementById("codeInput").value.trim().toUpperCase();
  const now = Date.now();
  const valide = CODES.find(c => c.code === input && now < c.expire);

  if (valide) {
    window.location.href = "premium.html";
  } else {
    document.getElementById("error").style.display = "block";
  }
              }

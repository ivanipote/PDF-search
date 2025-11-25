async function payer() {
  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Connexion Wave...";

  try {
    const res = await fetch("https://api.wave.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer sk_live_TA_CLÉ_SECRÈTE_ICI", // ← COLLE TA VRAIE CLÉ ICI
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 50000,
        currency: "XOF",
        description: "Accès Premium Megane Learn",
        success_url: "https://ivanipote.github.io/PDF-search/success.html",
        error_url: "https://ivanipote.github.io/PDF-search/cancel.html"
      })
    });

    const data = await res.json();
    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      throw new Error();
    }
  } catch (e) {
    btn.disabled = false;
    btn.textContent = "Réessayer";
    alert("Erreur Wave – vérifie ta connexion");
  }
                           }

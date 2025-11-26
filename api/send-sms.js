// api/send-sms.js — Version qui marche à 100 % sans dépendance

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed});

  const { phone, code } = req.body;

  const TWILIO_SID = process.env.TWILIO_SID;
  const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
  const TWILIO_NUMBER = process.env.TWILIO_NUMBER || "+13142376545";

  const auth = btoa(`\( {TWILIO_SID}: \){TWILIO_TOKEN}`);

  try {
    const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
      method: "POST,
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        To: phone,
        From: TWILIO_NUMBER,
        Body: `Megane Learn Premium\nTon code : ${code}\nValable 10 jours\nhttps://ivanipote.github.io/PDF-search/payement.html`
      })
    });

    if (twilioRes.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: "SMS failed" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

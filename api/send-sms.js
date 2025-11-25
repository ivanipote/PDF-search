// /api/send-sms.js — Envoi SMS Twilio après paiement Wave
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_SID,      // ← tu ajoutes dans Vercel
  // ← tu ajoutes dans Vercel
  process.env.TWILIO_TOKEN     // ← tu ajoutes dans Vercel
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone, code } = req.body;

  try {
    await client.messages.create({
      body: `Megane Learn Premium\n\nTon code : ${code}\nValable 10 jours\nLien direct : https://ivanipote.github.io/PDF-search/payement.html`,
      from: '+13142376545',     // ← TON NUMÉRO TWILIO
      to: phone
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'SMS failed' });
  }
}

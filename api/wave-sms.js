import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone, code } = req.body;

  try {
    await client.messages.create({
      body: `Megane Learn Premium\nTon code : ${code}\nValable 10 jours\nAccès : https://ivanipote.github.io/PDF-search/payement.html`,
      from: '+15075558799', // ← ton numéro Twilio
      to: phone
    });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "SMS failed" });
  }
      }

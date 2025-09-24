import express from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ⚡ Tus credenciales de PayU sandbox
const apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
const merchantId = "508029";
const currency = "COP";

// Endpoint para generar firma
app.post("/signature", (req, res) => {
  const { referenceCode, amount } = req.body;

  // Fórmula: apiKey~merchantId~referenceCode~amount~currency
  const rawSignature = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
  const signature = crypto.createHash("md5").update(rawSignature).digest("hex");

  res.json({
    merchantId,
    accountId: "512321", // sandbox accountId
    referenceCode,
    amount,
    currency,
    signature,
  });
});

app.listen(4000, () =>
  console.log("✅ Backend corriendo en http://localhost:4000")
);

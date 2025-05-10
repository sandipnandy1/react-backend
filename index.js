//Server code to send emails using SendGrid API for my portfolio website
import express from "express";
import sgMail from "@sendgrid/mail";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
// Set the port for the server
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); //cors is a package that allows you to enable Cross-Origin Resource Sharing (CORS) in your Express application.
// This is useful when your frontend and backend are running on different domains or ports.
app.use(express.json()); 

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email Route
app.post("/send-email", async (req, res) => {
  const { to, from, subject, text } = req.body;
  
  const msg = {
    to,
    from,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ error: "Failed to send email" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
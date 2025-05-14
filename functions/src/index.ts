import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import cors from "cors";
import { Request, Response } from "express";
import * as nodemailer from "nodemailer";

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

// Configure nodemailer with SMTP settings
// You'll need to set these values in your Firebase environment configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email?.user || process.env.EMAIL_USER,
    pass: functions.config().email?.pass || process.env.EMAIL_PASS
  }
});

export const registerUser = functions
  .region("europe-central2")
  .https.onRequest((req: Request, res: Response) => {
    corsHandler(req, res, async () => {
      if (req.method !== "POST") {
        res.status(405).send("Only POST allowed");
        return;
      }
      try {
        const data = req.body;
        
        // Add registration to Firestore
        const docRef = await db.collection("registrations").add({
          ...data,
          paid: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        // Send email notification
        const registrationId = docRef.id;
        await sendRegistrationNotification(data, registrationId);
        
        res.status(200).json({ success: true });
      } catch (err: any) {
        console.error("Error processing registration:", err);
        res.status(500).json({ error: err.message });
      }
    });
  });

/**
 * Sends an email notification about a new registration
 */
async function sendRegistrationNotification(registrationData: any, registrationId: string) {
  const dashboardUrl = "https://buildwithai.lt/dashboard";
  
  const mailOptions = {
    from: functions.config().email?.user || process.env.EMAIL_USER,
    to: "as.koncius@gmail.com",
    subject: "Nauja registracija į kursus - Build with AI",
    html: `
      <h2>Nauja registracija į kursus!</h2>
      <p><strong>Vardas:</strong> ${registrationData.name}</p>
      <p><strong>Amžius:</strong> ${registrationData.age}</p>
      <p><strong>Tėvų el. paštas:</strong> ${registrationData.parentEmail}</p>
      <p><strong>Tėvų tel. numeris:</strong> ${registrationData.parentPhone}</p>
      ${registrationData.info ? `<p><strong>Papildoma informacija:</strong> ${registrationData.info}</p>` : ''}
      ${registrationData.referral ? `<p><strong>Referalo kodas:</strong> ${registrationData.referral}</p>` : ''}
      <p><strong>Registracijos ID:</strong> ${registrationId}</p>
      <p><a href="${dashboardUrl}">Peržiūrėti administravimo skydelyje</a></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Registration notification email sent successfully");
  } catch (error) {
    console.error("Error sending registration notification email:", error);
    // Don't throw the error to prevent registration failure
  }
} 
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import cors from "cors";
import { Request, Response } from "express";

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

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
        await db.collection("registrations").add({
          ...data,
          paid: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        res.status(200).json({ success: true });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });
  }); 
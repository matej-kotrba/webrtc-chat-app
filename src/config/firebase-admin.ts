import admin from "firebase-admin";
import serviceAccount from "./secret"

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
}, "server");

export const firestore = app.firestore();
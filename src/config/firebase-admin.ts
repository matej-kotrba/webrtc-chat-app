import { initializeApp, credential, type ServiceAccount } from "firebase-admin";
import serviceAccount from "./secret.json"

const app = initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount)
});

export const firestore = app.firestore();
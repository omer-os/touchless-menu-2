import { initializeApp, getApps, cert } from "firebase-admin/app";
import { auth } from "firebase-admin";
import admin from "firebase-admin";

const firebaseAdminConfig = {
  credential: cert({
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}

customInitApp();

export const AdminDb = admin.firestore();

export const listAllUsers = async () => {
  const users = await admin.auth().listUsers(1000);
  return users;
};

export async function getUserAuthData(uuid: string) {
  try {
    const userRecord = await auth().getUser(uuid);
    console.log("Successfully fetched user data:", userRecord.toJSON());
    return userRecord; // This object contains all the user's data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Unable to fetch user data");
  }
}

export default admin;

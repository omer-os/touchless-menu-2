import { initializeApp, getApps, cert } from "firebase-admin/app";
import { auth } from "firebase-admin";
import admin from "firebase-admin";
import { Restaurant } from "../firestore/types";

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
    return userRecord; // This object contains all the user's data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Unable to fetch user data");
  }
}

export async function getRestaurantById(restaurantId: string) {
  console.log(restaurantId);

  // try {
  //   const docRef = AdminDb.collection("restaurants").doc(restaurantId);
  //   const docSnap = await docRef.get();
  //   if (docSnap.exists) {
  //     // Convert the Firestore document to a Restaurant object
  //     return { id: docSnap.id, ...docSnap.data() } as Restaurant;
  //   } else {
  //     console.log("No such restaurant!");
  //     return null;
  //   }
  // } catch (error) {
  //   console.error("Error fetching restaurant:", error);
  //   return null;
  // }
  return null;
}

export default admin;

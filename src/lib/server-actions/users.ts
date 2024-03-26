"use server";

import admin from "../firebase/firebase-admin-config";

export async function updateUserRole(formData: FormData) {
  const uid = formData.get("uid") as string;
  const role = formData.get("role") as string;

  return admin
    .auth()
    .setCustomUserClaims(uid, { role })
    .then(() => {
      console.log(`Custom claims set for user ${uid} with role ${role}`);
    })
    .catch((error) => {
      console.error("Error setting custom claims:", error);
    });
}

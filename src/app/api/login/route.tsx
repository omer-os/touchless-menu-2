import { User } from "@/lib/firestore/types";
import admin, { getUserAuthData } from "@/lib/firebase/firebase-admin-config";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Init the Firebase SDK every time the server is called

const db = admin.firestore();

// function setCustomUserClaims(uid: string, role: "user" | "admin") {
//   return admin
//     .auth()
//     .setCustomUserClaims(uid, { role })
//     .then(() => {
//       console.log(`Custom claims set for user ${uid} with role ${role}`);
//     })
//     .catch((error) => {
//       console.error("Error setting custom claims:", error);
//     });
// }

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function GET(request: NextRequest) {
  const sessionCookie = cookies().get("session")?.value || "";

  // Validate if the cookie exists in the request
  if (!sessionCookie) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  try {
    const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);

    if (!decodedClaims) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    const userRef = db.collection("users").doc(decodedClaims.uid);
    const doc = await userRef.get();

    const userData = await getUserAuthData(decodedClaims.uid);

    if (!doc.exists) {
      // User doesn't exist, so add them with a default role of 'user'
      const newUser: User = {
        createdAt: admin.firestore.Timestamp.now(),
        displayName: decodedClaims.name,
        email: decodedClaims.email || "",
        uid: decodedClaims.uid,
      };

      await userRef.set(newUser);
      return NextResponse.json(
        {
          isLogged: true,
          user: newUser,
          role: userData.customClaims?.role || "user",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        isLogged: true,
        user: { ...doc.data(), role: userData.customClaims?.role || "user" },
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors, such as invalid session cookies
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
}

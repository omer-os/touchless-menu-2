// app/api/dashboard/check.ts
import { AdminDb } from "@/lib/firebase/firebase-admin-config";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");

  const sessionCookie = cookies().get("session")?.value || "";

  if (!restaurantId) {
    return new NextResponse(
      JSON.stringify({ error: "Restaurant ID is required" }),
      { status: 400 }
    );
  }
  if (!sessionCookie) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    // Assuming you have a way to verify the session cookie and extract user info
    const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);
    if (!decodedClaims) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Fetch the restaurant document
    const restaurantRef = AdminDb.collection("restaurants").doc(restaurantId);
    const restaurantDoc = await restaurantRef.get();
    if (!restaurantDoc.exists) {
      return new NextResponse(
        JSON.stringify({ error: "Restaurant not found" }),
        { status: 404 }
      );
    }

    // Check if user is in the managerIds array
    const restaurantData = restaurantDoc.data();
    console.log(restaurantData);

    if (restaurantData?.managerIds?.includes(decodedClaims.uid)) {
      // User is a manager
      return new NextResponse(JSON.stringify({ access: true }), {
        status: 200,
      });
    } else {
      // User is not a manager
      return new NextResponse(JSON.stringify({ access: false }), {
        status: 403,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

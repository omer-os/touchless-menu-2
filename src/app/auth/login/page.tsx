"use client";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase/firebase-client.config";

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return;
      }

      fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push("/admin");
        }
      });
    });
  }, []);

  function signIn() {
    signInWithRedirect(auth, provider);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="text-center text-xl font-bold">
            please sign in to access the admin page
          </p>
          <button className="btn btn-primary mt-2" onClick={() => signIn()}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

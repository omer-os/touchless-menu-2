"use client";
import useAdminFunctions from "@/lib/hooks/useAdminFunctions";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { resetDatabase } = useAdminFunctions();
  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <p className="text-xl capitalize">Dashboard</p>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={() => {
            resetDatabase();
          }}
          className="btn btn-error"
        >
          Reset Database
        </button>
      </div>
    </div>
  );
}

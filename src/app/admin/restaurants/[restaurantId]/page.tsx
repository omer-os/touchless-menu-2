"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const { restaurantId } = useParams();
  return (
    <div>
      <h1>Restaurant ID: {restaurantId}</h1>
    </div>
  );
}

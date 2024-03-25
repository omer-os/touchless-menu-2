"use client";
import useRestaurant from "@/lib/hooks/restaurant-hook";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const { restaurants, addRestaurant } = useRestaurant();
  const [NewRestName, setNewRestName] = useState("");

  const { user } = useCurrentUser();

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <div className="card-content bg-base-200 p-2">
          <div className="text-xl font-bold">Add New Restaurant</div>
          <div className="join mt-3">
            <input
              className="input input-bordered join-item"
              placeholder="Restaunrat Name"
              value={NewRestName}
              onChange={(e) => setNewRestName(e.target.value)}
            />
            <button
              onClick={async () => {
                await addRestaurant({
                  name: NewRestName,
                  managerId: user?.uid || "",
                });
              }}
              className="btn btn-primary join-item"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {restaurants.map((rest) => (
          <div key={rest.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{rest.name}</h2>
              <p>{rest.description}</p>
              <div className="card-actions justify-end">
                <Link
                  href={`/admin/restaurants/${rest.id}`}
                  className="btn btn-primary"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

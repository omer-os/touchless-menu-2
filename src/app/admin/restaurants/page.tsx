"use client";
import CreateRestaurant from "@/components/admin/create-restaurant";
import useRestaurant from "@/lib/hooks/useRestaurants";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { restaurants, addRestaurant } = useRestaurant();
  const [NewRestName, setNewRestName] = useState("");
  const { user } = useCurrentUser();

  return (
    <div className="">
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <p className="text-xl capitalize">Restaurants</p>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 ">
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
        <br />
        <CreateRestaurant />
      </div>
    </div>
  );
}

"use client";
import CreateRestaurant from "@/components/admin/create-restaurant";
import useRestaurant from "@/lib/hooks/useRestaurants";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import Link from "next/link";
import React, { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { SidebarOpenAtom } from "../layout";

export default function Page() {
  const { restaurants, addRestaurant } = useRestaurant();
  const [NewRestName, setNewRestName] = useState("");
  const { user } = useCurrentUser();

  const [sidebarOpen, setSidebarOpen] = useAtom(SidebarOpenAtom);

  return (
    <div className="">
      <div className="navbar bg-base-200 sticky top-0 left-0 z-30">
        <div className="flex-1 ps-2">
          <p className="text-xl capitalize">Restaurants</p>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-ghost"
        >
          <HamburgerMenuIcon />
        </button>
      </div>

      <div className="p-4 bg-base-300/50 m-2 rounded-lg">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {restaurants.map((rest) => (
            <div
              key={rest.id}
              className="card card-compact bg-base-100 shadow-xl"
            >
              <figure>
                <img src={rest.image} alt={rest.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{rest.name}</h2>

                <div className="text-neutral-content">
                  <p className="flex justify-between items-center">
                    location : <span>{rest.location}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    phone : <span>{rest.phone}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{rest.phone}</p>
                </div>

                <div className="card-actions justify-end">
                  <Link href={`/admin/restaurants/${rest.id}`}>
                    <button className="btn btn-primary">See Details</button>
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

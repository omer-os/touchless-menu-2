"use client";
import UpdateRestaurantComponent from "@/components/admin/update-restaurant";
import { Manager } from "@/lib/firestore/types";
import useRestaurant from "@/lib/hooks/useRestaurant";
import { CaretLeftIcon, CopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const { restaurantId } = useParams();
  !restaurantId && redirect("/admin/restaurants");

  const { restaurant, deleteRestaurant, updateRestaurant, loading } =
    useRestaurant(restaurantId as string);
  const router = useRouter();

  const [newManagers, setnewManagers] = useState<Manager[]>([]);

  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <button onClick={() => router.back()} className="btn btn-ghost">
            <CaretLeftIcon className="h-6 w-6" />
          </button>
          <a className="text-xl capitalize">{restaurant?.name}</a>
        </div>
        <div className="flex-none">
          <Link className="btn btn-secondary" href="/admin">
            Live Preview
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="card ">
          <div className="card-content flex gap-4">
            <div className="img">
              <div className="avatar">
                <div className="w-60 rounded">
                  <img src={restaurant?.image} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold">
                Restaurant Name : {restaurant?.name}
              </div>
              <div className="text-sm">
                Restaurant Description : {restaurant?.description}
              </div>
              <div className="text-sm">
                Restaurant Location : {restaurant?.location}
              </div>
              <div className="text-sm">
                Restaurant Phone : {restaurant?.phone}
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-error "
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this restaurant?"
                      )
                    ) {
                      deleteRestaurant();
                      router.push("/admin/restaurants");
                    }
                  }}
                >
                  Remove Restaurant
                </button>
                <UpdateRestaurantComponent
                  loading={loading}
                  restaurant={restaurant}
                  updateRestaurant={updateRestaurant}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xl font-bold">Managers</div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>address</th>
                  <th>phone</th>
                  <th>jobRole</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {restaurant?.managers?.map((manager, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(manager.id || "");
                        }}
                        className="btn btn-sm btn-ghost"
                      >
                        <CopyIcon />
                      </button>
                    </td>
                    <td>{manager.name}</td>
                    <td>{manager.address}</td>
                    <td>{manager.phone}</td>
                    <td>{manager.jobRole}</td>
                    <td>
                      <button
                        onClick={() => {
                          updateRestaurant({
                            managers: restaurant.managers?.filter(
                              (m) => m.id !== manager.id
                            ),
                          });
                        }}
                        className="btn btn-sm btn-error"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}

                {newManagers.map((manager, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        placeholder="Manager ID"
                        className="input-bordered input input-sm"
                        value={manager.id}
                        onChange={(e) => {
                          const newManagersCopy = [...newManagers];
                          newManagersCopy[index].id = e.target.value;
                          setnewManagers(newManagersCopy);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Name"
                        className="input-bordered input input-sm"
                        value={manager.name}
                        onChange={(e) => {
                          const newManagersCopy = [...newManagers];
                          newManagersCopy[index].name = e.target.value;
                          setnewManagers(newManagersCopy);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Address"
                        className="input-bordered input input-sm"
                        value={manager.address}
                        onChange={(e) => {
                          const newManagersCopy = [...newManagers];
                          newManagersCopy[index].address = e.target.value;
                          setnewManagers(newManagersCopy);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Phone"
                        className="input-bordered input input-sm"
                        value={manager.phone}
                        onChange={(e) => {
                          const newManagersCopy = [...newManagers];
                          newManagersCopy[index].phone = e.target.value;
                          setnewManagers(newManagersCopy);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Job Role"
                        className="input-bordered input input-sm"
                        value={manager.jobRole}
                        onChange={(e) => {
                          const newManagersCopy = [...newManagers];
                          newManagersCopy[index].jobRole = e.target.value;
                          setnewManagers(newManagersCopy);
                        }}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setnewManagers(
                            newManagers.filter((m, i) => i !== index)
                          );
                        }}
                        className="btn btn-sm btn-error"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex gap-4">
              <button
                className="btn"
                onClick={() => {
                  setnewManagers([
                    ...newManagers,
                    {
                      id: "",
                      name: "",
                      address: "",
                      phone: "",
                      jobRole: "",
                    },
                  ]);
                }}
              >
                Add Manager
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  updateRestaurant({
                    managers: [...(restaurant?.managers || []), ...newManagers],
                    managerIds: [
                      ...(restaurant?.managerIds || []),
                      ...newManagers.map((m) => m.id || ""),
                    ],
                  });
                  setnewManagers([]);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

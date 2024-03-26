"use client";
import UpdateRestaurantComponent from "@/components/admin/update-restaurant";
import { Manager } from "@/lib/firestore/types";
import useRestaurant from "@/lib/hooks/useRestaurant";
import { CaretLeftIcon, CopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const { restaurantId } = useParams();
  !restaurantId && redirect("/admin/restaurants");

  const { restaurant, deleteRestaurant, updateRestaurant, loading } =
    useRestaurant(restaurantId as string);
  const router = useRouter();

  const [newManagers, setnewManagers] = useState<Manager[]>([]);

  return (
    <div>
      <div className="navbar bg-base-200 sticky top-0 left-0 z-30">
        <div className="flex-1 sm:ps-2">
          <button onClick={() => router.back()} className="btn btn-ghost">
            <CaretLeftIcon className="h-6 w-6" />
          </button>
          <a className="text-xl capitalize ps-3">{restaurant?.name}</a>
        </div>

        <div className="flex-none">
          <Link className="btn btn-outline" href="/admin">
            Live Preview
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="card ">
          <div className="card-content flex lg:flex-row flex-col gap-4">
            <div className="img">
              <div className="avatar">
                <div className="sm:w-60 w-full rounded">
                  <img src={restaurant?.image} />
                </div>
              </div>
            </div>

            <div className="flex sm:bg-transparent bg-base-200 sm:p-0 p-4 flex-col gap-2 rounded-box">
              <div className="sm:text-xl text-2xl font-bold">
                Restaurant Name : {restaurant?.name}
              </div>
              <div className="sm:text-sm text-xs">
                Restaurant Description : {restaurant?.description}
              </div>
              <div className="sm:text-sm text-xs">
                Restaurant Location : {restaurant?.location}
              </div>
              <div className="sm:text-sm text-xs">
                Restaurant Phone : {restaurant?.phone}
              </div>

              <div className="flex sm:mt-0 mt-4 gap-2">
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
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

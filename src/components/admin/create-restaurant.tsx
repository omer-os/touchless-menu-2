"use client";
import useRestaurant from "@/lib/hooks/useRestaurants";
import { cn } from "@/lib/utils/cn";
import React, { useState } from "react";

export default function CreateRestaurant() {
  const { addRestaurant } = useRestaurant();
  const [modalOpen, setModalOpen] = useState(false);
  const [Managers, setManagers] = useState([
    {
      id: "",
      name: "",
      address: "",
      phone: "",
      jobRole: "",
    },
  ]);

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    location: "",
    phone: "",
    image: "",
    admin: "",
    managers: [...Managers],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "managerIds") {
      // Assuming manager IDs are entered as comma-separated values
      const ids = value.split(",").map((id: string) => id.trim());
      setRestaurantData((prev) => ({ ...prev, [name]: ids }));
    } else {
      setRestaurantData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleManagerChange = (e: any, index: number, key: string) => {
    const value = e.target.value;
    setManagers((prev) =>
      prev.map((manager, i) =>
        i === index ? { ...manager, [key]: value } : manager
      )
    );
  };

  const handleSubmit = () => {
    // Update restaurantData with the latest Managers state before submission
    const updatedRestaurantData = {
      ...restaurantData,
      managers: Managers, // Ensure this is the latest state of Managers
      managerIds: Managers.map((manager) => manager.id || ""),
    };

    addRestaurant(updatedRestaurantData);
    setModalOpen(false);
  };
  return (
    <div>
      <button
        className="btn w-full md:w-max btn-primary mt-4"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add Restaurant
      </button>
      <dialog className={cn("modal", { "modal-open": modalOpen })}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Create New Restaurant</h3>
          <div className="py-4 flex flex-col w-full">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              className="input input-bordered w-full mb-3"
              value={restaurantData.name}
              onChange={handleChange}
            />
            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full mb-3"
              value={restaurantData.description}
              onChange={handleChange}
            />
            {/* Location */}
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="input input-bordered w-full mb-3"
              value={restaurantData.location}
              onChange={handleChange}
            />
            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="input input-bordered w-full mb-3"
              value={restaurantData.phone}
              onChange={handleChange}
            />
            {/* Image URL */}
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="input input-bordered w-full mb-3"
              value={restaurantData.image}
              onChange={handleChange}
            />
            {/* Admin ID */}
            <input
              type="text"
              name="admin"
              placeholder="Admin ID"
              className="input input-bordered w-full mb-3"
              value={restaurantData.admin}
              onChange={handleChange}
            />
            {/* Managers */}
            {Managers.map((manager, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-lg font-bold">Manager {index + 1}</p>
                <div className="grid grid-cols-4 gap-2 mb-3 mt-2">
                  <input
                    type="text"
                    placeholder="Manager ID"
                    className="input input-bordered"
                    value={manager.id}
                    onChange={(e) => handleManagerChange(e, index, "id")}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={manager.name}
                    onChange={(e) => handleManagerChange(e, index, "name")}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered"
                    value={manager.address}
                    onChange={(e) => handleManagerChange(e, index, "address")}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="input input-bordered"
                    value={manager.phone}
                    onChange={(e) => handleManagerChange(e, index, "phone")}
                  />
                  <input
                    type="text"
                    placeholder="Job Role"
                    className="input input-bordered"
                    value={manager.jobRole}
                    onChange={(e) => handleManagerChange(e, index, "jobRole")}
                  />
                </div>
              </div>
            ))}
            <button
              className="btn btn-sm"
              onClick={() => {
                setManagers((prev) => [
                  ...prev,
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
          </div>

          <div className="modal-action">
            <button onClick={() => setModalOpen(false)} className="btn">
              Close
            </button>
            <button onClick={handleSubmit} className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

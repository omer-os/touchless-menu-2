import React, { useState, useEffect } from "react";
import useRestaurant from "@/lib/hooks/useRestaurant";
import { Restaurant, Manager } from "@/lib/firestore/types"; // Assuming Manager type is defined
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

interface UpdateRestaurantComponentProps {
  restaurant: Restaurant | null;
  updateRestaurant: (restaurant: Restaurant) => Promise<void>;
  loading: boolean;
}

const UpdateRestaurantComponent: React.FC<UpdateRestaurantComponentProps> = ({
  restaurant,
  updateRestaurant,
  loading,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (restaurant) {
      setEditData(restaurant);
    }
  }, [restaurant]);

  if (loading || !editData) return <div>Loading...</div>; // Ensure editData is loaded

  const handleManagerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Manager
  ) => {
    const updatedManagers = editData?.managers?.map((manager, i) =>
      i === index ? { ...manager, [field]: e.target.value } : manager
    );
    if (updatedManagers) {
      setEditData({
        ...editData,
        managers: updatedManagers,
        managerIds: updatedManagers.map((manager) => manager.id || ""),
      });
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!editData) return;
    await updateRestaurant(editData);
    setModalOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Edit Restaurant
      </button>
      <dialog className={cn("modal", { "modal-open": modalOpen })}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Restaurant</h3>
          <div className="py-4 flex flex-col">
            {/* Dynamically create input fields for each restaurant attribute */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editData.name || ""}
              onChange={handleFieldChange}
              className="input input-bordered w-full mb-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editData.description || ""}
              onChange={handleFieldChange as any}
              className="textarea textarea-bordered w-full mb-2"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={editData.location || ""}
              onChange={handleFieldChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={editData.phone || ""}
              onChange={handleFieldChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={editData.image || ""}
              onChange={handleFieldChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="admin"
              placeholder="Admin ID"
              value={editData.admin || ""}
              onChange={handleFieldChange}
              className="input input-bordered w-full mb-2"
            />
            {/* Managers */}
            {editData.managers?.map((manager, index) => (
              <div key={index} className="flex flex-col mb-4">
                <span className="text-lg font-bold">Manager {index + 1}</span>
                <div className="grid grid-cols-2 gap-4">
                  {/* Manager Fields */}
                  <input
                    type="text"
                    placeholder="Manager ID"
                    value={manager.id || ""}
                    onChange={(e) => handleManagerChange(e, index, "id")}
                    className="input input-bordered w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={manager.name || ""}
                    onChange={(e) => handleManagerChange(e, index, "name")}
                    className="input input-bordered w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={manager.address || ""}
                    onChange={(e) => handleManagerChange(e, index, "address")}
                    className="input input-bordered w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={manager.phone || ""}
                    onChange={(e) => handleManagerChange(e, index, "phone")}
                    className="input input-bordered w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Job Role"
                    value={manager.jobRole || ""}
                    onChange={(e) => handleManagerChange(e, index, "jobRole")}
                    className="input input-bordered w-full mb-2"
                  />
                </div>
              </div>
            ))}
            <button className="btn btn-primary mt-4 " onClick={handleSubmit}>
              Save Changes
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateRestaurantComponent;

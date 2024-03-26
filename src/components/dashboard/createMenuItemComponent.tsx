"use client";
import useMenu from "@/lib/hooks/useMenu"; // Adjust the import path as necessary
import { cn } from "@/lib/utils/cn";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { MenuItem } from "@/lib/firestore/types";
import { menuNavigationHistoryAtom } from "@/app/dashboard/[restaurantId]/menu/page";
import { useAtom } from "jotai";

export default function CreateMenuItem({
  restaurantId,
  setMenuItems,
}: {
  restaurantId: string;
  setMenuItems?: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}) {
  const { addMenuItem } = useMenu(restaurantId);
  const [modalOpen, setModalOpen] = useState(false);
  const [navigationHistory, setNavigationHistory] = useAtom(
    menuNavigationHistoryAtom
  );

  const [menuItemData, setMenuItemData] = useState<MenuItem>({
    name: "",
    description: "",
    type: "category",
    parentId: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMenuItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const parentId =
      navigationHistory.length > 0
        ? navigationHistory[navigationHistory.length - 1].id
        : null;

    if (parentId !== undefined) {
      const res = await addMenuItem({
        ...menuItemData,
        parentId,
      });
      setModalOpen(false);
      console.log(res);

      setMenuItems && res && setMenuItems((prev) => [...prev, res]);
    }
  };

  const [itemType, setitemType] = useState<MenuItem["type"]>("category");

  return (
    <div>
      <button
        className="btn w-full md:w-max btn-primary mt-4"
        onClick={() => setModalOpen(true)}
      >
        Add Menu Item
      </button>
      <dialog className={cn("modal", { "modal-open": modalOpen })}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Create New Menu Item</h3>
          <div className="py-4 flex flex-col w-full">
            <div role="tablist" className="tabs tabs-boxed tabs-lg">
              <div
                role="tab"
                className={cn("tab", {
                  "tab-active": itemType === "item",
                })}
                onClick={() => setitemType("item")}
              >
                Product
              </div>

              <div
                role="tab"
                className={cn("tab", {
                  "tab-active": itemType === "category",
                })}
                onClick={() => setitemType("category")}
              >
                Category
              </div>
            </div>

            <br />

            {itemType === "item" ? (
              <div className="flex flex-col">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Item Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={menuItemData.name}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={menuItemData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={menuItemData.price}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={menuItemData.image}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={menuItemData.name}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={menuItemData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={menuItemData.image}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            )}
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

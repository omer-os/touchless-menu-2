"use client";
import MenuItemComponent from "@/components/dashboard/MenuItemComponent";
import CreateMenuItem from "@/components/dashboard/createMenuItemComponent";
import { MenuItem } from "@/lib/firestore/types";
import useMenu from "@/lib/hooks/useMenu";
import { atom, useAtom } from "jotai";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import ProductDetails from "@/components/dashboard/product-details";
export const menuNavigationHistoryAtom = atom<MenuItem[]>([]);

export default function Page() {
  const params = useParams() as { restaurantId: string };
  const { loading, addMenuItem, fetchMenuItems } = useMenu(params.restaurantId);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [navigationHistory, setNavigationHistory] = useAtom(
    menuNavigationHistoryAtom
  );

  useEffect(() => {
    const fetch = async () => {
      const parentId = navigationHistory.length
        ? navigationHistory[navigationHistory.length - 1].id
        : null;
      const res = await fetchMenuItems(parentId);

      setMenuItems(res);
    };

    fetch();
  }, [navigationHistory]);

  const handleBackClick = () => {
    setNavigationHistory((history) => history.slice(0, -1));
  };
  const displayMenuItems =
    navigationHistory.length === 0 ||
    navigationHistory[navigationHistory.length - 1]?.type === "category";

  return (
    <>
      <div className="navbar sticky top-0 left-0 z-30 bg-base-200">
        <div className="flex-1">
          {navigationHistory.length > 0 && (
            <button className="btn btn-ghost me-3" onClick={handleBackClick}>
              <CaretLeftIcon className="w-6 h-6" />
            </button>
          )}
          <p className="text-xl capitalize">
            {navigationHistory.length > 0
              ? navigationHistory[navigationHistory.length - 1].name
              : "Menu"}
          </p>
        </div>
      </div>

      <div className="p-4 bg-base-300/50 m-2 rounded-lg">
        {loading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : displayMenuItems ? (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
            {menuItems.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                restaurantId={params.restaurantId}
                setMenuItems={setMenuItems}
              />
            ))}
          </div>
        ) : (
          <ProductDetails />
        )}

        {displayMenuItems && (
          <CreateMenuItem
            setMenuItems={setMenuItems}
            restaurantId={params.restaurantId}
          />
        )}
      </div>
    </>
  );
}

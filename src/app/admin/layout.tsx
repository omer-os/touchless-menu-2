"use client";
import {
  BackpackIcon,
  CircleBackslashIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="drawer drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <div className="avatar">
              <div className="w-12 rounded">
                <img src="https://avatars.githubusercontent.com/u/66512898?v=4" />
              </div>
            </div>
            <li className="mt-4 flex capitalize w-full">
              <Link
                className={`${
                  pathname === "/admin/restaurants" ? "active" : ""
                }`}
                href="/admin/restaurants"
              >
                <BackpackIcon />
                Restaurants
              </Link>
            </li>

            <li className="mt-4 flex capitalize w-full">
              <Link
                className={`${pathname === "/admin/dashboard" ? "active" : ""}`}
                href="/admin/dashboard"
              >
                <DashboardIcon />
                Dashboard
              </Link>
            </li>

            <li className="mt-4 flex capitalize w-full">
              <Link
                className={`${pathname === "/admin/users" ? "active" : ""}`}
                href="/admin/users"
              >
                <CircleBackslashIcon />
                users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

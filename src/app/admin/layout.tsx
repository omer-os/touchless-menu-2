"use client";
import { cn } from "@/lib/utils/cn";
import {
  BackpackIcon,
  CircleBackslashIcon,
  DashboardIcon,
  PinLeftIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { atom, useAtom } from "jotai";

export const SidebarOpenAtom = atom(false);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useAtom(SidebarOpenAtom);
  const pathname = usePathname();
  const links = [
    {
      path: "/admin/restaurants",
      icon: <BackpackIcon />,
      label: "Restaurants",
    },
    { path: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { path: "/admin/users", icon: <CircleBackslashIcon />, label: "Users" },
  ];

  // Function to extract the second segment of the URL path
  const getSecondPathSegment = (path: string) => {
    const segments = path.split("/").filter(Boolean); // Split and remove empty segments
    return segments[1] || ""; // Return the second segment if available, otherwise an empty string
  };

  const secondSegment = getSecondPathSegment(pathname);

  return (
    <>
      <div
        className={cn("drawer sm:drawer-open", {
          "drawer-open": sidebarOpen,
        })}
      >
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>
        <div
          className={cn(
            "drawer-side sm:!sticky z-50 !fixed inset-0 border-e border-base-300"
          )}
        >
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed top-0 left-0 bottom-0 right-0 bg-base-200 cursor-pointer z-40 bg-opacity-20 sm:hidden"
          ></div>

          <ul className="menu z-50 relative p-4 w-80 min-h-full bg-base-200 text-base-content">
            <div className="flex gap-2 items-center p-3 bg-base-100 rounded-lg shadow-sm">
              <div className="avatar">
                <div className="w-12 rounded">
                  <img src="https://avatars.githubusercontent.com/u/66512898?v=4" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-md font-bold">Omar Ch.</div>
                <div className="text-xs">omerchetin19@gamil.com</div>
              </div>

              <div className="btn btn-ghost ms-auto">
                <PinLeftIcon />
              </div>
            </div>

            <div className="bg-base-100 p-2 mt-5 rounded-lg">
              <li className="menu-title">Admin OverView</li>
              {links.map((link, index) => (
                <li className={`flex capitalize w-full`} key={index}>
                  <Link
                    className={cn({
                      active: secondSegment === getSecondPathSegment(link.path),
                    })}
                    href={link.path}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>

            <div className="mt-auto">
              <MyAwesomeThemeComponent />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

// @ts-ignore
import Cookies from "js-cookie";
function MyAwesomeThemeComponent() {
  const [currentTheme, setTheme] = useState(Cookies.get("theme") || "dark");

  const toggleTheme = () => {
    const currentTheme = Cookies.get("theme");
    const newTheme = currentTheme === "dark" ? "winter" : "dark";
    const res = Cookies.set("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="dropdown dropdown-top w-full mt-auto">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 w-full justify-between"
      >
        Change Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box  w-full "
      >
        {["dark", "winter"].map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
              checked={theme === currentTheme}
              onChange={(value) => {
                toggleTheme();
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

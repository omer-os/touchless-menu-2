"use client";
import { updateUserRole } from "@/lib/server-actions/users";
import { CopyIcon } from "@radix-ui/react-icons";
import { ListUsersResult, UserRecord } from "firebase-admin/auth";
import React, { LegacyRef, useRef, useState } from "react";

export default function UsersTable({ allUsers }: { allUsers: UserRecord[] }) {
  const [isDropdownOpen, setisDropdownOpen] = useState(false);

  const form = useRef<HTMLFormElement | null>(null);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Rule</th>
          <th>email</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user, index) => (
          <tr key={index}>
            <th
              onClick={() => {
                navigator.clipboard.writeText(user.uid);
              }}
            >
              <button className="btn btn-sm btn-ghost">
                <CopyIcon />
              </button>
            </th>
            <td>{user.displayName}</td>
            <td>{user.customClaims?.role}</td>
            <td>{user.email}</td>
            <td>
              <form ref={form} action={updateUserRole}>
                <input
                  type="text"
                  readOnly
                  name="uid"
                  value={user.uid}
                  hidden
                />
                <select
                  name="role"
                  className="select select-bordered w-full max-w-xs"
                  defaultValue={user.customClaims?.role}
                  onChange={(e) => {
                    form?.current?.requestSubmit();
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

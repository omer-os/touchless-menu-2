import UsersTable from "@/components/admin/users-table";
import { listAllUsers } from "@/lib/firebase/firebase-admin-config";
import { CopyIcon } from "@radix-ui/react-icons";
import React from "react";

export default async function Page() {
  const allUsers = await listAllUsers();

  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <p className="text-xl capitalize">Users</p>
        </div>
      </div>

      <div className="p-4">
        <div>
          <UsersTable allUsers={JSON.parse(JSON.stringify(allUsers.users))} />
        </div>
      </div>
    </div>
  );
}

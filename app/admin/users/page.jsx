"use client";
import UsersTable from "@/components/admin/tables/UsersTable";
import React  from "react";

const Page = () => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Users</p>
        </div>
        <UsersTable />
      </div>
    </div>
  );
};

export default Page;

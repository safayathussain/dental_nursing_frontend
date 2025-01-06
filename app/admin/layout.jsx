"use client";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth?.role !== "AD") router.push("/adminSignIn");
  }, []);

  return (
    <div className="min-h-screen">
      {auth?.role === "AD" && (
        <>
          <div className="flex items-center bg-primary">
            <Sidebar open={open} setOpen={setOpen} />
          </div>
          <div
            className={`w-full h-full bg-black absolute z-20 top-0 left-0 opacity-45 ${
              open ? "block" : "hidden"
            }`}
            onClick={() => setOpen(false)}
          ></div>
          <div
            className="w-full relative h-full lg:ml-[255px] lg:max-w-[calc(100vw-255px)] px-5 py-7 lg:px-14 lg:py-10"
            onClick={() => setOpen(false)}
          >
            {children}
            {/* <ConfirmModal title={"Are you sure"} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;

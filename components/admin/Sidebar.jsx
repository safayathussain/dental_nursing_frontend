"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import logo from "@/public/logo.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/utils/functions";
import { IoHomeOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { MdOutlinePoll } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { TbCategoryPlus, TbDeviceIpadQuestion } from "react-icons/tb";

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  console.log(pathname);
  const items = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline size={18} />,
      link: "/admin/dashboard",
    },
    {
      title: "Blogs",
      icon: <TfiWrite size={18} />,
      link: "/admin/blogs",
    },
    {
      title: "Polls",
      icon: <MdOutlinePoll size={22} />,
      link: "/admin/polls",
    },
    {
      title: "Categories",
      icon: <TbCategoryPlus size={22} />,
      link: "/admin/categories",
    },
    {
      title: "Questions",
      icon: <TbDeviceIpadQuestion size={22} />,
      link: "/admin/questions",
    },
    {
      title: "Users",
      icon: <FiUsers size={18} />,
      link: "/admin/users",
    },
  ];
  return (
    <div className="">
      <div className="">
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          className="p-5 sm:pl-5 lg:hidden bg-primary"
        >
          <HiMenu size={22} color={"white"} />
        </button>
      </div>
      <div
        className={`hs-overlay bg-primary ${
          open ? "ml-0" : "-ml-64 lg:ml-0"
        } transition-all duration-300 transform  fixed top-0 start-0 bottom-0 z-[60] w-64 pt-7 pb-10  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 overflow-y-hidden`}
      >
        <div className="px-6 flex justify-center pt-10">
          <a className="flex-none font-semibold " href="#">
            <Image src={logo} alt="" className="w-40"></Image>
          </a>
        </div>
        <nav className="hs-accordion-group py-6 w-full mt-10 flex flex-col flex-wrap text-white">
          <ul className="space-y-0.5">
            {items.map((item, i) => (
              <li key={i}>
                <Link
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-x-3.5 py-2 px-8 duration-100 ${
                    pathname === item.link
                      ? " text-primary bg-white"
                      : " text-white  "
                  }`}
                  href={item.link}
                >
                  <span
                    className={`${
                      pathname === item.link ? "active-icon" : "pending-icon"
                    } w-4`}
                  >
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="">
            <div className="w-full flex justify-center ">
              <button
                onClick={logout}
                className="rounded-md  border border-error text-error w-full mx-5 py-2 text-sm whitespace-nowrap  font-medium mt-4"
              >
                Log Out
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

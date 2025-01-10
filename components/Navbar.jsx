"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.svg";
import Button from "./Button";
import TextInputWithBtn from "./TextInputWithBtn";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { logout, timeAgo, useAuth } from "@/utils/functions";
import { useDispatch } from "react-redux";
import Profile from "./Profile";
import { MdOutlineNotificationsNone } from "react-icons/md";
import Modal from "./Modal";
import { BsCheckAll } from "react-icons/bs";
import { FetchApi } from "@/utils/FetchApi";
import socket from "@/utils/socket";
const Navbar = ({
  setShowAddQuesModal,
  setShowLoginModal,
  setShowRegisterModal,
}) => {
  const router = useRouter();
  const [searchInputValue, setSearchInputValue] = useState("");
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const search = useSearchParams().get("search");
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [rootNotifications, setRootNotifications] = useState([]);
  const [isAllRead, setIsAllRead] = useState(true);
  const [refetch, setrefetch] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      if (auth?._id) {
        const { data } = await FetchApi({
          url: `/notification/all-notification/${auth?._id}`,
        });

        setRootNotifications(data?.data?.notifications);
        setNotifications(data?.data?.notifications);
        setIsAllRead(data?.data?.isAllRead);
      }
    };
    loadData();
  }, [refetch]);
  useEffect(() => {
    socket.emit("register", auth?._id);
    socket.on("notification", (notificationRes) => {
      setNotifications([notificationRes, ...rootNotifications]);
      setIsAllRead(false);
    });

    return () => {
      socket.off("notification");
    };
  }, [rootNotifications.length]);
  const handleMarkAllAsRead = async () => {
    await FetchApi({
      url: `/notification/read-all-notification/${auth?._id}`,
      method: "post",
      callback: () => {
        setIsAllRead(true);
        setNotifications(
          notifications.map((item) => {
            return {
              ...item,
              readStatus: true,
            };
          })
        );
      },
    });
  };
  const handleMarkAndRedirect = async (item) => {
    await FetchApi({
      url: `/notification/read-notification/${item?._id}`,
      method: "post",
      callback: () => {
        if (item?.link) {
          router.push(item?.link);
        }
        setrefetch(!refetch);
      },
    });
  };
  return (
    <div className="bg-primary ">
      <div className="container py-7 flex gap-5 justify-between items-center">
        <Link href={"/home"}>
          <Image
            src={logo}
            className="w-[150px] lg:w-[200px] cursor-pointer"
            alt=""
          ></Image>
        </Link>
        <div className="w-fit lg:w-full hidden md:block ">
          <TextInputWithBtn
            onClick={() => {
              if (!searchInputValue) {
                return;
              }
              router.push(`/home/questions?search=${searchInputValue}`);
            }}
            defaultValue={search}
            placeholder={"Search Dental Nursing Guide"}
            onChange={(e) => setSearchInputValue(e.target.value)}
            buttonChild={
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.8487 16.4255L12.7178 12.3605C13.7995 11.1852 14.4642 9.63087 14.4642 7.92046C14.4637 4.26158 11.45 1.2959 7.73208 1.2959C4.0142 1.2959 1.00049 4.26158 1.00049 7.92046C1.00049 11.5793 4.0142 14.545 7.73208 14.545C9.33846 14.545 10.8118 13.9894 11.9691 13.0657L16.1161 17.1466C16.3181 17.3457 16.6462 17.3457 16.8482 17.1466C17.0508 16.9476 17.0508 16.6245 16.8487 16.4255ZM7.73208 13.5258C4.58635 13.5258 2.03624 11.0162 2.03624 7.92046C2.03624 4.82471 4.58635 2.31513 7.73208 2.31513C10.8778 2.31513 13.4279 4.82471 13.4279 7.92046C13.4279 11.0162 10.8778 13.5258 7.73208 13.5258Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.75"
                  />
                </svg>
              </div>
            }
          />
        </div>
        <div className="flex  items-center gap-3 !font-normal">
          {!auth?._id ? (
            <>
              <Button
                variant="primary-outline"
                className={"!font-normal"}
                onClick={() => {
                  setShowLoginModal(true);
                }}
              >
                Sign in
              </Button>
              <Button
                variant="primary-outline"
                className={"!font-normal hidden md:block"}
                onClick={() => {
                  setShowRegisterModal(true);
                }}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Link href={"/home/profile"} className="size-10">
                <Profile imgUrl={auth?.profilePicture} />
              </Link>
              <button
                onClick={() => setNotificationModalOpen(true)}
                className=" size-10 rounded-full flex justify-center items-center bg-white relative"
              >
                {!isAllRead && (
                  <div className="absolute size-3 rounded-full bg-red-600 top-0 right-0"></div>
                )}
                <MdOutlineNotificationsNone size={20} />
              </button>
              <Button
                variant="primary-outline"
                className={"!font-normal hidden md:block"}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
          <Button
            variant="primary"
            className={"!font-normal"}
            onClick={() => {
              if (auth?._id) {
                setShowAddQuesModal(true);
              } else {
                setShowLoginModal(true);
              }
            }}
          >
            <div className="flex items-center gap-1 py-[1px]">
              <svg
                width="15"
                height="24"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 0.795898V15.7959"
                  stroke="white"
                  strokeWidth="2"
                />
                <path d="M0 8.2959L15 8.2959" stroke="white" strokeWidth="2" />
              </svg>
              <p className="hidden lg:block">Ask a question</p>
            </div>
          </Button>
        </div>
      </div>
      <div className="w-full block md:hidden p-3 pt-0">
        <TextInputWithBtn
          placeholder={"Search Dental Nursing Guide"}
          onClick={() => {
            if (!searchInputValue) {
              return;
            }
            router.push(`/home/questions?search=${searchInputValue}`);
          }}
          defaultValue={search}
          onChange={(e) => setSearchInputValue(e.target.value)}
          buttonChild={
            <div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8487 16.4255L12.7178 12.3605C13.7995 11.1852 14.4642 9.63087 14.4642 7.92046C14.4637 4.26158 11.45 1.2959 7.73208 1.2959C4.0142 1.2959 1.00049 4.26158 1.00049 7.92046C1.00049 11.5793 4.0142 14.545 7.73208 14.545C9.33846 14.545 10.8118 13.9894 11.9691 13.0657L16.1161 17.1466C16.3181 17.3457 16.6462 17.3457 16.8482 17.1466C17.0508 16.9476 17.0508 16.6245 16.8487 16.4255ZM7.73208 13.5258C4.58635 13.5258 2.03624 11.0162 2.03624 7.92046C2.03624 4.82471 4.58635 2.31513 7.73208 2.31513C10.8778 2.31513 13.4279 4.82471 13.4279 7.92046C13.4279 11.0162 10.8778 13.5258 7.73208 13.5258Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.75"
                />
              </svg>
            </div>
          }
        />
      </div>
      {notificationModalOpen && (
        <Modal
          setOpen={setNotificationModalOpen}
          className={
            "min-w-[300px] max-h-[700px] overflow-x-auto max-w-[500px] w-full"
          }
        >
          <div>
            <Button
              onClick={handleMarkAllAsRead}
              className={"flex text-sm ml-auto items-center gap-1"}
            >
              <BsCheckAll size={22} /> Mark all as read
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {notifications?.map((item, i) => (
              <button
                onClick={() => handleMarkAndRedirect(item)}
                key={i}
                className={`p-2 border ${
                  item?.readStatus
                    ? "bg-white"
                    : "bg-secondary-low hover:bg-secondary-mid"
                } border-secondary-mid  rounded-lg  flex justify-between items-center gap-4`}
              >
                <div className="flex items-center gap-4">
                  <Profile imgUrl={item?.sendBy?.profilePicture} />
                  <p className="text-left">{item?.content}</p>
                </div>
                <p className="text-xs whitespace-nowrap">
                  {timeAgo(item?.createdAt)}
                </p>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;

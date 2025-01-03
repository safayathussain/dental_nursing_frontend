"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.svg";
import Button from "./Button";
import TextInputWithBtn from "./TextInputWithBtn";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { logout, useAuth } from "@/utils/functions";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/AuthSlice";
import Profile from "./Profile";
import { useCookies } from "react-cookie";
const deleteCookie = (name) => {};
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
  return (
    <div className="bg-primary ">
      <div className="container py-7 flex gap-5 justify-between items-center">
        <Image
          src={logo}
          className="w-[150px] lg:w-[200px] cursor-pointer"
          onClick={() => router.push("/home")}
          alt=""
        ></Image>

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
              <Profile imgUrl={auth?.profilePicture} />
              <div className=""></div>
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
    </div>
  );
};

export default Navbar;

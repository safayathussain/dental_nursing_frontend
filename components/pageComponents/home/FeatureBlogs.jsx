"use client";
import React from "react";
import Button from "../../Button";
import { useRouter } from "next/navigation";

const FeatureBlogs = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl text-primary font-bold">
          Featured Blogs
        </h1>
        <Button onClick={() => router.push('/home/blogs')} className={"hidden lg:block"}>View All Blogs</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <div
          onClick={() => router.push("/home/blogs/1")}
          className="rounded-xl shadow-lg cursor-pointer"
        >
          <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
            <img
              src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
              alt=""
              className="rounded-t-xl w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-xl md:text-2xl text-primary font-semibold">
              GCSE biology combined science AQA 2024 - Dental Nursing
            </p>
            <p className="text-[#4B5563]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati ipsa quasi aliquam repellat id error incidunt quia nobis
              qui iure?
            </p>
          </div>
        </div>
        <div
          onClick={() => router.push("/home/blogs/1")}
          className="rounded-xl shadow-lg cursor-pointer"
        >
          <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
            <img
              src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
              alt=""
              className="rounded-t-xl w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-xl md:text-2xl text-primary font-semibold">
              GCSE biology combined science AQA 2024 - Dental Nursing
            </p>
            <p className="text-[#4B5563]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati ipsa quasi aliquam repellat id error incidunt quia nobis
              qui iure?
            </p>
          </div>
        </div>
        <div
          onClick={() => router.push("/home/blogs/1")}
          className="rounded-xl shadow-lg cursor-pointer"
        >
          <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
            <img
              src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
              alt=""
              className="rounded-t-xl w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-xl md:text-2xl text-primary font-semibold">
              GCSE biology combined science AQA 2024 - Dental Nursing
            </p>
            <p className="text-[#4B5563]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati ipsa quasi aliquam repellat id error incidunt quia nobis
              qui iure?
            </p>
          </div>
        </div>
      </div>
      <Button onClick={() => router.push('/home/blogs')} className={"block mx-auto lg:hidden"}>View All Blogs</Button>
    </div>
  );
};

export default FeatureBlogs;

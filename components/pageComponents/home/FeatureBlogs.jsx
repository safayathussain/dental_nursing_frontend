"use client";
import React from "react";
import Button from "../../Button";
import { useRouter } from "next/navigation";
import { ImgURL } from "@/utils/constants";
import Image from "next/image";

const FeatureBlogs = ({
  blogs = [],
  className,
  showViewAllBtn = true,
  blogClass,
}) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl md:text-3xl text-primary font-bold  `}>
          Featured Blogs
        </h1>
        {showViewAllBtn && (
          <Button
            onClick={() => router.push("/home/blogs")}
            className={"hidden lg:block"}
          >
            View All Blogs
          </Button>
        )}
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5 ${className}`}
      >
        {blogs?.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(`/home/blogs/${item?._id}`)}
            className={`rounded-xl shadow-lg cursor-pointer text-xl md:text-2xl ${blogClass}`}
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
              <Image
                width={300}
                height={168}
                src={ImgURL + "/" + item?.thumbnail}
                alt=""
                className="rounded-t-xl w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="  text-primary font-semibold">
                {item?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => router.push("/home/blogs")}
        className={"block mx-auto lg:hidden"}
      >
        View All Blogs
      </Button>
    </div>
  );
};

export default FeatureBlogs;

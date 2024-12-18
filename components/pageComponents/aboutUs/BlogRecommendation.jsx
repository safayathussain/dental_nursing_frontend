"use client"
import { useRouter } from "next/navigation";
import React from "react";

const BlogRecommendation = ({ title }) => {
  const router = useRouter()
  return (
    <div>
      <div className="p-4 rounded-xl border border-secondary-mid space-y-3">
        {title && (
          <>
            <p className="text-2xl text-primary font-semibold">{title}</p>
            <hr className="my-3" />
          </>
        )}

        <div onClick={() => router.push("/home/blogs/1")} className="cursor-pointer p-3 border bg-primary-low rounded-xl  border-secondary-mid">
          <p className="text-primary text-lg font-semibold my-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-lightGray text-sm">14 minutes ago</p>
        </div>
        <div onClick={() => router.push("/home/blogs/1")} className="cursor-pointer p-3 border bg-primary-low rounded-xl  border-secondary-mid">
          <p className="text-primary text-lg font-semibold my-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-lightGray text-sm">14 minutes ago</p>
        </div>
      </div>
    </div>
  );
};

export default BlogRecommendation;

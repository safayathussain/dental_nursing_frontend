"use client";
import { timeAgo } from "@/utils/functions";
import { useRouter } from "next/navigation";
import React from "react";

const BlogRecommendation = ({ title, blogs }) => {
  const router = useRouter();
  return (
    <div>
      <div className="p-4 rounded-xl border border-secondary-mid space-y-3">
        {title && (
          <>
            <p className="text-2xl text-primary font-semibold">{title}</p>
            <hr className="my-3" />
          </>
        )}
        {blogs?.map((item) => (
          <div
          key={item?._id}
            onClick={() => router.push(`/home/blogs/${item?._id}`)}
            className="cursor-pointer p-3 border bg-primary-low rounded-xl  border-secondary-mid"
          >
            <p className="text-primary text-lg font-semibold my-1">
              {item?.title}
            </p>
            <p className="text-lightGray text-sm">{timeAgo(item?.createdAt)}</p>
          </div>
        ))} 
      </div>
    </div>
  );
};

export default BlogRecommendation;

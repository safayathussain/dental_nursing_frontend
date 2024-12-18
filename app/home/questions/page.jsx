import Image from "next/image";
import React from "react";
import profile from "@/public/profile.png";
import FeatureCourses from "@/components/pageComponents/home/FeatureCourses";

const Page = () => {
  return (
    <div className="container py-20 ">
      <div className="flex gap-8">
        <div className="w-3/4">
          <p className="text-[24px] text-primary">
            <span className="font-bold">100</span> Results for{" "}
            <span className="font-bold">"Collage"</span>
          </p>
          <hr className="my-4" />
          <div className="flex items-center mb-10 w-full justify-between bg-secondary-low p-5 rounded-xl border-2 border-secondary-mid">
            <div className="flex items-center gap-10">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  className="w-full h-full object-cover "
                  src={profile}
                  alt=""
                ></Image>
              </div>
              <div>
                <p className="text-xl text-primary font-semibold">
                  GCSE biology combined science AQA 2024
                </p>
                <p className="text-secondary">
                  Webmaster, coding and software dev
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#4B5563]">14 minutes ago</p>
              <div className="flex items-center gap-5 mt-2 font-medium text-[#4B5563]">
                <div className="flex items-center gap-1">
                  <img src="/icons/like.svg" alt="" />
                  <p>124</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/icons/comments.svg" alt="" />
                  <p>124</p>
                </div>
              </div>
            </div>
          </div>
          <FeatureCourses />
        </div>
        <div className="w-1/4 border rounded-xl p-4">
          <h1 className="text-[24px] text-primary font-bold">Featured Blogs</h1>
          <hr className="my-3" />
          <div>
            <div className="rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
                <img
                  src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
                  alt=""
                  className="rounded-t-xl w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xl text-primary font-semibold">
                  GCSE biology combined science AQA 2024 - Dental Nursing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

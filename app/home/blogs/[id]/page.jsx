import JoinSection from "@/components/pageComponents/common/JoinSection";
import FeatureBlogs from "@/components/pageComponents/home/FeatureBlogs";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div>
      <div>
        <img
          src={"https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"}
          className="w-screen h-[450px] absolute top-0 -z-10 object-cover"
          alt=""
        ></img>
      </div>
      <div className="container">
        <div className="bg-white max-w-[1000px] mx-auto rounded-t-xl p-4 md:p-6 lg:p-8 mt-[210px]">
          <div className="">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2F2F2F]">
              GCSE biology combined science AQA 2024
            </p>
            <p className="text-lightGray text-[11px] sm:text-sm">
              OCTOBER 31, 2024 | 18 COMMENTS | BY GEMMA WINCHESTER | 13 min read
            </p>
            <div className="mt-16">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem nisi, assumenda impedit ipsum illo aliquam
                nesciunt beatae cumque aliquid in cum architecto asperiores
                molestias porro accusantium? Distinctio aperiam, officiis odit
                sunt vitae, numquam ab ipsam quibusdam saepe laboriosam aliquid
                illo veritatis, soluta consectetur deleniti nulla libero
                doloremque praesentium! Recusandae, maxime tenetur saepe
                repellendus eum corrupti similique in placeat nihil eaque
                impedit eveniet blanditiis aliquid quam aut, ullam doloribus
                amet asperiores quidem sed? Excepturi sunt recusandae obcaecati,
                possimus nemo accusantium neque explicabo totam numquam qui illo
                ad id harum quis velit voluptas odit quos? Nulla nemo
                consectetur, tempora voluptatibus inventore porro.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <p className="font-semibold">Tags</p>
              <span className="bg-[#3C55A51A] text-sm px-4 border-primary py-1.5 rounded-full border">
                Dental Nursing
              </span>
            </div>
          </div>
        </div>
        <div className="my-10">
          <FeatureBlogs />
        </div>
      </div>
      <JoinSection />
    </div>
  );
};

export default Page;

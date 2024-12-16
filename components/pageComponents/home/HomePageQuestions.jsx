import React from "react";
import Button from "../../Button";
import Image from "next/image";
import profile from "@/public/profile.png";
import Link from "next/link";
import sdnBanner from "@/public/images/sdn_ad_banner.png";
import FeatureBlogs from "./FeatureBlogs";
import FeatureCourses from "./FeatureCourses";
import JoinSection from "../common/JoinSection";
const HomePageQuestions = () => {
  return (
    <div className=" pt-20 ">
      <div className="container">
        <div className="flex gap-8">
          <div className="w-2/3">
            <div className="flex gap-2">
              <Button variant="primary">Latest</Button>
              <Button
                variant="secondary"
                className={
                  "hover:bg-secondary-low hover:text-primary duration-300 hover:outline-2  hover:outline-secondary-mid"
                }
              >
                Latest
              </Button>
              <Button
                variant="secondary"
                className={
                  "hover:bg-secondary-low hover:text-primary duration-300 hover:outline-2 hover:outline-secondary-mid"
                }
              >
                Latest
              </Button>
              <Button
                variant="secondary"
                className={
                  "hover:bg-secondary-low hover:text-primary duration-300 hover:outline-2 hover:outline-secondary-mid"
                }
              >
                Latest
              </Button>
            </div>
            <hr className="my-3" />
            <div>
              <div className="flex items-center w-full justify-between bg-secondary-low p-5 rounded-xl border-2 border-secondary-mid">
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
            </div>
          </div>
          <div className="w-1/3">
            <div className="border border-secondary-mid p-3 rounded-xl">
              <p className="text-primary text-xl font-semibold">Poll</p>
              <hr className="my-2" />
              <div className="p-3 rounded-md bg-secondary-low border-2 border-secondary-mid ">
                <p className="text-lg text-primary font-semibold">
                  What are you most excited about this December?
                </p>
                <div className="mt-4 space-y-2.5">
                  <button className="px-5 py-1.5 font-semibold rounded-full border border-secondary text-secondary bg-white w-full text-start">
                    Holiday Celebrations
                  </button>
                  <button className="px-5 py-1.5 font-semibold rounded-full border border-secondary text-secondary bg-white w-full text-start">
                    Holiday Celebrations
                  </button>
                  <button className="px-5 py-1.5 font-semibold rounded-full border border-secondary text-secondary bg-white w-full text-start">
                    Holiday Celebrations
                  </button>
                  <button className="px-5 py-1.5 font-semibold rounded-full border border-secondary text-secondary bg-white w-full text-start">
                    Holiday Celebrations
                  </button>
                </div>
                <hr className="my-3" />
                <Button className={"w-full"} variant="primary" size="lg">
                  Vote Now
                </Button>
                <div className="flex justify-center my-4">
                  <Link
                    href={""}
                    className="underline text-primary font-medium "
                  >
                    View Discussion
                  </Link>
                </div>
              </div>
            </div>
            <Image
              src={"/images/wizdam_ad_banner.png"}
              className="w-full mt-5"
              width={500}
              height={500}
              alt=""
            ></Image>
          </div>
        </div>
        <div className="my-10">
          <Image src={sdnBanner} alt=""></Image>
        </div>
      <FeatureCourses />
      <div className="h-10"></div>
      <FeatureBlogs />
      </div>
      <div className="h-10"></div>
      <JoinSection />
    </div>
  );
};

export default HomePageQuestions;

"use client"
import React from "react";
import Button from "../../Button";
import Image from "next/image";
import profile from "@/public/profile.png";
import Link from "next/link";
import sdnBanner from "@/public/images/sdn_ad_banner.png";
import FeatureBlogs from "./FeatureBlogs";
import FeatureCourses from "./FeatureCourses";
import JoinSection from "../common/JoinSection";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import('../../textEditor/TextEditor'), {
  ssr: false,  // Disable SSR for this component
});
const HomePageQuestions = () => {
  return (
    <div className=" pt-20 text-sm xl:text-base">
      {/* <TextEditor/> */}

      <div className="container">
        <div className="flex flex-col xl:flex-row gap-8 w-full">
          <div className="xl:w-2/3 w-full">
            <div className="flex gap-2 overflow-x-scroll">
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
            <div className="max-w-screen w-full overflow-x-scroll whitespace-nowrap md:whitespace-normal">
              <table className="w-full  space-y-2 ">
                <tbody className="text-sm xl:text-base">
                  <tr>

                  <td className="flex flex-col lg:flex-row items-start gap-2 lg:gap-7 lg:items-center w-full justify-between bg-secondary-low p-5  rounded-xl border-2 border-secondary-mid">
                    <div className="flex items-center gap-5 w-full ">
                      <div className="lg:size-16 rounded-full overflow-hidden min-w-12 lg:min-w-16 size-12 flex items-center justify-center">
                        <Image
                          width={100}
                          height={100}
                          className="w-full h-full lg:size-16 size-12 object-cover "
                          src={profile}
                          alt=""
                        ></Image>
                      </div>
                      <div>
                        <p className="text-base lg:text-xl text-primary font-semibold">
                          GCSE biology combined science AQA 2024 GCSE biology
                          combined science AQA 2024 GCSE biology combined
                          science AQA 2024
                        </p>
                        <p className="text-sm lg:text-base text-secondary">
                          Webmaster, coding and software dev
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center ml-16 lg:ml-0">
                      <p className="text-[#4B5563] whitespace-nowrap">
                        14 minutes ago
                      </p>
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
                  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row xl:flex-col gap-5 xl:w-1/3">
            <div className="border border-secondary-mid p-3 rounded-xl w-full sm:w-2/3 xl:w-full">
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
            <div className=" mt-5 w-full sm:w-1/3 xl:w-full">
              <Image
                src={"/images/wizdam_ad_banner.png"}
                width={500}
                height={500}
                alt=""
                className="w-full"
              ></Image>
            </div>
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

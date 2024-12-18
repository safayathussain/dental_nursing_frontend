"use client";
import React, { useState } from "react";
import profile from "@/public/profile.png";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { LuThumbsUp } from "react-icons/lu";
import Button from "@/components/Button";
import { BiSolidShare } from "react-icons/bi";
import SingleQuestionRecommendation from "@/components/pageComponents/questions/SingleQuestionRecommendation";
import FeatureBlogs from "@/components/pageComponents/home/FeatureBlogs";
import JoinSection from "@/components/pageComponents/common/JoinSection";
import TextEditor from "@/components/textEditor/TextEditor";
import { QuestionComments } from "@/components/pageComponents/questions/QuestionComments";

const page = () => {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  return (
    <div className=" ">
      <div className=" py-10 lg:py-20 container">
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center flex-wrap gap-1 text-primary font-medium">
              Forum
              <FaChevronRight />
              Webmaster, coding and software dev
            </div>
            <hr className="my-3" />
            <div className="bg-secondary-low p-3 rounded-md">
              <div className="p-3 md:p-5 rounded-md bg-[#1BB68A24] border-2 border-secondary-mid ">
                <p className="text-xl text-primary font-semibold">
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
              </div>
            </div>
            <QuestionComments />
          </div>
          <div className="w-full lg:w-1/3">
            <SingleQuestionRecommendation />
          </div>
        </div>
        <div className="mt-20">
          <FeatureBlogs />
        </div>
      </div>
      <div className="">
        <JoinSection />
      </div>
    </div>
  );
};

export default page;

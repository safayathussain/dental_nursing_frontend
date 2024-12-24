"use client";
import HeroSection from "@/components/pageComponents/home/HeroSection";
import HomePageQuestions from "@/components/pageComponents/home/HomePageQuestions";
import { FetchApi } from "@/utils/FetchApi";
import React, { useEffect, useState } from "react";

const Page = () => {
 
  return (
    <div>
      <HeroSection />
      <HomePageQuestions/>
    </div>
  );
};

export default Page;

import React from "react";
import heroImg from "@/public/hero_img.png";
import Image from "next/image";
const HeroSection = () => {
  return (
    <div className="bg-secondary-mid">
      <div className="flex items-center flex-col lg:flex-row justify-between container py-20">
        <div className="lg:w-1/2 ">
          <h1 className="text-primary  sm:w-3/5 lg:text-start   lg:w-full text-center mx-auto text-4xl md:text-5xl xl:text-[70px] leading-none font-bold">
            Learn, grow, and thrive together!
          </h1>
          <p className="mt-4 leading-5 mx-auto text-center lg:text-start lg:w-full sm:w-2/3">
            Welcome to Dental Nursing Guide—a vibrant community for dental
            nursing professionals to connect, share valuable advice, and explore
            rewarding career pathways. From essential study tips to insightful
            career guidance.
          </p>
        </div>
        <div className=" max-w-[370px] ">
          <Image src={heroImg} alt="" className="w-full"></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

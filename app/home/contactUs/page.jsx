import Image from "next/image";
import React from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";
import { IoMail } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiMapPin2Fill } from "react-icons/ri";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import TextArea from "@/components/TextArea";
import CheckInput from "@/components/CheckInput";
import RadioInput from "@/components/RadioInput";
import JoinSection from "@/components/pageComponents/common/JoinSection";
const page = () => {
  return (
    <div>
      <div className="bg-secondary-low">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center py-20 ">
          Contact Us
        </h1>
      </div>
      <div className="container flex py-20 flex-col-reverse md:flex-row">
        <div className="bg-primary p-5 sm:p-10 rounded-b-xl md:rounded-b-none md:!rounded-l-xl w-full md:w-1/2 flex flex-col justify-between gap-10">
          <div>
            <Image src={logo} alt=""></Image>
          </div>
          <div className="text-white space-y-2">
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <IoMail size={20} />
              info@islandsAI.com
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <BsFillTelephoneFill />
              +44 123 456 7890
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <RiMapPin2Fill size={22} />
              Guernsey, Channel Islands, UK
            </Link>
          </div>
        </div>
        <div className="border border-primary rounded-t-xl md:!rounded-r-xl md:rounded-l-none w-full md:w-1/2 p-5 sm:p-10 space-y-3">
          <TextInput placeholder={"Name*"} />
          <TextInput placeholder={"Email Address*"} />
          <TextInput placeholder={"Phone Number*"} />
          <SelectInput placeholder={"Study Mode*"} />
          <SelectInput placeholder={"Course*"} />
          <SelectInput placeholder={"How did you hear about us?"} />
          <TextArea placeholder={"Your Message*"} />
          <CheckInput
            className={"pt-1"}
            label={
              "Yes, I agree to the processing of my personal data in line with the schools' privacy policy"
            }
          />
          <div className="flex items-center gap-5 mt-5 whitespace-nowrap flex-wrap">
            Contact me:*{" "}
            <div className="flex gap-5">
              <RadioInput label={"By phone"} name={"contactBy"} />{" "}
              <RadioInput label={"By email"} name={"contactBy"} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <JoinSection />
      </div>
    </div>
  );
};

export default page;

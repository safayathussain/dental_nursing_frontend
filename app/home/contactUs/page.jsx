"use client";
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
import Button from "@/components/Button";
import { useSetting } from "@/utils/functions";
import { useEffect } from "react";
import { useState } from "react";
import { FetchApi } from "@/utils/FetchApi";
import toast from "react-hot-toast";
const Page = () => {
  const { setting } = useSetting();
  const [courses, setcourses] = useState([]);

  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedHearOption, setSelectedHearOption] = useState(null);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      const { data: courseData } = await FetchApi({
        url: `/course/all-courses?latest=true`,
      });
      setcourses(courseData?.data?.data);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phone,
      message,
      contactBy,
    } = e.target;
    if (!name.value || !email.value || !phone.value || !message.value || !contactBy.value || !selectedCourse || !selectedHearOption || !selectedMode) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const body = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      mode: selectedMode,
      course: selectedCourse,
      hear: selectedHearOption,
      message: message.value,
      contactBy: contactBy.value,
      sendByMail: setting?.email
    };
    await FetchApi({url: '/contact/send-mail', method: 'post', isToast: true, data: body})
  };
  const hearOptions = [
    {
      name: "Social Media",
      value: "Social Media",
    },
    {
      name: "Friend or Family Referral",
      value: "Friend or Family Referral",
    },
    {
      name: "Online Advertisement",
      value: "Online Advertisement",
    },
    {
      name: "Other",
      value: "Other",
    },
  ];
  const studyModes = [
    { name: "Online", value: "online" },
    { name: "Offline", value: "offline" },
    { name: "Hybrid", value: "hybrid" },
  ];
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
              {setting?.email}
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <BsFillTelephoneFill />
              {setting?.phone}
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <RiMapPin2Fill size={22} />
              {setting?.location}
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border border-primary rounded-t-xl md:!rounded-r-xl md:rounded-l-none w-full md:w-1/2 p-5 sm:p-10 space-y-3"
        >
          <TextInput placeholder={"Name*"} name={"name"} />
          <TextInput placeholder={"Email Address*"} name={"email"} type="mail"/>
          <TextInput placeholder={"Phone Number*"} name={"phone"} />
          <SelectInput
            placeholder={"Study Mode*"}
            name={"mode"}
            value={selectedMode}
            options={studyModes}
            setValue={(e) => setSelectedMode(e)}
          />
          <SelectInput
            placeholder={"Course*"}
            name={"course"}
            options={courses?.map((item) => {
              return { name: item?.title, value: item?._id };
            })}
            value={selectedCourse}
            setValue={(e) => setSelectedCourse(e)}
          />
          <SelectInput
            value={selectedHearOption}
            options={hearOptions}
            setValue={(e) => {
              console.log(e);
              setSelectedHearOption(e);
            }}
            placeholder={"How did you hear about us?"}
            name={"hear"}
          />
          <TextArea placeholder={"Your Message*"} name={"message"} />
          <CheckInput
            name={"agreedToPrivacy"}
            className={"pt-1"}
            setValue={(e) => setAgreedToPrivacy(e)}
            value={agreedToPrivacy}
            label={
              "Yes, I agree to the processing of my personal data in line with the schools' privacy policy"
            }
          />
          <div className="flex items-center gap-5 mt-5 whitespace-nowrap flex-wrap">
            Contact me:*{" "}
            <div className="flex gap-5">
              <RadioInput
                label={"By phone"}
                name={"contactBy"}
                value={"phone"}
              />{" "}
              <RadioInput
                label={"By email"}
                name={"contactBy"}
                value={"email"}
              />
            </div>
          </div>
          <Button disabled={!agreedToPrivacy} variant="primary-blue" className={"w-full"}>
            Submit
          </Button>
        </form>
      </div>
      <div>
        <JoinSection />
      </div>
    </div>
  );
};

export default Page;

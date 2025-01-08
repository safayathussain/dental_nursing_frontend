import React from "react";
import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { IoMail } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-primary text-white">
      <div className="container py-5 flex flex-col items-center">
        <div>
          <Image src={logo} className="w-[150px] lg:w-[200px] pt-10" alt=""></Image>
        </div>
        <hr className="my-5 w-full opacity-20" />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="flex flex-col space-y-1 ">
            <p className="font-medium text-xl">Quick Links</p>
            <Link href={""} className="font-light hover:underline duration-300">
              Home
            </Link>
            <Link href={"/home/blogs"} className="font-light hover:underline duration-300">
              Blogs
            </Link>
            <Link href={"/home/aboutUs"} className="font-light hover:underline duration-300">
              About Us
            </Link>
            <Link href={"/home/contactUs"} className="font-light hover:underline duration-300">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col space-y-1 ">
            <p className="font-medium text-xl">Company</p>
            <Link href={""} className="font-light hover:underline duration-300">
              Privacy policy
            </Link>
            <Link href={""} className="font-light hover:underline duration-300">
              Terms & Conditions
            </Link>
            <Link href={""} className="font-light hover:underline duration-300">
              Cookie Policy
            </Link>
          </div>
          <div className="flex flex-col space-y-1 ">
            <p className="font-medium text-xl">Contact</p>
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
          <div className="flex flex-col space-y-1 ">
            <p className="font-medium text-xl">Social</p>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <FaLinkedin size={20} />
              LinkedIn
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <FaXTwitter />
              Twitter
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <FaYoutube size={22} />
              Youtube
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <FaInstagram size={22} />
              Instagram
            </Link>
            <Link
              href={""}
              className="font-light hover:underline duration-300 flex items-center gap-1"
            >
              <FaFacebook size={22} />
              Facebook
            </Link>
          </div>
        </div>
        <hr className="my-5 w-full opacity-20" />
        <p className="text-center">© 2024 Islands AI. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

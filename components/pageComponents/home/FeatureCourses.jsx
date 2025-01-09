import { ImgURL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FeatureCourses = ({ courses }) => {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl text-primary font-bold">
        Featured Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {courses?.map((item) => (
          <Link key={item?._id} href={item?.url} target="_blank" className="cursor-pointer rounded-xl shadow-lg">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
              <Image
              width={300}
              height={168}
                src={ImgURL + '/' + item?.thumbnail}
                alt=""
                className="rounded-t-xl w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xl md:text-2xl text-primary font-semibold">
                GCSE biology combined science AQA 2024 - Dental Nursing
              </p>
              <p className="text-[#4B5563]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Obcaecati ipsa quasi aliquam repellat id error incidunt quia
                nobis qui iure?
              </p>
            </div>
          </Link>
        ))} 
      </div>
    </div>
  );
};

export default FeatureCourses;

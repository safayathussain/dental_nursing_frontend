import Button from "@/components/Button";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="bg-secondary-low">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center py-20 ">
          Our Blogs
        </h1>
      </div>
      <div className="container py-20 flex gap-10 xl:gap-20 flex-col md:flex-row">
        <div className="w-full md:w-2/3 space-y-5">
          <div className="rounded-xl shadow-lg">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
              <img
                src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
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
          </div>
          <div className="rounded-xl shadow-lg">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
              <img
                src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
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
          </div>
        </div>
        <div className="md:w-1/3 w-full  gap-5 flex-col sm:flex-row flex md:flex-col">
          <div className="p-3 border rounded-lg space-y-2 w-full sm:w-1/2 md:w-full">
            <p className="text-primary text-xl font-semibold">Blog Category</p>
            <hr className="py-1" />
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              Education
            </Button>
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              Education
            </Button>
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              Education
            </Button>
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              Education
            </Button>
          </div>
          <div className="p-3 border rounded-lg space-y-2 w-full sm:w-1/2 md:w-full">
            <p className="text-primary text-xl font-semibold">Blog Achieve</p>
            <hr className="py-1" />
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              2024
            </Button>
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              2024
            </Button>
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              2024
            </Button>
            <Button
              variant="secondary"
              className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
            >
              2024
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

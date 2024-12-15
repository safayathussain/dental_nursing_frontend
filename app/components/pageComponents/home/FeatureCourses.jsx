import React from "react";

const FeatureCourses = () => {
  return (
    <div>
      <h1 className="text-3xl text-primary font-bold">Featured Courses</h1>
      <div className="grid grid-cols-3 my-5">
        <div className="rounded-xl shadow-lg">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
            <img
              src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
              alt=""
              className="rounded-t-xl w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-2xl text-primary font-semibold">
              GCSE biology combined science AQA 2024 - Dental Nursing
            </p>
            <p className="text-[#4B5563]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati ipsa quasi aliquam repellat id error incidunt quia nobis
              qui iure?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCourses;

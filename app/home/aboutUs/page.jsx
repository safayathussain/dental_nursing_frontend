import BlogRecommendation from "@/components/pageComponents/aboutUs/BlogRecommendation";
import SingleQuestionRecommendation from "@/components/pageComponents/questions/SingleQuestionRecommendation";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="bg-secondary-low">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center py-20 ">
          About Us
        </h1>
      </div>
      <div className="container py-20 flex gap-10 xl:gap-20 flex-col md:flex-row">
        <div className="w-full md:w-2/3 space-y-5">
          <div className="p-7 rounded-xl border shadow-md ">
            <p className="text-3xl text-primary font-semibold mb-2">
              Our strategy
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              blanditiis ut omnis, pariatur aut quasi delectus. Ab, ipsa nulla
              culpa nemo cupiditate, et voluptas minus omnis dolores animi porro
              optio iure, explicabo tempore cumque non sunt rerum odit
              voluptatum dolorum deserunt ut nisi numquam? Nemo amet quaerat
              repellat consectetur fugit?
            </p>
            <img
              src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
              className="w-full rounded-xl mt-5"
            ></img>
          </div>
          <div className="p-7 rounded-xl border shadow-md ">
            <p className="text-3xl text-primary font-semibold mb-2">
              How we operate
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              blanditiis ut omnis, pariatur aut quasi delectus. Ab, ipsa nulla
              culpa nemo cupiditate, et voluptas minus omnis dolores animi porro
              optio iure, explicabo tempore cumque non sunt rerum odit
              voluptatum dolorum deserunt ut nisi numquam? Nemo amet quaerat
              repellat consectetur fugit?
            </p>
          </div>
          <div className="p-7 rounded-xl border shadow-md ">
            <p className="text-3xl text-primary font-semibold mb-2">
              Best Data
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              blanditiis ut omnis, pariatur aut quasi delectus. Ab, ipsa nulla
              culpa nemo cupiditate, et voluptas minus omnis dolores animi porro
              optio iure, explicabo tempore cumque non sunt rerum odit
              voluptatum dolorum deserunt ut nisi numquam? Nemo amet quaerat
              repellat consectetur fugit?
            </p>
          </div>
        </div>
        <div className="md:w-1/3 w-full  gap-5 flex-col sm:flex-row flex md:flex-col">
          <SingleQuestionRecommendation title={"Featured Posts"} />
          <BlogRecommendation title={'Featured Blogs'}/>
        </div>
      </div>
    </div>
  );
};

export default Page;

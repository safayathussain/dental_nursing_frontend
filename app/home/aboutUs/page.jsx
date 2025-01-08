"use client";
import BlogRecommendation from "@/components/pageComponents/aboutUs/BlogRecommendation";
import SingleQuestionRecommendation from "@/components/pageComponents/questions/SingleQuestionRecommendation";
import { FetchApi } from "@/utils/FetchApi";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data: blogData } = await FetchApi({
        url: `/blog/all-blogs?page=1&limit=3&latest=true`,
      });
      setBlogs(blogData?.data?.data);
    };
    loadData();
  }, []);

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
              The underlying strategy that drives our long-term growth plan is
              defined by the mantra: "YouGov. Best panel - Best data - Best
              tools. Our mission is to supply a continuous stream of accurate
              data and insight into what the world thinks, so that companies,
              governments and institutions can better serve the people and
              communities that sustain them.
            </p>
            <p className="mt-7">
              Our vision is for YouGov data to be a valued public resource used
              by hundreds of millions of people
            </p>
            <img src="/about_us.png" className="w-full rounded-xl mt-5"></img>
          </div>
          <div className="p-7 rounded-xl border shadow-md space-y-5">
            <p className="text-3xl text-primary font-semibold mb-2">
              How we operate
            </p>
            <p>
              Our mission is to supply a continuous stream of accurate data and
              insight into what the world thinks, so that companies, governments
              and institutions can better serve the people and communities that
              sustain them.
            </p>
            <p>
              Our vision is for YouGov data to be a valued public resource used
              by hundreds of millions of people on a daily basis, enabling
              intelligent decision-making and informed conversations.
            </p>
            <p>
              We are driven by a set of shared values. We are fast, fearless and
              innovative. We work diligently to get it right. We are guided by
              accuracy, ethics and proven methodologies. We trust each other and
              bring these values into everything that we do.Our vision is for
              YouGov data to be a valued public resource used by hundreds of
              millions of people on a daily basis, enabling intelligent
              decision-making and informed conversations.
            </p>
            <p>
              Our mission is to supply a continuous stream of accurate data and
              insight into what the world thinks, so that companies, governments
              and institutions can better serve the people and communities that
              sustain them.
            </p>
            <p>
              Our vision is for YouGov data to be a valued public resource used
              by hundreds of millions of people on a daily basis, enabling
              intelligent decision-making and informed conversations.
            </p>
          </div>
          <div className="p-7 rounded-xl border shadow-md ">
            <p className="text-3xl text-primary font-semibold mb-2">
              Best Data
            </p>
            <p>
              The YouGov Cube is a unique single-source connected-data library
              that holds over ten years of longitudinal data. We leverage this
              data using our research expertise, including our application of
              Multilevel Regression with Post-stratification (“MRP”)
              methodology, to make accurate predictions at a granular level.
            </p>
          </div>
        </div>
        <div className="md:w-1/3 w-full  gap-5 flex-col sm:flex-row flex md:flex-col">
          {/* <SingleQuestionRecommendation title={"Featured Posts"} /> */}
          <BlogRecommendation title={"Featured Blogs"} blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Page;

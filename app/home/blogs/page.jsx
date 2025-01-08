"use client";
import Button from "@/components/Button";
import Loading from "@/components/pageComponents/common/Loading";
import { ImgURL } from "@/utils/constants";
import { FetchApi } from "@/utils/FetchApi";
import { timeAgo, useCategories } from "@/utils/functions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { data: blogData } = await FetchApi({
        url: `/blog/all-blogs?latest=true${
          selectedCategory
            ? `&category=${encodeURIComponent(
                JSON.stringify([selectedCategory])
              )}`
            : ""
        }`,
      });
      setBlogs(blogData?.data?.data);
      setIsLoading(false);
    };
    loadData();
  }, [selectedCategory]);

  return (
    <div>
      <div className="bg-secondary-low">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center py-20 ">
          Our Blogs
        </h1>
      </div>
      <div className="container py-20 flex gap-10 xl:gap-20 flex-col md:flex-row">
        <div className="w-full md:w-2/3 space-y-5">
          {isLoading && <Loading className="mx-auto" />}
          {!isLoading &&
            blogs?.map((item) => (
              <div key={item._id} className="rounded-xl shadow-lg">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
                  <Image
                    width={842}
                    height={474}
                    src={ImgURL + "/" + item?.thumbnail}
                    alt=""
                    className="rounded-t-xl w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xl md:text-2xl text-primary font-semibold">
                    {item?.title}
                  </p>
                  <p className="text-[#4B5563] text-sm">
                    {timeAgo(item?.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="md:w-1/3 w-full  gap-5 flex-col sm:flex-row flex md:flex-col">
          <div className="p-3 border rounded-lg space-y-2 w-full sm:w-1/2 md:w-full">
            <p className="text-primary text-xl font-semibold">Blog Category</p>
            <hr className="py-1" />
            {categories?.map(
              (item) =>
                item?.blogsCount !== 0 && (
                  <Button
                    key={item._id}
                    onClick={() => setSelectedCategory(item?._id)}
                    variant={
                      selectedCategory !== item?._id ? "secondary" : "primary"
                    }
                    className={"bg-[#F5F7FB] w-full py-2.5 text-start"}
                  >
                    {item?.name}
                  </Button>
                )
            )}
          </div>
          {/* <div className="p-3 border rounded-lg space-y-2 w-full sm:w-1/2 md:w-full">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;

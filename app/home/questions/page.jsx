"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import profile from "@/public/profile.png";
import FeatureCourses from "@/components/pageComponents/home/FeatureCourses";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchApi } from "@/utils/FetchApi";
import Profile from "@/components/Profile";
import { timeAgo } from "@/utils/functions";
import { Loader } from "rsuite";
import Pagination from "@/components/Pagination";

const Page = () => {
  const router = useRouter();
  const search = useSearchParams().get("search");

  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [questionCount, setquestionCount] = useState(0);
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
  const [questionsIsLoading, setQuestionsIsLoading] = useState(false);
  const itemsPerPage = 10;
  useEffect(() => {
    const loadData = async () => {
      setQuestionsIsLoading(true);
      const { data } = await FetchApi({
        url: `/question/all-questions?page=${currentQuestionPage}&limit=${itemsPerPage}&search=${search}`,
      });
      setCurrentQuestions(data.data.data);
      setQuestionsIsLoading(false);
      setquestionCount(data.data.totalCount);
    };
    loadData();
  }, [search, currentQuestionPage]);
  return (
    <div className="container py-20 ">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          {!questionsIsLoading && (
            <>
              <p className="text-[24px] text-primary">
                <span className="font-bold">{questionCount}</span> Results for{" "}
                <span className="font-bold">{`"${search}"`}</span>
              </p>
              <hr className="my-4" />
            </>
          )}
          <div className="max-w-screen w-full overflow-x-auto whitespace-nowrap md:whitespace-normal">
            {questionsIsLoading && (
              <div className="py-20 flex items-center w-full">
                <Loader size="lg" className="mx-auto" />
              </div>
            )}
            {!questionsIsLoading && (
              <>
                <table className="w-full  space-y-2 ">
                  <tbody className="text-sm xl:text-base  ">
                    {currentQuestions?.map((question, i) => (
                      <tr key={i} className=" ">
                        <td
                          onClick={() =>
                            router.push(`/home/questions/${question?._id}`)
                          }
                          className="flex my-1 cursor-pointer flex-col md:flex-row items-start gap-2 md:gap-7 md:items-center w-full justify-between bg-secondary-low p-5  rounded-xl border-2 border-secondary-mid"
                        >
                          <div className="flex items-center gap-5 w-full ">
                            <div className="lg:size-16 rounded-full overflow-hidden min-w-12 lg:min-w-16 size-12 flex items-center justify-center">
                              <Profile
                                imgUrl={question?.userId?.profilePicture}
                                className={"!size-14"}
                              />
                            </div>
                            <div>
                              <p className="text-base lg:text-xl text-primary font-semibold">
                                {question?.title}
                              </p>
                              <p className="text-sm lg:text-base text-secondary">
                                {question.categories
                                  ?.map((item) => item.name)
                                  .join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center ml-16 lg:ml-0">
                            <p className="text-[#4B5563] whitespace-nowrap">
                              {timeAgo(question.createdAt)}
                            </p>
                            <div className="flex items-center gap-5 mt-2 font-medium text-[#4B5563]">
                              <div className="flex items-center gap-1">
                                <img src="/icons/like.svg" alt="" />
                                <p>{question?.likedUser?.length}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <img src="/icons/comments.svg" alt="" />
                                <p>{question.commentsCount}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {currentQuestions.length === 0 ? (
                  <p className="mx-auto text-xl font-semibold my-10 text-center">
                    0 Question Found
                  </p>
                ) : (
                  <div className="flex justify-end">
                    <Pagination
                      totalCount={questionCount}
                      currentPage={currentQuestionPage}
                      data={currentQuestions}
                      itemsPerPage={itemsPerPage}
                      setCurrentPage={setCurrentQuestionPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <FeatureCourses />
        </div>
        <div className="w-full lg:w-1/4 border h-max rounded-xl p-4">
          <h1 className="text-[24px] text-primary font-bold">Featured Blogs</h1>
          <hr className="my-3" />
          <div>
            <div
              onClick={() => router.push("/home/blogs/1")}
              className="rounded-xl shadow-lg cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden ">
                <img
                  src="https://i.ibb.co.com/mJjRm5y/Thumbnail-1.png"
                  alt=""
                  className="rounded-t-xl w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xl text-primary font-semibold">
                  GCSE biology combined science AQA 2024 - Dental Nursing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

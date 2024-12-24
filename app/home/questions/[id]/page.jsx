"use client";
import React, { useEffect, useRef, useState } from "react";
import profile from "@/public/profile.png";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { LuThumbsUp } from "react-icons/lu";
import Button from "@/components/Button";
import { BiSolidShare } from "react-icons/bi";
import SingleQuestionRecommendation from "@/components/pageComponents/questions/SingleQuestionRecommendation";
import FeatureBlogs from "@/components/pageComponents/home/FeatureBlogs";
import JoinSection from "@/components/pageComponents/common/JoinSection";
import TextEditor from "@/components/textEditor/TextEditor";
import { QuestionComments } from "@/components/pageComponents/questions/QuestionComments";
import { useParams } from "next/navigation";
import { FetchApi } from "@/utils/FetchApi";
import { timeAgo, useAuth } from "@/utils/functions";
import Profile from "@/components/Profile";
import { Loader } from "rsuite";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import toast from "react-hot-toast";

const Page = () => {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState({});
  const recommendedCount = 5;
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const [questionsIsLoading, setQuestionsIsLoading] = useState(false);
  const { auth } = useAuth();
  const [rootCommentContent, setRootCommentContent] = useState("");
  const [currentRootComments, setCurrentRootComments] = useState([]);
  const [totalRootCommentsCount, setTotalRootCommentsCount] = useState(0);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const commentsPerPage = 5;
  const editorRef = useRef(null);
  const [isLiked, setIsLiked] = useState(
    currentQuestion?.likedUser?.includes(auth?._id)
  );
  useEffect(() => {
    const loadData = async () => {
      setQuestionsIsLoading(true);
      try {
        const { data } = await FetchApi({
          url: `/question/${id}`,
        });
        const { data: commentsData } = await FetchApi({
          url: `/comment/root-comments/${id}`,
        });
        setCurrentRootComments(commentsData?.data?.comments);
        setTotalRootCommentsCount(commentsData?.data?.totalComments);
        const { data: recommendedQuestions } = await FetchApi({
          url: `/question/all-questions?page=1&limit=${recommendedCount}&category=${JSON.stringify(
            data.data?.question?.categories?.map((item) => item._id)
          )}&latest=true`,
        });
        setRecommendedQuestions(recommendedQuestions.data.data);
        setCurrentQuestion(data.data.question);
        setIsLiked(data.data.question?.likedUser?.includes(auth?._id));
        setQuestionsIsLoading(false);
      } catch (error) {
        console.error(error);
        setQuestionsIsLoading(false);
      }
    };
    loadData();
  }, []);
  const handleLikeQuestion = async () => {
    if (isLiked) {
      try {
        const { data } = await FetchApi({
          url: `/question/dislike/${id}`,
          method: "post",
        });
        if (data.success) {
          setCurrentQuestion({
            ...currentQuestion,
            likedUser: currentQuestion.likedUser.filter(
              (item) => item !== auth?._id
            ),
          });
        }
      } catch (error) {}
    } else {
      try {
        const { data } = await FetchApi({
          url: `/question/like/${id}`,
          method: "post",
        });
        if (data.success) {
          setCurrentQuestion({
            ...currentQuestion,
            likedUser: [...currentQuestion.likedUser, auth?._id],
          });
        }
      } catch (error) {}
    }
    setIsLiked(!isLiked);
  };
  const handleCreateComment = async () => {
    const payload = {
      postId: id,
      parentId: null,
      content: rootCommentContent,
      userId: auth?._id,
      postType: "Question",
    };
    const { data } = await FetchApi({
      url: "/comment/create-comment",
      data: payload,
      isToast: true,
      method: "post",
      callback: () => {
        setShowReplyEditor(false);
        setRootCommentContent("");
      },
    });
    if (data?.data) {
      setCurrentRootComments([data.data, ...currentRootComments]);
    }
  };
  return (
    <div className=" ">
      <div className=" py-10 lg:py-20 container">
        {(currentQuestion?._id || questionsIsLoading) && (
          <div className="flex gap-5 flex-col lg:flex-row">
            <div className="w-full lg:w-2/3">
              <div className="flex items-center flex-wrap gap-1 text-primary font-medium">
                Forum
                <FaChevronRight />
                {currentQuestion?.categories
                  ?.map((item) => item.name)
                  .join(", ")}
              </div>
              <hr className="my-3" />
              {questionsIsLoading ? (
                <div className=" flex justify-center py-20">
                  <Loader size="lg" />
                </div>
              ) : (
                <div className="p-3 sm:p-4 rounded-xl bg-secondary-low border border-secondary-mid">
                  <p className="text-primary text-xl md:text-2xl font-semibold">
                    {currentQuestion?.title}
                  </p>
                  <p className="text-secondary text-sm md:text-base">
                    {currentQuestion?.categories
                      ?.map((item) => item.name)
                      .join(", ")}
                  </p>
                  <div className="my-3 mx-0 bg-white p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Profile
                        imgUrl={currentQuestion?.userId?.profilePicture}
                        className={"!size-12"}
                      />
                      <div>
                        <p className="font-semibold">
                          {currentQuestion?.userId?.name}
                        </p>
                        <p className="text-sm text-lightGray">
                          {timeAgo(currentQuestion.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p
                      className=" mt-3"
                      dangerouslySetInnerHTML={{
                        __html: currentQuestion?.content?.replace(
                          /\n/g,
                          "<br />"
                        ),
                      }}
                    ></p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-7">
                        <button
                          onClick={handleLikeQuestion}
                          className="flex text-primary items-center gap-1"
                        >
                          {currentQuestion?.likedUser?.includes(auth?._id) ? (
                            <RiThumbUpFill size={22} />
                          ) : (
                            <RiThumbUpLine size={22} />
                          )}
                          {currentQuestion?.likedUser?.length}
                        </button>
                        <p className="flex text-primary items-center gap-1">
                          <svg
                            width="22"
                            height="23"
                            viewBox="0 0 26 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.57988 26.57L7.05855 26.4363C7.51896 26.3076 7.78789 25.83 7.65924 25.3696L2.18655 5.78498C2.10933 5.50859 1.92547 5.2742 1.67542 5.13338C1.42538 4.99255 1.12963 4.95683 0.853244 5.03407L0.791427 5.05133C0.215852 5.21214 -0.120379 5.8091 0.0404303 6.38468L5.51325 25.9693C5.64191 26.4297 6.11945 26.6987 6.57988 26.57Z"
                              fill="#3C55A5"
                            />
                            <path
                              d="M25.8521 12.8837C24.1166 12.0183 22.5111 10.9138 21.0825 9.60231C20.9624 9.49239 20.9154 9.32365 20.9614 9.16748C21.6693 6.48957 22.195 3.76679 22.5349 1.01783C22.5887 0.560588 22.3421 0.426105 22.0821 0.739898C16.9807 6.84093 8.15418 -0.376309 2.90039 5.16886C2.96347 5.28696 3.01309 5.41177 3.04832 5.54093L6.59867 18.254C11.8614 12.7761 20.6566 19.9485 25.749 13.8609C26.009 13.5471 26.0583 12.9733 25.8521 12.8837Z"
                              fill="#3C55A5"
                            />
                          </svg>
                          {currentQuestion?.reportedUser?.length}
                        </p>
                      </div>
                      {!showReplyEditor && (
                        <Button
                          onClick={() => {
                            if (auth?._id) {
                              setShowReplyEditor(true);
                            } else {
                              toast.error("You need to login");
                            }
                          }}
                          className={"flex items-center gap-2 !px-3"}
                        >
                          <BiSolidShare size={24} /> Reply
                        </Button>
                      )}
                    </div>
                    {showReplyEditor && (
                      <div className="space-y-4">
                        <TextEditor
                          editor={editorRef}
                          content={rootCommentContent}
                          setContent={setRootCommentContent}
                          className={"mt-5"}
                          placeholder={"Enter your reply here..."}
                        />
                        <Button
                          className={" ml-auto flex items-center gap-2 !px-3"}
                          onClick={handleCreateComment}
                        >
                          <BiSolidShare size={24} />
                          Submit Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <QuestionComments
                comments={currentRootComments}
                setComments={setCurrentRootComments}
                commentsPerPage={commentsPerPage}
                currentCommentPage={currentCommentPage}
                totalComments={totalRootCommentsCount}
                setCurrentCommentPage={setCurrentCommentPage}
              />
            </div>
            <div className="w-full lg:w-1/3">
              {questionsIsLoading ? (
                <div className=" flex justify-center py-20">
                  <Loader size="lg" />
                </div>
              ) : (
                <SingleQuestionRecommendation
                  questions={recommendedQuestions.filter(
                    (item) => item?._id !== id
                  )}
                />
              )}
            </div>
          </div>
        )}
        {!currentQuestion?._id && (
          <div className="py-20">
            <p className="text-center text-3xl font-semibold">
              Question Not Found
            </p>
          </div>
        )}
        <div className="mt-20">
          <FeatureBlogs />
        </div>
      </div>
      <div className="">
        <JoinSection />
      </div>
    </div>
  );
};

export default Page;

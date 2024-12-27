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
import { FetchApi } from "@/utils/FetchApi";
import { useParams } from "next/navigation";
import { useAuth } from "@/utils/functions";
import toast from "react-hot-toast";
import Loading from "@/components/pageComponents/common/Loading";

const Page = () => {
  const [currentPoll, setCurrentPoll] = useState({});
  const recommendedCount = 5;
  const [currentRootComments, setCurrentRootComments] = useState([]);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [totalRootCommentsCount, setTotalRootCommentsCount] = useState(0);
  const [commentsIsLoading, setCommentsIsLoading] = useState(false);
  const [questionsIsLoading, setQuestionsIsLoading] = useState(false);
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const editorRef = useRef(null);
  const [rootCommentContent, setRootCommentContent] = useState("");
  const handleCreateComment = async () => {
    const payload = {
      postId: id,
      parentId: null,
      content: rootCommentContent,
      userId: auth?._id,
      postType: "Poll",
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
  const { id } = useParams();
  const { auth } = useAuth();
  const commentsPerPage = 10;
  useEffect(() => {
    const loadData = async () => {
      setQuestionsIsLoading(true);
      setCommentsIsLoading(true);
      try {
        const { data } = await FetchApi({
          url: `/poll/${id}`,
        });
        if (auth?._id) {
          const { data } = await FetchApi({
            url: `/poll/poll-response/${id}/${auth?._id}`,
          });
          setSelectedPollOption(data?.data?.optionId);
        }
        setCurrentPoll(data.data);
        const { data: recommendedQuestions } = await FetchApi({
          url: `/question/all-questions?page=1&limit=${recommendedCount}&latest=true`,
        });
        setRecommendedQuestions(recommendedQuestions.data.data);
        setQuestionsIsLoading(false);
        const { data: commentsData } = await FetchApi({
          url: `/comment/root-comments/${id}`,
        });
        setCurrentRootComments(commentsData?.data?.comments);
        setTotalRootCommentsCount(commentsData?.data?.totalComments);
        setCommentsIsLoading(false);
      } catch (error) {
        console.error(error);
        setQuestionsIsLoading(false);
      }
    };
    loadData();
  }, []);
  const handleVotePoll = async () => {
    if (!auth?._id) return toast.error("You need to login");
    if (!selectedPollOption) return toast.error("Select a option");
    await FetchApi({
      url: `/poll/vote`,
      method: "post",
      isToast: true,
      data: {
        userId: auth?._id,
        pollId: currentPoll?._id,
        optionId: selectedPollOption,
      },
    });
  };
  // 
  return (
    <div className=" ">
      <div className=" py-10 lg:py-20 container">
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center flex-wrap gap-1 text-primary font-medium">
              Forum
              <FaChevronRight />
              Poll
            </div>
            <hr className="my-3" />
            {!questionsIsLoading ? (
              <>
                <div className="bg-secondary-low p-3 rounded-md">
                  <div className="p-3 md:p-5 rounded-md bg-[#1BB68A24] border-2 border-secondary-mid ">
                    <p className="text-xl text-primary font-semibold">
                      {currentPoll?.content}
                    </p>
                    <div className="mt-4 space-y-2.5">
                      {currentPoll?.options?.map((item, i) => (
                        <button
                          onClick={() => {
                            if (!currentPoll?.votedUser?.includes(auth?._id)) {
                              setSelectedPollOption(item?._id);
                            } else {
                              toast.error("You have voted this poll already");
                            }
                          }}
                          key={i}
                          className={`px-5 py-1.5 font-semibold duration-100 rounded-full border border-secondary   w-full text-start ${
                            selectedPollOption === item?._id
                              ? "bg-secondary text-white"
                              : "bg-white text-secondary"
                          }`}
                        >
                          {item?.value}
                        </button>
                      ))}
                    </div>
                    <hr className="my-3" />
                    <Button
                      onClick={handleVotePoll}
                      className={"w-full"}
                      variant="primary"
                      size="lg"
                    >
                      Vote Now
                    </Button>
                    {!showReplyEditor && (
                      <Button
                        onClick={() => {
                          if (auth?._id) {
                            setShowReplyEditor(true);
                          } else {
                            toast.error("You need to login");
                          }
                        }}
                        className={"flex items-center ml-auto mt-3 gap-2 !px-3"}
                      >
                        <BiSolidShare size={24} /> Reply
                      </Button>
                    )}
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
                  {!commentsIsLoading ? (
                    <QuestionComments
                      comments={currentRootComments}
                      commentsPerPage={commentsPerPage}
                      currentCommentPage={currentCommentPage}
                      setComments={setCurrentRootComments}
                      setCurrentCommentPage={setCurrentCommentPage}
                      totalComments={totalRootCommentsCount}
                    />
                  ) : (
                    <Loading />
                  )}
              </>
            ) : (
              <Loading />
            )}
          </div>
          <div className="w-full lg:w-1/3">
            {!questionsIsLoading && (
              <SingleQuestionRecommendation questions={recommendedQuestions} />
            )}
          </div>
        </div>
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

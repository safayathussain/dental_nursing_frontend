import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/utils/functions";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import Profile from "@/components/Profile";
import Pagination from "@/components/Pagination";
import TextEditor from "@/components/textEditor/TextEditor";
import { LuThumbsUp } from "react-icons/lu";
import { BiSolidShare } from "react-icons/bi";
import toast from "react-hot-toast";
import { FetchApi } from "@/utils/FetchApi";
import { timeAgo } from "@/utils/functions";

const ReportIcon = () => (
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
);

const Comment = ({
  comment,
  level = 0,
  replyState,
  auth,
  onReplyToggle,
  onReplySubmit,
  onLoadReplies,
  onRemoveChildren,
  isExpandState,
  setIsExpandState,
  editorRefs,
  editorContents,
  setEditorContents,
}) => {
  const isRootComment = !comment.parentId;
  const isExpanded = isExpandState[comment._id] || false;
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRefs.current[comment._id]) {
      editorRefs.current[comment._id] = editorRef;
    }
    return () => {
      if (editorRef.current?.destruct) {
        editorRef.current.destruct();
      }
    };
  }, [comment._id, editorRefs]);

  return (
    <div className={`${level > 0 ? "ml-4" : " mt-4"} mt-2`}>
      <div
        className={` mx-0 ${
          isRootComment ? "border rounded-lg bg-white p-3 sm:p-4" : ""
        }`}
      >
        <div
          className={
            !isRootComment
              ? "border-l-4 border-secondary bg-secondary-mid p-3 sm:p-4"
              : ""
          }
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              <Profile imgUrl={comment?.userId?.profilePicture} />
            </div>
            <div>
              <p className="font-semibold">{comment?.userId?.name}</p>
              <p className="text-sm text-lightGray">
                {timeAgo(comment?.createdAt)}
              </p>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: comment?.content }}
            className="mt-3"
          />

          <div
            className={`mt-5 ${
              !replyState[comment._id] && "flex justify-between"
            }`}
          >
            <div className="flex items-center gap-7">
              <p className="flex text-primary items-center gap-1">
                <LuThumbsUp size={22} /> {comment?.likedUser?.length || 0}
              </p>
              <p className="flex text-primary items-center gap-1">
                <ReportIcon />
                {comment?.reportedUser?.length || 0}
              </p>
            </div>

            {!replyState[comment._id] ? (
              <Button
                onClick={() =>
                  auth?._id
                    ? onReplyToggle(comment._id)
                    : toast.error("You need to login")
                }
                className="flex items-center gap-2 !px-3"
              >
                <BiSolidShare size={24} /> Reply
              </Button>
            ) : (
              <div className="space-y-4">
                <TextEditor
                  editor={editorRef}
                  content={editorContents[comment._id] || ""}
                  setContent={(content) => {
                    setEditorContents((prev) => ({
                      ...prev,
                      [comment._id]: content,
                    }));
                  }}
                  className="mt-5"
                  placeholder="Enter your reply here..."
                />
                <Button
                  className="ml-auto flex items-center gap-2 !px-3"
                  onClick={() =>
                    onReplySubmit(
                      comment.rootCommentId || comment._id,
                      comment._id
                    )
                  }
                >
                  <BiSolidShare size={24} />
                  Submit Reply
                </Button>
              </div>
            )}
          </div>

          {isRootComment && comment.childrensCount > 0 && (
            <button
              onClick={() => {
                setIsExpandState((prev) => ({
                  ...prev,
                  [comment._id]: !isExpanded,
                }));
                if (!isExpanded) {
                  onLoadReplies(comment._id);
                } else {
                  onRemoveChildren(comment._id);
                }
              }}
              className="mt-4 underline text-primary font-medium"
            >
              {!isExpanded ? "Show" : "Hide"} {comment.childrensCount}{" "}
              {comment.childrensCount === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {comment?.children?.length > 0 && (
          <div className="ml-4">
            {comment.children.map((childComment, index) => (
              <Comment
                key={childComment._id || index}
                comment={childComment}
                level={level + 1}
                replyState={replyState}
                auth={auth}
                onReplyToggle={onReplyToggle}
                onReplySubmit={onReplySubmit}
                onLoadReplies={onLoadReplies}
                onRemoveChildren={onRemoveChildren}
                isExpandState={isExpandState}
                setIsExpandState={setIsExpandState}
                editorRefs={editorRefs}
                editorContents={editorContents}
                setEditorContents={setEditorContents}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const QuestionComments = ({
  comments,
  setComments,
  totalComments,
  currentCommentPage,
  commentsPerPage,
  setCurrentCommentPage,
}) => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [replyState, setReplyState] = useState({});
  const [isExpandState, setIsExpandState] = useState({});
  const [editorContents, setEditorContents] = useState({});
  const editorRefs = useRef({});

  useEffect(() => {
    return () => {
      Object.values(editorRefs.current).forEach((ref) => {
        if (ref?.current?.destruct) {
          ref.current.destruct();
        }
      });
    };
  }, []);

  const handleReplyToggle = (parentId) => {
    setReplyState((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));

    if (!replyState[parentId]) {
      setEditorContents((prev) => ({ ...prev, [parentId]: "" }));
    }
  };

  const handleLoadReplies = async (commentId) => {
    try {
      const { data } = await FetchApi({ url: `/comment/replies/${commentId}` });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, children: data?.data || [] }
            : comment
        )
      );
    } catch (error) {
      toast.error("Failed to load replies");
    }
  };

  const handleReplySubmit = async (rootCommentId, parentId) => {
    const content = editorContents[parentId];
    if (!content) {
      toast.error("Please enter a reply");
      return;
    }

    try {
      await FetchApi({
        url: "/comment/create-comment",
        method: "post",
        data: {
          postId: id,
          parentId,
          content,
          rootCommentId,
          userId: auth?._id,
          postType: "Question",
        },
      });

      setReplyState((prev) => ({ ...prev, [parentId]: false }));
      setEditorContents((prev) => ({ ...prev, [parentId]: "" }));

      if (rootCommentId) {
        await handleLoadReplies(rootCommentId);
      } else {
        // Refresh the main comments list if it's a root comment
        const { data } = await FetchApi({
          url: `/comment/root-comments/${id}`,
        });
        if (data?.data?.comments) {
          setComments(response.data.data);
        }
      }

      toast.success("Reply submitted successfully");
    } catch (error) {
      console.error("Reply submission error:", error);
      toast.error("Failed to submit reply");
    }
  };

  const removeChildToComment = (parentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === parentId ? { ...comment, children: [] } : comment
      )
    );
  };

  return (
    <div className="">
      {comments?.map((comment, index) => (
        <Comment
          key={comment._id || index}
          comment={comment}
          replyState={replyState}
          auth={auth}
          onReplyToggle={handleReplyToggle}
          onReplySubmit={handleReplySubmit}
          onLoadReplies={handleLoadReplies}
          onRemoveChildren={removeChildToComment}
          isExpandState={isExpandState}
          setIsExpandState={setIsExpandState}
          editorRefs={editorRefs}
          editorContents={editorContents}
          setEditorContents={setEditorContents}
        />
      ))}
    </div>
  );
};

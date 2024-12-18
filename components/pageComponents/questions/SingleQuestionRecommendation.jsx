import React from "react";

const SingleQuestionRecommendation = ({ title }) => {
  return (
    <div>
      <div className="p-4 rounded-xl border border-secondary-mid space-y-3">
        {title && (
          <>
            <p className="text-2xl text-primary font-semibold">{title}</p>
            <hr className="my-3" />
          </>
        )}
        <div className="p-3 border bg-secondary-low rounded-xl  border-secondary-mid">
          <p className="text-lightGray text-sm">14 minutes ago</p>
          <p className="text-primary text-lg font-semibold my-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="flex items-center justify-between">
            <span></span>
            <div className="flex items-center gap-5 mt-2 font-medium text-[#4B5563]">
              <div className="flex items-center gap-1">
                <img src="/icons/like.svg" alt="" />
                <p>124</p>
              </div>
              <div className="flex items-center gap-1">
                <img src="/icons/comments.svg" alt="" />
                <p>124</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border bg-secondary-low rounded-xl  border-secondary-mid">
          <p className="text-lightGray text-sm">14 minutes ago</p>
          <p className="text-primary text-lg font-semibold my-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="flex items-center justify-between">
            <span></span>
            <div className="flex items-center gap-5 mt-2 font-medium text-[#4B5563]">
              <div className="flex items-center gap-1">
                <img src="/icons/like.svg" alt="" />
                <p>124</p>
              </div>
              <div className="flex items-center gap-1">
                <img src="/icons/comments.svg" alt="" />
                <p>124</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestionRecommendation;

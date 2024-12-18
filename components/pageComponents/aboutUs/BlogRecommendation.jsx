import React from "react";

const BlogRecommendation = ({ title }) => {
  return (
    <div>
      <div className="p-4 rounded-xl border border-secondary-mid space-y-3">
        {title && (
          <>
            <p className="text-2xl text-primary font-semibold">{title}</p>
            <hr className="my-3" />
          </>
        )}

        <div className="p-3 border bg-primary-low rounded-xl  border-secondary-mid">
          <p className="text-primary text-lg font-semibold my-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-lightGray text-sm">14 minutes ago</p>
        </div>
        <div className="p-3 border bg-primary-low rounded-xl  border-secondary-mid">
          <p className="text-primary text-lg font-semibold my-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-lightGray text-sm">14 minutes ago</p>
        </div>
      </div>
    </div>
  );
};

export default BlogRecommendation;

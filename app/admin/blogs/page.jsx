"use client";
import CreateBlogForm from "@/components/admin/CreateBlogForm";
import BlogsTable from "@/components/admin/tables/BlogsTable";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  return (
    <div>
      {showAddBlogForm ? (
        <CreateBlogForm
          setShowAddBlogForm={setShowAddBlogForm}
          data={currentBlog}
          setData={setCurrentBlog}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Blogs</p>
            <Button
              variant={"primary-blue"}
              onClick={() => setShowAddBlogForm(true)}
              className={"flex items-center text-white gap-1.5"}
            >
              <FaPlus size={18} /> Add Blog
            </Button>
          </div>
          <BlogsTable
            setCurrentEditBlog={setCurrentBlog}
            setShowAddBlogForm={setShowAddBlogForm}
          />
        </div>
      )}
    </div>
  );
};

export default page;

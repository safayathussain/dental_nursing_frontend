"use client";
import CreateCourseForm from "@/components/admin/CreateCourseForm";
import CourseTable from "@/components/admin/tables/CoursesTable";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const Page = () => {
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  return (
    <div>
      {showAddCourseForm ? (
        <CreateCourseForm
          setShowAddCourseForm={setShowAddCourseForm}
          data={currentCourse}
          setData={setCurrentCourse}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Categories</p>
            <Button
              variant={"primary-blue"}
              onClick={() => setShowAddCourseForm(true)}
              className={"flex items-center text-white gap-1.5"}
            >
              <FaPlus size={18} /> Add Course
            </Button>
          </div>
          <CourseTable
            setCurrentEditCourse={setCurrentCourse}
            setShowAddCourseForm={setShowAddCourseForm}
          />
        </div>
      )}
    </div>
  );
};

export default Page;

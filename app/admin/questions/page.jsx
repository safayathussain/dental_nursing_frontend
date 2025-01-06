"use client";
import QuestionsTable from "@/components/admin/tables/QuestionTable";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const Page = () => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Questions</p>
        </div>
        <QuestionsTable />
      </div>
    </div>
  );
};

export default Page;

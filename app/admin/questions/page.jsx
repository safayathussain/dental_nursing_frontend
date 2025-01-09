"use client";
import QuestionsTable from "@/components/admin/tables/QuestionTable";
import React, { useEffect, useState } from "react"; 

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

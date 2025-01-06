"use client";
import QuestionsTable from "@/components/admin/tables/QuestionTable";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Questions</p>
        </div>
        <QuestionsTable
          setCurrentEditQuestion={setCurrentQuestion}
          setShowAddQuestionForm={setShowAddQuestionForm}
        />
      </div>
    </div>
  );
};

export default page;

"use client";
import CreatePollForm from "@/components/admin/CreatePollForm";
import PollsTable from "@/components/admin/tables/PollsTable";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  const [showAddPollForm, setShowAddPollForm] = useState(false);
  const [currentPoll, setCurrentPoll] = useState(null);

  return (
    <div>
      {showAddPollForm ? (
        <CreatePollForm
          setShowAddPollForm={setShowAddPollForm}
          data={currentPoll}
          setData={setCurrentPoll}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Polls</p>
            <Button
              variant={"primary-blue"}
              onClick={() => setShowAddPollForm(true)}
              className={"flex items-center text-white gap-1.5"}
            >
              <FaPlus size={18} /> Add Poll
            </Button>
          </div>
          <PollsTable
            setCurrentEditPoll={setCurrentPoll}
            setShowAddPollForm={setShowAddPollForm}
          />
        </div>
      )}
    </div>
  );
};

export default page;

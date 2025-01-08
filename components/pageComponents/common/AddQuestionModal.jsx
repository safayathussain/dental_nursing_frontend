"use client";
import React from "react";
import TextInput from "../../TextInput";
import TextArea from "../../TextArea";
import { CgClose } from "react-icons/cg";
import { FaCheck, FaPlus } from "react-icons/fa6";
import Button from "../../Button";
import Modal from "@/components/Modal";
import TextEditor from "@/components/textEditor/TextEditor";
import { useAuth, useCategories } from "@/utils/functions";
import { useState } from "react";
import { FetchApi } from "@/utils/FetchApi";
import toast from "react-hot-toast";

const AddQuestionModal = ({ open, setOpen }) => {
  const { auth } = useAuth();
  const { categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handlePostQueston = async (e) => {
    e.preventDefault();
    const title = e.target.title?.value;
    const content = e.target.content?.value;
    if (!title) return toast.error("Title is required");
    if (!content) return toast.error("Content is required");
    await FetchApi({
      url: "/question/post-question",
      method: "post",
      data: {
        content,
        title,
        categories: selectedCategories?.map((item) => item._id),
        userId: auth._id,
      },
      callback: () => {
        setOpen(false);
      },
      isToast: true,
    });
  };
  return (
    <form onSubmit={handlePostQueston}>
      <Modal setOpen={setOpen} className={"max-w-[600px] w-[90vw]"}>
        <>
          <h1 className="text-3xl font-bold text-primary">Ask a Question</h1>
          <CgClose
            className="absolute top-0 right-3 text-primary cursor-pointer"
            onClick={() => setOpen(false)}
            size={24}
          />
          <TextInput label={"Enter Your title for the post"} name={"title"} />
          <TextArea
            label={"Type your question here..."}
            rows={5}
            name={"content"}
          />

          <div>
            <p className="text-[#4B5563] text-sm">Enter post category</p>
            <div className="p-2 rounded-md border mt-0.5 flex items-center flex-wrap gap-2 text-sm md:text-base">
              {selectedCategories?.map((item, i) => (
                <div
                  onClick={() => {
                    const filteredCtg = selectedCategories.filter(
                      (ctg) => ctg._id !== item._id
                    );
                    setSelectedCategories(filteredCtg);
                  }}
                  key={i}
                  className="flex items-center gap-1 cursor-pointer bg-secondary text-white w-min px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  <span>{item?.name}</span>
                  <FaCheck size={16} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5 overflow-x-scroll">
            {categories?.map(
              (item, i) =>
                !selectedCategories.includes(item) && (
                  <div
                    onClick={() =>
                      setSelectedCategories([...selectedCategories, item])
                    }
                    key={i}
                    className="flex items-center gap-1 text-primary bg-secondary-mid  cursor-pointer rounded-full px-4 font-semibold py-1.5"
                  >
                    <span>{item?.name}</span>
                    <FaPlus />
                  </div>
                )
            )}
          </div>
          <Button className={"w-full"} type="submit">
            Submit
          </Button>
        </>
      </Modal>
    </form>
  );
};

export default AddQuestionModal;

import React, { useRef } from "react";
import TextInput from "../../TextInput";
import TextArea from "../../TextArea";
import { CgClose } from "react-icons/cg";
import { FaCheck, FaCross, FaPlus } from "react-icons/fa6";
import Button from "../../Button";
import useClickOutside from "@/utils/useClickOutside";

const AddQuestionModal = ({ open, setOpen }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, () => {
    setOpen(false);
  });
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black z-10 bg-opacity-20`}
    >
      <div className="flex items-center justify-center h-full">
        <div
          ref={modalRef}
          className="w-[600px] bg-white rounded-xl p-5 space-y-3 relative"
        >
          <h1 className="text-3xl font-bold text-primary">Ask a Question</h1>
          <CgClose
            className="absolute top-0 right-3 text-primary cursor-pointer"
            onClick={() => setOpen(false)}
            size={24}
          />
          <TextInput label={"Enter Your title for the post"} />
          <TextArea label={"Type your question here..."} rows={5} />
          <div>
            <p className="text-[#4B5563] text-sm">Enter post category</p>
            <div className="p-2 rounded-md border mt-0.5">
              <div className="flex items-center gap-1 bg-secondary text-white w-min px-3 py-1.5 rounded-full whitespace-nowrap">
                <span>Job Help</span>
                <FaCheck size={16} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-1 text-primary bg-secondary-mid  cursor-pointer rounded-full px-4 font-semibold py-1.5">
              <span>Dental</span>
              <FaPlus />
            </div>
            <div className="flex items-center gap-1 text-primary bg-secondary-mid  cursor-pointer rounded-full px-4 font-semibold py-1.5">
              <span>Admissoin</span>
              <FaPlus />
            </div>
            <div className="flex items-center gap-1 text-primary bg-secondary-mid  cursor-pointer rounded-full px-4 font-semibold py-1.5">
              <span>Education</span>
              <FaPlus />
            </div>
          </div>
          <Button className={"w-full"}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;

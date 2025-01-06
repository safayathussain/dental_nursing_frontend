"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Button from "../Button";
import TextInput from "../TextInput";
import MultipleSelect from "../MultipleSelect";
import TagsPicker from "../TagsPicker";
import TextEditor from "../textEditor/TextEditor";
import { FetchApi } from "@/utils/FetchApi";
import { calculateVotePercentages, useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";
import TextInputWithBtn from "../TextInputWithBtn";
import { CgClose } from "react-icons/cg";

const CreatePollForm = ({ setShowAddPollForm, data, setData }) => {
  const [options, setOptions] = useState(data?.options || []);
  const [createOptionValue, setcreateOptionValue] = useState(null);
  const { auth } = useAuth();
  const createOptionRef = useRef(null);
  const onPublish = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    if (data?._id) {
      await FetchApi({
        url: `/poll/update-poll/${data?._id}`,
        method: "put",
        data: {
          userId: auth?._id,
          content,
          options,
        },
        callback: () => {
          setShowAddPollForm(false);
        },
        isToast: true,
      });
    } else {
      await FetchApi({
        url: "/poll/create-poll",
        method: "post",
        data: {
          userId: auth?._id,
          content,
          options,
        },
        callback: () => {
          setShowAddPollForm(false);
        },
        isToast: true,
      });
    }
  };

  return (
    <form onSubmit={onPublish}>
      <div className="flex justify-between items-center">
        <div className="text-2xl flex items-center gap-1">
          <IoChevronBack
            className="cursor-pointer text-3xl"
            onClick={() => {
              setData(null);
              setShowAddPollForm(false);
            }}
          />
          <p>{data?._id ? data?.content : "Create a poll"}</p>
        </div>
        <Button variant="primary-blue">Publish</Button>
      </div>
      <div className="mt-10 space-y-3">
        <TextInput
          defaultValue={data?.content}
          label={"Content"}
          name={"content"}
        />
        <TextInputWithBtn
          inputRef={createOptionRef}
          buttonType="button"
          rounded="lg"
          label={"Add Option"}
          name={"optionValue"}
          buttonChild={"Add Option"}
          className={"!border p-2"}
          onChange={(e) => setcreateOptionValue(e.target.value)}
          disableBtn={!createOptionValue}
          onClick={() => {
            createOptionRef.current.value = "";
            setOptions([...options, { value: createOptionValue }]);
          }}
          buttonClass="whitespace-nowrap !rounded-l-none text-white !bg-primary !py-2.5"
        />
        <p className="text-xl">Options</p>
        <div className="grid grid-cols-2 gap-5">
          {calculateVotePercentages(options)?.map((item, i) => (
            <div key={i} className="border rounded-md">
              <div
                className={`p-2 whitespace-nowrap rounded-md  bg-primary bg-opacity-60  flex items-center justify-between`}
                style={{ width: `${item?.percentage}%` }}
              >
                <p>
                  {item?.value || item}{" "}
                  <span className="text-xs">({item?.percentage}%)</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOptions(
                      options?.filter(
                        (i) => i?._id !== item?._id || i.value !== item.value
                      )
                    );
                  }}
                >
                  <CgClose size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default CreatePollForm;

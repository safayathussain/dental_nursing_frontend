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

const CreateCategoryForm = ({ setShowAddCategoryForm, data, setData }) => {
  const { auth } = useAuth();
  const onPublish = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (data?._id) {
      await FetchApi({
        url: `/category/update-category/${data?._id}`,
        method: "put",
        data: {
          userId: auth?._id,
          name
        },
        callback: () => {
          setShowAddCategoryForm(false);
        },
        isToast: true,
      });
    } else {
      await FetchApi({
        url: "/category/create-category",
        method: "post",
        data: {
          userId: auth?._id,
          name
        },
        callback: () => {
          setShowAddCategoryForm(false);
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
              setShowAddCategoryForm(false);
            }}
          />
          <p>{data?._id ? data?.name : "Create a category"}</p>
        </div>
        <Button variant="primary-blue">Save</Button>
      </div>
      <div className="mt-10 space-y-3">
        <TextInput
          defaultValue={data?.name}
          label={"Name"}
          name={"name"}
        />
      </div>
    </form>
  );
};

export default CreateCategoryForm;

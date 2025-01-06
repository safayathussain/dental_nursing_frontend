"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Button from "../Button";
import TextInput from "../TextInput";
import MultipleSelect from "../MultipleSelect";
import TagsPicker from "../TagsPicker";
import TextEditor from "../textEditor/TextEditor";
import { FetchApi } from "@/utils/FetchApi";
import { useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";

const CreateBlogForm = ({ setShowAddBlogForm, data, setData }) => {
  const [content, setContent] = useState(data?.content || "");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    data?.categories?.map((item) => item?._id) || []
  );
  const [tags, setTags] = useState(data?.tags || []);
  const { auth } = useAuth();
  const router = useRouter();
  const contentRef = useRef();
  useEffect(() => {
    const loadData = async () => {
      const { data: categoriesData } = await FetchApi({
        url: "/category/all-categories",
      });
      setAllCategories(categoriesData.data?.data);
    };
    loadData();
  }, []);
  const onPublish = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (data?._id) {
      await FetchApi({
        url: `/blog/edit-blog/${data?._id}`,
        method: "put",
        data: {
          userId: auth?._id,
          title,
          tags,
          categories: selectedCategories,
          content,
        },
        callback: () => {
          setShowAddBlogForm(false);
        },
        isToast: true,
      });
    } else {
      await FetchApi({
        url: "/blog/post-blog",
        method: "post",
        data: {
          userId: auth?._id,
          title,
          tags,
          categories: selectedCategories,
          content,
        },
        callback: () => {
          setShowAddBlogForm(false);
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
              setShowAddBlogForm(false);
            }}
          />
          <p>{data?._id ? data?.title : "Create a blog"}</p>
        </div>
        <Button variant="primary-blue">Publish</Button>
      </div>
      <div className="mt-10 space-y-3">
        <TextInput defaultValue={data?.title} label={"Title"} name={"title"} />
        <MultipleSelect
          label={"Categories"}
          data={allCategories.map((item) => {
            return { label: item?.name, value: item?._id };
          })}
          setValue={setSelectedCategories}
          value={selectedCategories}
        />
        <TagsPicker
          label={"Tags(with comma)"}
          setValue={setTags}
          defaultValue={tags}
          value={tags}
        />
        <TextEditor
          editor={contentRef}
          content={content}
          setContent={setContent}
          label={"Content"}
        />
      </div>
    </form>
  );
};

export default CreateBlogForm;

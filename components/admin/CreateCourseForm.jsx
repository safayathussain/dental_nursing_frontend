"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Button from "../Button";
import TextInput from "../TextInput";
import "rsuite/Uploader/styles/index.css";

import { FetchApi } from "@/utils/FetchApi";
import { useAuth } from "@/utils/functions";
import { Loader, Uploader } from "rsuite";
import Image from "next/image";
import { ImgURL } from "@/utils/constants";
import TextArea from "../TextArea";
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}
const CreateCourseForm = ({ setShowAddCourseForm, data, setData }) => {
  const { auth } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadedthumbUrl, setuploadedthumbUrl] = useState(
    data?.thumbnail || ""
  );
  const onPublish = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const url = e.target.url.value;
    const description = e.target.description.value;
    if (data?._id) {
      await FetchApi({
        url: `/course/update-course/${data?._id}`,
        method: "put",
        data: {
          userId: auth?._id,
          title,
          url,
          description,
          thumbnail: uploadedthumbUrl
        },
        callback: () => {
          setShowAddCourseForm(false);
        },
        isToast: true,
      });
    } else {
      await FetchApi({
        url: "/course/post-course",
        method: "post",
        data: {
          userId: auth?._id,
          title,
          url,
          description,
          thumbnail: uploadedthumbUrl
        },
        callback: () => {
          setShowAddCourseForm(false);
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
              setShowAddCourseForm(false);
            }}
          />
          <p>{data?._id ? data?.title : "Create a course"}</p>
        </div>
        <Button variant="primary-blue">Save</Button>
      </div>
      <div className="mt-10 space-y-3">
        <p>Thumbnail</p>
        <Uploader
          className="!block "
          fileListVisible={false}
          name="file"
          headers={{
            Authorization: `Bearer ${auth?.accessToken}`,
          }}
          listType="picture"
          action={`${process.env.NEXT_PUBLIC_BASE_API}/file/upload-files`}
          onUpload={(file) => {
            setUploading(true);
            previewFile(file.blobFile, (value) => {
              setFileInfo(value);
            });
          }}
          onSuccess={(response, file) => {
            setUploading(false);
            setuploadedthumbUrl(response?.data?.files[0]?.url);
          }}
          onError={() => {
            setFileInfo(null);
            setUploading(false);
            toast.error("Upload failed");
          }}
        >
          <button
            type="button"
            className=""
            style={{ width: 300, height: 168 }}
          >
            {uploading && <Loader backdrop center />}
            {fileInfo ? (
              <img src={fileInfo} width="100%" height="100%" />
            ) : (
              <Image
                src={`${ImgURL}/${data?.thumbnail}`}
                className={"  rounded-sm"}
                alt=""
                width={300}
                height={168}
              />
            )}
          </button>
        </Uploader>
        <TextInput defaultValue={data?.title} label={"Title"} name={"title"} />
        <TextInput defaultValue={data?.url} label={"URL"} name={"url"} />
        <TextArea
          defaultValue={data?.description}
          label={"Description"}
          name={"description"}
        />

      </div>
    </form>
  );
};

export default CreateCourseForm;

"use client";
import Button from "@/components/Button";
import Profile from "@/components/Profile";
import TextInput from "@/components/TextInput";
import { timeAgo, useAuth } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import { Loader, Uploader } from "rsuite";
import "rsuite/Uploader/styles/index.css";

import toast from "react-hot-toast";
import { FetchApi } from "@/utils/FetchApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/AuthSlice";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Loading from "@/components/pageComponents/common/Loading";
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Page = () => {
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth?._id) {
      router.push("/home");
    }
  }, []);

  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [name, setname] = useState(auth?.name);
  const [uploadedDpUrl, setuploadedDpUrl] = useState("");
  const [questionsIsLoading, setQuestionsIsLoading] = useState(false);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [selectedDeleteQuestion, setselectedDeleteQuestion] = useState(null);
  const [refetch, setrefetch] = useState(false);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const handleEditProfile = async () => {
    const body = {
      name,
      ...(uploadedDpUrl && { profilePicture: uploadedDpUrl }),
    };
    const { data } = await FetchApi({
      url: `/auth/edit-profile/${auth?._id}`,
      method: "put",
      data: body,
      isToast: true,
    });
    dispatch(setAuth(data?.data));
  };
  useEffect(() => {
    const loadData = async () => {
      if (auth?._id) {
        setQuestionsIsLoading(true);
        const { data } = await FetchApi({
          url: `/question/all-questions?userId=${auth?._id || null}`,
        });
        setQuestions(data.data?.data);
        setQuestionsIsLoading(false);
      }else {
        router.push('/home')
      }
    };
    loadData();
  }, [refetch, auth?._id]);
  const deleteQuestion = async () => {
    const { data } = await FetchApi({
      url: `/question/delete-question/${selectedDeleteQuestion}`,
      method: "delete",
      isToast: true,
      callback: () => {
        setselectedDeleteQuestion(null);
        setrefetch(!refetch);
      },
    });
  };
  return (
    <div className="container">
      <div className="flex flex-col items-center py-20">
        <p className="text-2xl font-semibold">Account Details</p>
        <Uploader
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
            setuploadedDpUrl(response?.data?.files[0]?.url);
          }}
          onError={() => {
            setFileInfo(null);
            setUploading(false);
            toast.error("Upload failed");
          }}
        >
          <button style={{ width: 100, height: 100 }}>
            {uploading && <Loader backdrop center />}
            {fileInfo ? (
              <img src={fileInfo} width="100%" height="100%" />
            ) : (
              <Profile
                imgUrl={auth?.profilePicture}
                className={"!size-20  rounded-sm"}
              />
            )}
          </button>
        </Uploader>

        <p className="font-medium mt-1">{auth?.name}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-10">
          <TextInput
            label={"Name"}
            className={"w-full"}
            value={name || auth?.name}
            onChange={(e) => setname(e.target.value)}
          />
          <TextInput
            label={"Email"}
            className={"w-full"}
            defaultValue={auth?.email}
            disabled
            type="email"
          />
        </div>
        <Button
          onClick={handleEditProfile}
          variant="primary-blue"
          className={"mt-5"}
        >
          Save Changes
        </Button>
      </div>
      <div className="py-10">
        <p className="text-2xl font-semibold text-center ">Questions</p>
        <div className="space-y-4 mt-5">
          {questionsIsLoading && (
            <div className="flex justify-center">
              <Loading />
            </div>
          )}
          {!questionsIsLoading && questions?.length === 0 && (
            <p className="text-center text-xl">0 Question found</p>
          )}
          {!questionsIsLoading &&
            questions?.map((question, i) => (
              <div
                key={i}
                className="flex my-1 cursor-pointer flex-col md:flex-row items-start gap-2 md:gap-7 md:items-center w-full justify-between bg-secondary-low p-5  rounded-xl border-2 border-secondary-mid"
              >
                <div className="flex items-center gap-5 w-full ">
                  <div>
                    <p className="text-base lg:text-xl text-primary font-semibold">
                      {question?.title}
                    </p>
                    <p className="text-sm lg:text-base text-secondary">
                      {question?.categories
                        ?.map((item) => item.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-16 lg:ml-0">
                  <p className="text-[#4B5563] whitespace-nowrap">
                    {timeAgo(question?.createdAt)}
                  </p>
                  <div className="flex items-center gap-5 mt-2 font-medium text-[#4B5563]">
                    <div className="flex items-center gap-1">
                      <img src="/icons/like.svg" alt="" />
                      <p>{question?.likedUser?.length}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/icons/comments.svg" alt="" />
                      <p>{question?.commentsCount}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setdeleteModalOpen(true);
                      setselectedDeleteQuestion(question?._id);
                    }}
                    className="text-xl w-10 h-10 rounded-full flex items-center justify-center bg-[#ffcbd1]"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ConfirmModal
        open={deleteModalOpen}
        setOpen={setdeleteModalOpen}
        title={"Are you sure to delete this blog?"}
        nextFunc={deleteQuestion}
      ></ConfirmModal>
    </div>
  );
};

export default Page;

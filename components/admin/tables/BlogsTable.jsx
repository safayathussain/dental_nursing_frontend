import Loading from "@/components/pageComponents/common/Loading";
import Pagination from "@/components/Pagination";
import TextInput from "@/components/TextInput";
import { FetchApi } from "@/utils/FetchApi";
import { formatReadableTime } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../ConfirmModal";

const BlogsTable = ({ setCurrentEditBlog, setShowAddBlogForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentBlogs, setCurrentBlogs] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [selectedDeleteBlog, setselectedDeleteBlog] = useState(null);
  const [refetch, setrefetch] = useState(false);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { data } = await FetchApi({
        url: `/blog/all-blogs?limit=${itemsPerPage}&page=${currentPage}&latest=true&search=${search}`,
      });
      setCurrentBlogs(data.data?.data);
      setTotalCount(data?.data?.totalCount);
      setIsLoading(false);
    };
    loadData();
  }, [currentPage, search, refetch]);
  const deleteBlog = async () => {
    const { data } = await FetchApi({
      url: `/blog/delete-blog/${selectedDeleteBlog}`,
      method: "delete",
      isToast: true,
      callback: () => {
        setselectedDeleteBlog(false);
        setrefetch(!refetch);
      },
    });
  };
  return (
    <div className="mt-10">
      <TextInput
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search by title"}
        className={"w-max mb-5"}
      />
      <div className="overflow-x-auto text-sm lg:text-base">
        <table className="min-w-full whitespace-nowrap">
          {!isLoading && (
            <>
              <thead>
                <tr className=" border">
                  <th className=" px-4 py-3 text-left">Title</th>
                  <th className=" px-4 py-3 text-left">Date</th>
                  <th className=" px-4 py-3 text-left">Comments</th>
                  <th className=" px-4 py-3 text-left">Categories</th>
                  <th className=" px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.map((item) => (
                  <tr key={item._id} className="border ">
                    <td
                      className=" px-4 py-3 underline whitespace-normal max-w-[500px] min-w-[300px] hover:text-primary duration-100 cursor-pointer"
                      onClick={() => {
                        setShowAddBlogForm(true);
                        setCurrentEditBlog(item);
                      }}
                    >
                      {item.title}
                    </td>
                    <td className=" px-4 py-3">
                      {formatReadableTime(item.createdAt)}
                    </td>
                    <td className=" px-4 py-3">{item.commentsCount}</td>
                    <td className=" px-4 py-3">
                      {item.categories.map((item) => item?.name).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setdeleteModalOpen(true);
                          setselectedDeleteBlog(item?._id);
                        }}
                        className="w-8 h-8 text-lg rounded-full bg-[#ffcbd1] flex items-center justify-center"
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
      {isLoading && (
        <div className="flex justify-center my-20 w-full">
          <Loading />
        </div>
      )}
      {!isLoading && currentBlogs.length === 0 && (
        <p className="text-xl text-center my-10">0 Blog Found</p>
      )}
      <div className="flex justify-end">
        <Pagination
          className=""
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
        />
      </div>
      <ConfirmModal
        open={deleteModalOpen}
        setOpen={setdeleteModalOpen}
        title={"Are you sure to delete this blog?"}
        nextFunc={deleteBlog}
      ></ConfirmModal>
    </div>
  );
};

export default BlogsTable;

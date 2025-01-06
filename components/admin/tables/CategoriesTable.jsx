import Loading from "@/components/pageComponents/common/Loading";
import Pagination from "@/components/Pagination";
import TextInput from "@/components/TextInput";
import { FetchApi } from "@/utils/FetchApi";
import { formatReadableTime } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../ConfirmModal";

const CategoryTable = ({ setCurrentEditCategory, setShowAddCategoryForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentCategories, setCurrentCategories] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [selectedDeleteCategory, setselectedDeleteCategory] = useState(null);
  const [refetch, setrefetch] = useState(false);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { data } = await FetchApi({
        url: `/category/all-categories?limit=${itemsPerPage}&page=${currentPage}&latest=true&search=${search}`,
      });
      setCurrentCategories(data.data?.data);
      setTotalCount(data?.data?.totalCount);
      setIsLoading(false);
    };
    loadData();
  }, [currentPage, search, refetch]);
  const deleteCategory = async () => {
    const { data } = await FetchApi({
      url: `/category/delete-category/${selectedDeleteCategory}`,
      method: "delete",
      isToast: true,
      callback: () => {
        setselectedDeleteCategory(false);
        setrefetch(!refetch);
      },
    });
  };
  return (
    <div className="mt-10">
      <TextInput
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search by name"}
        className={"w-max mb-5"}
      />
      <div className="overflow-x-auto text-sm lg:text-base">
        <table className="min-w-full whitespace-nowrap">
          {!isLoading && (
            <>
              <thead>
                <tr className=" border">
                  <th className=" px-4 py-3 text-left">Name</th>
                  <th className=" px-4 py-3 text-left">Blogs</th>
                  <th className=" px-4 py-3 text-left">Questions</th>
                  <th className=" px-4 py-3 text-left">Date</th>
                  <th className=" px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories?.map((item) => (
                  <tr key={item._id} className="border ">
                    <td
                      className=" px-4 py-3 underline whitespace-normal max-w-[500px] min-w-[300px] hover:text-primary duration-100 cursor-pointer"
                      onClick={() => {
                        setShowAddCategoryForm(true);
                        setCurrentEditCategory(item);
                      }}
                    >
                      {item.name}
                    </td>
                    <td className=" px-4 py-3">{item?.blogsCount}</td>
                    <td className=" px-4 py-3">{item?.questionsCount}</td>
                    <td className=" px-4 py-3">
                      {formatReadableTime(item?.createdAt)}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setdeleteModalOpen(true);
                          setselectedDeleteCategory(item?._id);
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
      {!isLoading && currentCategories?.length === 0 && (
        <p className="text-xl text-center my-10">0 Category Found</p>
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
        title={"Are you sure to delete this category?"}
        nextFunc={deleteCategory}
      ></ConfirmModal>
    </div>
  );
};

export default CategoryTable;

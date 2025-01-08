import Loading from "@/components/pageComponents/common/Loading";
import Pagination from "@/components/Pagination";
import TextInput from "@/components/TextInput";
import { FetchApi } from "@/utils/FetchApi";
import { formatReadableTime } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmModal from "../ConfirmModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UsersTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentUsers, setCurrentUsers] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [selectedDeleteQuestion, setselectedDeleteQuestion] = useState(null);
  const [refetch, setrefetch] = useState(false);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { data } = await FetchApi({
        url: `/user/all-users?limit=${itemsPerPage}&page=${currentPage}&latest=true&search=${search}`,
      });
      setCurrentUsers(data.data?.data);
      setTotalCount(data?.data?.totalCount);
      setIsLoading(false);
    };
    loadData();
  }, [currentPage, search, refetch]);
  const deleteQuestion = async () => {
    const { data } = await FetchApi({
      url: `/user/delete-user/${selectedDeleteQuestion}`,
      method: "delete",
      isToast: true,
      callback: () => {
        setselectedDeleteQuestion(false);
        setrefetch(!refetch);
      },
    });
  };
  return (
    <div className="mt-10">
      <TextInput
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search by email"}
        className={"w-max mb-5"}
      />
      <div className="overflow-x-auto text-sm lg:text-base">
        <table className="min-w-full whitespace-nowrap">
          {!isLoading && (
            <>
              <thead>
                <tr className=" border">
                  <th className=" px-4 py-3 text-left">Name</th>
                  <th className=" px-4 py-3 text-left">Email</th>
                  <th className=" px-4 py-3 text-left">Role</th>
                  <th className=" px-4 py-3 text-left">Registered</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((item) => (
                  <tr key={item._id} className="border ">
                    <td className=" px-4 py-3">{item?.name}</td>
                    <td className=" px-4 py-3">{item?.email}</td>

                    <td className=" px-4 py-3">{item?.role === 'BU' ? "Basic User" : item?.role === 'AD' && 'Admin'}</td>
                    <td className=" px-4 py-3">
                      {formatReadableTime(item.createdAt)}
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
      {!isLoading && currentUsers.length === 0 && (
        <p className="text-xl text-center my-10">0 Question Found</p>
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
        title={"Are you sure to delete this user?"}
        nextFunc={deleteQuestion}
      ></ConfirmModal>
    </div>
  );
};

export default UsersTable;

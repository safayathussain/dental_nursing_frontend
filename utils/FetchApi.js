// import { store } from "@/redux/store";
import axios from "axios";
import toast from "react-hot-toast";

export const FetchApi = async ({
  method = "get",
  url = "",
  data = {},
  callback = () => {},
  isToast = "",
}) => {
  let instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API, // Set a base URL for all requests
    headers: {
      //   Authorization: `Bearer ${
      //     store.getState().auth?.user?.sanitizedUser?.accessToken || ""
      //   }`,
      "Content-Type": "application/json",
    },
  });

  try {
    let response;
    if (method === "get") {
      response = await instance.get(url, data);
    } else if (method === "post") {
      response = await instance.post(url, data);
    } else if (method === "put") {
      response = await instance.put(url, data);
    } else if (method === "patch") {
      response = await instance.patch(url, data);
    } else if (method === "delete") {
      response = await instance.delete(url);
    } else {
      throw new Error("Invalid HTTP method");
    }
    callback();
    const res = { data: response?.data, status: response?.status };
    if (isToast) {
      toast.success(res.data.message);
    }
    return res;
  } catch (error) {
    console.error("Request failed:", error);
    toast.error(
      `${
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong"
      }`
    );

    return error.response?.data;
    // throw error;
  }
};

"use client";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { setAuth } from "@/redux/slices/AuthSlice";
import { FetchApi } from "@/utils/FetchApi";
import { app } from "@/utils/firebase";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Page = () => {
  const [showForgetPassScreen, setShowForgetPassScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleEmailPassLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, pass } = e.target;
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.value,
        pass.value
      );
      if (user.user?.uid) {
        const { data } = await FetchApi({
          url: `/user/firebaseIdWithToken/${user?.user?.uid}`,
        });
        console.log(data);
        if (data?.data) {
          console.log(data?.data);
          if (data?.data?.role !== "AD") {
            return toast.error("Invalid credintials");
          } else {
            toast.success("Login successful! Welcome back.");
          }

          dispatch(setAuth(data?.data));
          setIsLoading(false);
          router.push("/admin/blogs");
        }
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credential");
      }
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Please check your email for the OTP");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credential");
      }
      console.error(error);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {!showForgetPassScreen ? (
        <form
          onSubmit={handleEmailPassLogin}
          className="p-6 rounded-lg min-w-[350px]   space-y-3 drop-shadow-md bg-white rounded-mb"
        >
          <p className="text-2xl text-center mb-5">Please Login</p>
          <TextInput label={"Email"} name={"email"} type="email" />
          <TextInput label={"Password"} name={"pass"} type="password" />
          <p
            className="underline text-center cursor-pointer"
            onClick={() => setShowForgetPassScreen(true)}
          >
            Forgot Password?
          </p>
          <Button variant="primary-blue" className={"w-full"}>
            Login
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleForgetPassword}
          className="p-6 rounded-lg min-w-[350px]   space-y-3 drop-shadow-md bg-white rounded-mb"
        >
          <p className="text-2xl text-center mb-5">Forget Password</p>
          <TextInput label={"Email"} name={"email"} type="email" />
          <Button variant="primary-blue" className={"w-full"}>
            Send Mail
          </Button>
        </form>
      )}
    </div>
  );
};

export default Page;

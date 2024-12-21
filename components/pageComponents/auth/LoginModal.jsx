"use client";
import Modal from "@/components/Modal";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.svg";
import googleSvg from "@/public/icons/google.svg";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { CgClose } from "react-icons/cg";
import { FetchApi } from "@/utils/FetchApi";
import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/AuthSlice";
import { app, firestore } from "@/utils/firebase";
import toast from "react-hot-toast";
import { Loader } from "rsuite";
import { getUserByEmail } from "@/utils/functions";
const googleProvider = new GoogleAuthProvider();

const LoginModal = ({ setOpen, setShowRegisterModal }) => {
  const dispatch = useDispatch();
  const [loginScreenIndex, setLoginScreenIndex] = useState(0);
  const [typedEmail, setTypedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);

  const handleGoogleSignin = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      const { data } = await FetchApi({
        url: `/user/firebaseId/${user?.user?.uid}`,
      });
      if (data?.data) {
        dispatch(setAuth(data?.data));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailPassLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, pass } = e.target;
    setTypedEmail(email.value);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.value,
        pass.value
      );
      if (user.user?.uid) {
        const { data } = await FetchApi({
          url: `/user/firebaseId/${user?.user?.uid}`,
        });
        if (data?.data) {
          if (!data?.data?.isVerfied) {
            const { data } = await FetchApi({
              url: `/auth/send-otp`,
              method: "post",
              data: {
                email: email.value,
              },
              isToast: true,
            });
            setLoginScreenIndex(1);
            setIsLoading(false);
          } else {
            dispatch(setAuth(data?.data));
            setOpen(false);
            setIsLoading(false);
          }
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
  const handleOtpVerify = async (e, type) => {
    e.preventDefault();
    const { otp } = e.target;
    try {
      const res = await FetchApi({
        url: "/auth/verify-otp",
        data: { otp: otp.value, email: typedEmail },
        method: "post",
        isToast: true,
      });
      if (res.data) {
        if (type === "reset-password") {
          setLoginScreenIndex(4);
        } else {
          dispatch(setAuth(res.data?.data));
          setOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const { password } = e.target;
    setIsLoading(true);
    try {
      const { data } = await FetchApi({
        url: "/auth/set-password",
        method: "post",
        data: {
          email: typedEmail,
          password: password.value,
        },
        isToast: true,
      });
      if (data?.data) {
        dispatch(setAuth(data?.data));
        setOpen(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const { email } = e.target;
    if (email) {
      setTypedEmail(email.value);
    }
    try {
      await FetchApi({
        url: "/auth/send-otp",
        method: "post",
        data: { email: email?.value || typedEmail },
        isToast: true,
        callback: () => {
          setLoginScreenIndex(3);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      setOpen={setOpen}
      className={"max-w-[400px] w-[90vw] rounded-none !p-0 relative"}
    >
      <div className="bg-primary flex flex-col items-center py-5 rounded-t-xl">
        <Image src={logo} alt="" className="h-12" />
        <p className="text-white mt-4 text-lg">Login to Your Account</p>
        <CgClose
          className="absolute top-3 right-3 text-white cursor-pointer"
          onClick={() => setOpen(false)}
          size={24}
        />
      </div>
      {isLoading && (
        <div className="py-20 flex items-center w-full">
          <Loader size="lg" className="mx-auto" />
        </div>
      )}
      {loginScreenIndex === 0 && !isLoading && (
        <div className="p-5 space-y-3">
          <button
            onClick={handleGoogleSignin}
            className="bg-[#346EF1] w-full flex text-white items-center mb-5"
          >
            <div className="bg-white w-max m-0.5 p-2">
              <Image src={googleSvg} alt="" />
            </div>
            <p className="text-center w-full">Sign in with Google</p>
          </button>
          <div className=" relative">
            <hr className="w-full" />
            <span className="absolute -top-2.5 right-1/2 bg-white px-2 text-sm text-lightGray">
              Or
            </span>
          </div>
          <form className="space-y-1" onSubmit={handleEmailPassLogin}>
            <TextInput label={"Email"} name={"email"} />
            <TextInput label={"Password"} name={"pass"} />
            <div className="pt-2">
              <Button className={"w-full"} variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </form>
          <p className="text-center">
            Don’t have an account?{" "}
            <span
              className="text-secondary font-bold cursor-pointer"
              onClick={() => {
                setOpen(false);
                setShowRegisterModal(true);
              }}
            >
              Sign up
            </span>
          </p>
          <div className="flex justify-center -mt-2">
            <button
              onClick={() => {
                setLoginScreenIndex(2);
              }}
              className="underline font-bold text-lightGray "
            >
              Forgot Password
            </button>
          </div>
        </div>
      )}
      {loginScreenIndex === 1 && (
        <form className="p-5" onSubmit={(e) => handleOtpVerify(e, "login")}>
          <TextInput label={"OTP"} name={"otp"} />
          <div className="pt-2 flex flex-col items-center space-y-2">
            <Button className={"w-full"} variant="primary" type="submit">
              Verify Otp
            </Button>
            <button
              onClick={handleSendOtp}
              className="underline text-sm text-lightGray mx-auto"
            >
              Resend Otp
            </button>
          </div>
        </form>
      )}
      {loginScreenIndex === 2 && (
        <form className="p-5" onSubmit={handleSendOtp}>
          <TextInput label={"Email"} name={"email"} />
          <div className="pt-2">
            <Button className={"w-full"} variant="primary" type="submit">
              Send Otp
            </Button>
          </div>
        </form>
      )}
      {loginScreenIndex === 3 && (
        <form
          className="p-5"
          onSubmit={(e) => handleOtpVerify(e, "reset-password")}
        >
          <TextInput label={"OTP"} name={"otp"} />
          <div className="pt-2 flex flex-col items-center space-y-2">
            <Button className={"w-full"} variant="primary" type="submit">
              Verify Otp
            </Button>
            <button
              onClick={handleSendOtp}
              className="underline text-sm text-lightGray mx-auto"
            >
              Resend Otp
            </button>
          </div>
        </form>
      )}
      {loginScreenIndex === 4 && !isLoading && (
        <form className="p-5" onSubmit={handleForgetPassword}>
          <TextInput label={"New password"} name={"password"} />
          <div className="pt-2">
            <Button className={"w-full"} variant="primary" type="submit">
              Set Password
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default LoginModal;

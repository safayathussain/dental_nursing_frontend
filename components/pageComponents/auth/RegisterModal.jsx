import "rsuite/Loader/styles/index.css";
import Modal from "@/components/Modal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.svg";
import googleSvg from "@/public/icons/google.svg";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { CgClose } from "react-icons/cg";
import { app } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FetchApi } from "@/utils/FetchApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/AuthSlice";
import toast from "react-hot-toast";
import { Loader } from "rsuite";

const googleProvider = new GoogleAuthProvider();

const RegisterModal = ({ setOpen, setShowLoginModal }) => {
  const [registerScreenIndex, setRegisterScreenIndex] = useState(0);
  const [typedEmail, setTypedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleOtpVerify = async (e) => {
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
        dispatch(setAuth(res.data.data));
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEmailPassRegister = async (e) => {
    e.preventDefault();
    const { email, pass, name } = e.target;
    setTypedEmail(email.value);
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const user = await createUserWithEmailAndPassword(
        auth,
        email.value,
        pass.value
      );
      if (user?.user?.uid) {
        const data = {
          name: name.value,
          email: email.value,
          role: "BU",
          profilePicture: null,
          firebaseUid: user?.user?.uid,
          provider: user?.providerId,
        };
        await FetchApi({
          url: "/auth/register",
          data,
          method: "post",
          isToast: true,
          callback: () => {
            setRegisterScreenIndex(1);
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("User already exists");
      }
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleGoogleRegister = async () => {
    try {
      const auth = getAuth(app);
      setIsLoading(true);
      const user = await signInWithPopup(auth, googleProvider);
      if (user?.user?.uid) {
        const data = {
          name: user.user.displayName,
          email: user.user?.email,
          role: "BU",
          profilePicture: user?.user?.photoURL,
          firebaseUid: user?.user?.uid,
          provider: user?.providerId,
        };
        const createdUser = await FetchApi({
          url: "/auth/register",
          data,
          method: "post",
        });
        dispatch(setAuth(createdUser?.data?.data));
        setOpen(false);
        setIsLoading(false);
      }
      console.log(user);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal
      setOpen={setOpen}
      className={"max-w-[400px] w-[90vw] rounded-none !p-0  relative"}
    >
      <div className="bg-secondary flex flex-col items-center py-5 !rounded-t-xl">
        <Image src={logo} alt="" className="h-12" />
        <p className="text-white mt-4 text-lg">Sign up to Ask a Question</p>
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
      {registerScreenIndex === 0 && !isLoading && (
        <div className="p-5 space-y-3">
          <button
            onClick={handleGoogleRegister}
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
          <form className="space-y-1" onSubmit={handleEmailPassRegister}>
            <TextInput label={"Name"} name={"name"} />
            <TextInput label={"Email"} name={"email"} type="email"/>
            <TextInput label={"Password"} name={"pass"} type="password"/>
            <div className="pt-2">
              <Button className={"w-full"} variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-secondary font-bold cursor-pointer"
              onClick={() => {
                setOpen(false);
                setShowLoginModal(true);
              }}
            >
              Login
            </span>
          </p>
        </div>
      )}
      {registerScreenIndex === 1 && (
        <form className="p-5" onSubmit={handleOtpVerify}>
          <TextInput label={"OTP"} name={"otp"} />
          <div className="pt-2">
            <Button className={"w-full"} variant="primary" type="submit">
              Verify Otp
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default RegisterModal;

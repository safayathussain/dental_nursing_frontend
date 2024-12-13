import Modal from "@/components/Modal";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.svg";
import googleSvg from "@/public/icons/google.svg";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { CgClose } from "react-icons/cg";
const RegisterModal = ({ setOpen, setShowLoginModal }) => {
  return (
    <Modal setOpen={setOpen} className={"max-w-[400px] w-[90vw] rounded-none !p-0  relative"}>
      <div className="bg-secondary flex flex-col items-center py-5 !rounded-t-xl">
        <Image src={logo} alt="" className="h-12" />
        <p className="text-white mt-4 text-lg">Sign up to Ask a Question</p>
        <CgClose
          className="absolute top-3 right-3 text-white cursor-pointer"
          onClick={() => setOpen(false)}
          size={24}
        />
      </div>
      <div className="p-5 space-y-3">
        <button className="bg-[#346EF1] w-full flex text-white items-center mb-5">
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
        <TextInput label={"Email"} />
        <TextInput label={"Password"} />
        <Button className={"w-full"} variant="primary">
          Continue
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <span className="text-secondary font-bold cursor-pointer" onClick={() => {
            setOpen(false)
            setShowLoginModal(true)
          }}>Login</span>
        </p>
      </div>
    </Modal>
  );
};

export default RegisterModal;

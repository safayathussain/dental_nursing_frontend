import useClickOutside from "@/utils/useClickOutside";
import React, { useRef } from "react";

const Modal = ({ children, className, setOpen }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, () => {
    setOpen(false);
  });
  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black z-10 bg-opacity-20`}
      >
        <div className="flex items-center justify-center h-full">
          <div
            ref={modalRef}
            className={` bg-white rounded-xl p-5 space-y-3 relative ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

"use client";
import React from "react";

const Button = ({
  children,
  variant = "primary",
  className,
  size = "md",
  onClick = () => {},
  disabled,
  ...etc
}) => {
  let variantClassName = "";
  let sizeClassName = "";
  switch (variant) {
    case "primary":
      variantClassName = "bg-secondary text-white ";
      break;
    case "secondary":
      variantClassName = "border border-[#3C55A51A] bg-secondary-low text-primary ";
      break;
    case "primary-outline":
      variantClassName = "border border-white bg-primary hover:bg-white hover:text-primary duration-300 text-white ";
      break;
  }
  switch (size) {
    case "sm":
      sizeClassName = " px-2 py-1 rounded-md";
      break;
    case "md":
      sizeClassName = "px-5 py-1.5 rounded-[8px] font-semibold";
      break;
  }

  return (
    <button
      className={` ${variantClassName} ${sizeClassName} ${className} ${
        disabled && "opacity-60"
      } whitespace-nowrap`}
      onClick={onClick}
      {...etc}
    >
      {children}
    </button>
  );
};

export default Button;

"use client";
import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
const CheckInput = ({
  label,
  id,
  name,
  type = "text",
  className,
  placeholder,
  value = false,
  setValue = () => {},
  ...etc
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex gap-3">
        <Checkbox
          checked={value}
          onChange={(e) => setValue(e.checked)}
          placeholder={placeholder}
          id={id}
          name={name}
          spellCheck="false"
          className={`outline outline-[1px]  outline-gray-200 rounded-md `}
          {...etc}
        />
        <label htmlFor={id} className="block text-[#4B5563] text-sm">
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckInput;

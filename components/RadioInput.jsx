"use client";
import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
const RadioInput = ({
  label,
  id,
  name,
  type = "text",
  className,
  placeholder,
  //   value = false,
  //   setValue = () => {},
  ...etc
}) => {
  const [value, setValue] = useState('test');
  return (
    <div className={`${className}`}>
      <div className="flex gap-2">
        <input
        type="radio"
          onChange={(e) => setValue(e.value)}
          placeholder={placeholder}
          id={id}
          checked={value === 'test'}
          name={name}
          value={'test'}
          spellCheck="false"
          className={`outline outline-[1px] text-primary outline-gray-200 rounded-full `}
          {...etc}
        />
        <label htmlFor={id} className="block text-[#4B5563] text-sm">
          {label}
        </label>
      </div>
    </div>
  );
};

export default RadioInput;

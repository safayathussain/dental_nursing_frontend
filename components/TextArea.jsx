import React from "react";

const TextArea = ({
  label,
  id,
  name,
  type = "text",
  className,
  placeholder,
  rows,
  cols,
  ...etc
}) => {
  return (
    <div>
      <div>
        <label htmlFor={id} className="block text-[#4B5563] text-sm">
          {label}
        </label>
        <div className="mt-0.5">
          <textarea
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            id={id}
            type={type}
            name={name}
            spellCheck="false"
            className={`block w-full bg-white placeholder:text-sm md:placeholder:text-base rounded-md p-2 border-[1.5px] border-gray-200 focus:border-gray-300 focus:outline-none focus:border-[1.5px] focus:ring-0 ${className}`}
            {...etc}
          />
        </div>
      </div>
    </div>
  );
};

export default TextArea;

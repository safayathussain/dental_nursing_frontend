"use client";

import React, { useState } from "react";
import { CheckPicker, TagInput, VStack } from "rsuite";
import "rsuite/TagInput/styles/index.css";

const TagsPicker = ({
  name,
  placeholder,
  value = [],
  setValue = () => {},
  label,
  ...etc
}) => {
  return (
    <div>
      <p className="block text-[#4B5563] text-sm mb-0.5">{label}</p>
      <TagInput
        trigger={["Comma", "Enter"]}
        placeholder={placeholder}
        style={{ width: "100%" }}
        onCreate={(value) => {
          console.log(value)
          setValue(value);
        }}
        onTagRemove={(v) => {
          console.log(value )
          setValue(value.filter(item => item !== v))
        }}
        {...etc}
      />
    </div>
  );
};

export default TagsPicker;

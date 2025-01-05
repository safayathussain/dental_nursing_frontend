"use client";

import React, { useState } from "react";
import { CheckPicker, VStack } from "rsuite";
import "rsuite/CheckPicker/styles/index.css";

const MultipleSelect = ({ name, placeholder, label, data, setValue, ...etc }) => {
  return (
    <div>
      <p className="block text-[#4B5563] text-sm mb-0.5">{label}</p>
      <VStack>
        <CheckPicker
          placeholder={placeholder}
          data={data}
          style={{ width: "100%" }}
          name={name}
          onChange={(e) => setValue(e)}
          {...etc}
        />
      </VStack>
    </div>
  );
};

export default MultipleSelect;

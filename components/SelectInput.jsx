"use client";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import React, { useState } from "react";
import "rsuite/Button/styles/index.css";
import { Dropdown } from "primereact/dropdown";
const SelectInput = ({name, placeholder, value = null, setValue = () => {} }) => {
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div>
      <Dropdown
        value={value}
        onChange={(e) => setValue(e.value)}
        options={cities}
        optionLabel={name}
        placeholder={placeholder}
        className="w-full border shadow-none"
      />
    </div>
  );
};

export default SelectInput;

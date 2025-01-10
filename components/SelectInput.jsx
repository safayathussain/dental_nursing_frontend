"use client";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
const SelectInput = ({
  name,
  placeholder,
  options,
  value = null,
  setValue = () => {},
}) => {
  return (
    <div>
      <Dropdown
        value={value}
        onChange={(e) => setValue(e.value)}
        options={options}
        name={name}
        placeholder={placeholder}
        className="w-full border shadow-none"
        optionLabel="name"
        optionValue="value"
      />
    </div>
  );
};

export default SelectInput;

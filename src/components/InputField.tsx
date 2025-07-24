import React from "react";
import type { InputFieldProps } from "../interfaces/inputField";

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  type,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={`p-2 border rounded ${className}`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default React.memo(InputField);

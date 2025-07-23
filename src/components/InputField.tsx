import React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type: string;
}

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

export default InputField;

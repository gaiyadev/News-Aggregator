import React from "react";
import type { SelectFieldProps } from "../interfaces/selectField";

const SelectField: React.FC<SelectFieldProps> = ({
  value,
  options,
  onChange,
  className = "",
  placeholder = "Select an option",
}) => {
  return (
    <select
      className={`p-2 border rounded ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt, index) => {
        const optionValue = typeof opt === "string" ? opt : opt.value;
        const optionLabel = typeof opt === "string" ? opt : opt.label;

        return (
          <option key={index} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
  );
};

export default React.memo(SelectField);

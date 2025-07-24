import type { option } from "../types/option";

export interface SelectFieldProps {
  value: string;
  options: option[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

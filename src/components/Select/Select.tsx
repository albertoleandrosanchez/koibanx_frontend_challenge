import React from "react";
import styles from "./styles/Select.module.css";
export interface SelectProps {
  onLimitChange: (limit: string) => void;
  limit: number | string;
  option: number[] | string[];
}

const Select: React.FC<SelectProps> = ({ onLimitChange, limit, option }) => {
  return (
    <select
      className={styles.select}
      onChange={(limit) => {
        onLimitChange(limit.target.value);
      }}
      value={limit}
    >
      {option.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;

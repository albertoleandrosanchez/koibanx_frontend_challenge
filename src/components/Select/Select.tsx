import React from "react";
import styles from "./styles/Select.module.css";
import { SelectProps } from "@/models/select";

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

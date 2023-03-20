import React from "react";
import styles from "./styles/THead.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
export interface THeadProps {
  tableHeadersItems: any[];
  onClickSort: (sortField: string, sortDirection: 1 | -1) => void;
  sort: {
    sortField: string;
    sortDirection: 1 | -1;
  };
}

const THead: React.FC<THeadProps> = ({
  tableHeadersItems,
  onClickSort,
  sort,
}) => {
  return (
    <thead>
      <tr>
        {tableHeadersItems.map((item, index) => {
          if (item.isSortable) {
            return (
              <th
                key={index}
                id={item.id}
                className={styles.tableTh}
                onClick={() => {
                  onClickSort(
                    item.id,
                    sort.sortField === item.id
                      ? ((sort.sortDirection * -1) as 1 | -1)
                      : 1
                  );
                }}
              >
                {item.label}
                {sort.sortField === item.id ? (
                  sort.sortDirection === 1 ? (
                    <FaChevronDown className={styles.chevron} color="#000" />
                  ) : (
                    <FaChevronUp className={styles.chevron} color="#000" />
                  )
                ) : (
                  <FaChevronDown className={styles.chevron} color="#9f9f9f" />
                )}
              </th>
            );
          }
          return (
            <th key={index} id={item.id} className={styles.tableTh}>
              {item.label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default THead;

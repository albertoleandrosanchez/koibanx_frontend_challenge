import React from "react";
import styles from "./styles/TBody.module.css";
import { CommmerceItem, CommmerceService } from "@/models/commerce";
export interface TBodyProps {
  items: CommmerceItem[] | any[];
}

const TBody: React.FC<TBodyProps> = ({ items }) => {
  return (
    <tbody>
      {items.map((item, index) => (
        <tr className={styles.tableTr} key={index}>
          <td className={styles.tableTd}>{item.id}</td>
          <td className={styles.tableTd}>{item.commerce}</td>
          <td className={styles.tableTd}>{item.cuit}</td>
          <td className={styles.tableTd}>{item.concept1}</td>
          <td className={styles.tableTd}>{item.concept2}</td>
          <td className={styles.tableTd}>{item.concept3}</td>
          <td className={styles.tableTd}>{item.concept4}</td>
          <td className={styles.tableTd}>{item.actualBalance}</td>
          <td className={styles.tableTd}>
            {item.status ? "Activo" : "Inactivo"}
          </td>
          <td className={styles.tableTd}>{String(item.lastSale)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;

import React, { useState } from "react";
import styles from "./styles/Home.module.css";
import tableHeadersItems from "@/constants/tableHeadersItems";
import { NextPageContext } from "next";
import { getCommerces } from "@/services/commerce";
import { CommmerceService } from "@/models/commerce";
export interface HomeProps {
  commerce: CommmerceService;
}

const Home: React.FC<HomeProps> = ({ commerce }) => {
  const [commerces, setCommerces] = useState(commerce);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({
    sortField: "id",
    sortDirection: "asc",
  });

  return (
    <div className={styles.home}>
      <div className={styles.searchContainer}></div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeadersItems.map((item, index) => (
                <th className={styles.tableTh} key={index}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {commerces.data.map((item, index) => (
              <tr key={index}>
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
        </table>
      </div>
    </div>
  );
};

export const HomeLoader = async (ctx: NextPageContext) => {
  return {
    props: {
      commerce: await getCommerces({
        limit: 10,
        page: 1,
      }),
    },
  };
};

export default Home;

import React, { useEffect, useState } from "react";
import styles from "./styles/Home.module.css";
import tableHeadersItems from "@/constants/tableHeadersItems";
import { NextPageContext } from "next";
import { getCommerces } from "@/services/commerce";
import { CommmerceService } from "@/models/commerce";
import { TBody } from "@/components/TBody";
import { Pagination } from "@/components/Pagination";
import { Select } from "@/components/Select";
import { THead } from "@/components/THead";
export interface HomeProps {
  commerce: CommmerceService;
}

const Home: React.FC<HomeProps> = ({ commerce }) => {
  const [commerces, setCommerces] = useState(commerce);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: false,
    page: 1,
    rowsPerPage: 10,
  } as {
    search: string;
    status: boolean;
    page: number;
    rowsPerPage: any;
  });

  const [sort, setSort] = useState({
    sortField: "cuit",
    sortDirection: -1,
  } as {
    sortField: string;
    sortDirection: 1 | -1;
  });

  useEffect(() => {
    const getCommercesData = async () => {
      setLoading(true);
      const data = await getCommerces({
        limit: filters.rowsPerPage,
        page: filters.page,
        search: filters.search,
        status: filters.status,
        sortField: sort.sortField as "commerce" | "cuit",
        sortDirection: sort.sortDirection,
      });
      setCommerces(data);
      setLoading(false);
    };

    getCommercesData();
  }, [filters, sort]);

  return (
    <div className={styles.home}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar"
          value={filters.search}
          onChange={(e) => {
            setFilters({
              ...filters,
              search: e.target.value,
            });
          }}
          className={styles.searchInput}
        />
        <div className={styles.searchIcon}>
          <label htmlFor="Deshabilitados">Deshabilitados</label>
          <input
            type="checkbox"
            checked={filters.status}
            onChange={(e) => {
              setFilters({
                ...filters,
                status: e.target.checked,
              });
            }}
            className={styles.disableCheckbox}
          />
        </div>
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <p className={styles.loading}> Cargando ...</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <THead
              tableHeadersItems={tableHeadersItems}
              onClickSort={(sortFieldParam, sortDirectionParam) => {
                setSort({
                  sortField: sortFieldParam,
                  sortDirection: sortDirectionParam,
                });
              }}
              sort={sort}
            />
            <TBody items={commerces.data} />
          </table>
        </div>
      )}
      <div className={styles.paginationContainer}>
        <Select
          onLimitChange={(limit) => {
            setFilters({
              ...filters,
              rowsPerPage: Number(limit),
            });
          }}
          limit={filters.rowsPerPage}
          option={[10, 20, 30, 40, 50]}
        />
        <Pagination
          actualPage={filters.page}
          totalPages={commerces.pages}
          onPageChange={(page) => {
            setFilters({
              ...filters,
              page,
            });
          }}
        />
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

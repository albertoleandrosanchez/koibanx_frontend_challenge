import React from "react";
import styles from "./styles/Pagination.module.css";
export interface PaginationProps {
  onPageChange: (page: number) => void;
  actualPage: number;
  totalPages: number;
  neighborNumbers?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  neighborNumbers = 2,
  onPageChange,
  actualPage,
  totalPages,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => {
          onPageChange(actualPage - 1);
        }}
        disabled={actualPage === 1}
      >
        {"<"}
      </button>
      {actualPage - neighborNumbers > 1 && (
        <>
          <button
            className={styles.paginationButton}
            onClick={() => {
              onPageChange(1);
            }}
          >
            {1}
          </button>
          <span className={styles.paginationSpan}>...</span>
        </>
      )}
      {Array.from({ length: neighborNumbers * 2 + 1 }, (_, i) => {
        const pageNumber = actualPage - neighborNumbers + i;
        if (pageNumber > 0 && pageNumber <= totalPages) {
          return (
            <button
              key={i}
              className={styles.paginationButton}
              onClick={() => {
                onPageChange(pageNumber);
              }}
              disabled={actualPage === pageNumber}
            >
              {pageNumber}
            </button>
          );
        }
      })}
      {actualPage + neighborNumbers < totalPages && (
        <>
          <span className={styles.paginationSpan}>...</span>
          <button
            className={styles.paginationButton}
            onClick={() => {
              onPageChange(totalPages);
            }}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={styles.paginationButton}
        onClick={() => {
          onPageChange(actualPage + 1);
        }}
        disabled={actualPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

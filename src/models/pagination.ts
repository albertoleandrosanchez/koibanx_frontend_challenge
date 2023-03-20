export interface PaginationProps {
  onPageChange: (page: number) => void;
  actualPage: number;
  totalPages: number;
  neighborNumbers?: number;
}

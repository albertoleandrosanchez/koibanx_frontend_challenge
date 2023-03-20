export interface THeadProps {
  tableHeadersItems: any[];
  onClickSort: (sortField: string, sortDirection: 1 | -1) => void;
  sort: {
    sortField: string;
    sortDirection: 1 | -1;
  };
}

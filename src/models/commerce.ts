export interface CommmerceItem {
  id: number;
  commerce: string;
  cuit: string;
  concept1: number;
  concept2: number;
  concept3: number;
  concept4: number;
  actualBalance: number;
  status: boolean;
  lastSale: string;
}

export interface CommmerceService {
  data: CommmerceItem[];
  page: number;
  pages: number;
  rowsPerPage: number;
  total: number;
}

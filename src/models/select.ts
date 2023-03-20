export interface SelectProps {
  onLimitChange: (limit: string) => void;
  limit: number | string;
  option: number[] | string[];
}

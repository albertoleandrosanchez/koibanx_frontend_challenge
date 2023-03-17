import tableItems from "@/constants/challenge.json";
import { CommmerceItem, CommmerceService } from "@/models/commerce";

interface getCommercesProps {
  search?: string;
  status?: boolean;
  order?: number;
  page?: number;
  limit?: number;
}

export const getCommerces = async ({
  search = "",
  status = true,
  order,
  page = 1,
  limit = 10,
}: getCommercesProps): Promise<CommmerceService> => {
  let query = "?";
  const filters = ["id", "commerce", "cuit"];
  const filterQuery = filters.map((filter) => {
    return `{"${filter}":"${search}"}`;
  });

  query =
    query + `q=$and:[{"$or":[${filterQuery}]} , {"$status":${Number(status)}}]`;
  console.log(query);
  if (order) {
    if (search) {
      query = query + "&";
    }
    query = query + `h={"$orderby":{"id":${order}}}`;
  }

  const paginatedTableItems = tableItems.slice(
    (page - 1) * limit,
    page * limit
  );

  return {
    data: paginatedTableItems,
    page: 1,
    pages: 1,
    rowsPerPage: 5,
    total: tableItems.length,
  };
};

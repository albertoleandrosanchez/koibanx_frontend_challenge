import tableItems from "@/constants/challenge.json";
import { CommmerceItem, CommmerceService } from "@/models/commerce";

interface getCommercesProps {
  search?: string;
  status?: boolean;
  sortField?: "commerce" | "cuit";
  sortDirection?: 1 | -1;
  page?: number;
  limit?: number;
}

export const getCommerces = async ({
  search,
  status,
  sortField = "commerce",
  sortDirection = 1,
  page = 1,
  limit = 10,
}: getCommercesProps): Promise<CommmerceService> => {
  const filters = ["id", "commerce", "cuit"] as ["id", "commerce", "cuit"];
  let query = "";
  let searchQuery = null;
  let statusQuery = null;
  let sortQuery = null;
  let limitQuery = null;
  let pageQuery = null;
  let filterQuery = null;

  // si hay un search, se arma el query para filtrar por los campos que se quieran
  if (search) {
    searchQuery = filters.map((filter) => {
      return `{"${filter}":"${search}"}`;
    });
    searchQuery = searchQuery.join(",");
    searchQuery = `"$or":[${searchQuery}]`;
  }
  // si hay un status, se arma el query para filtrar por el status
  if (status != undefined) {
    statusQuery = `{"$status":${status}}`;
  }

  if (searchQuery && statusQuery) {
    filterQuery = `q="$and":[${searchQuery}} , ${statusQuery}]`;
  } else if (searchQuery) {
    filterQuery = `q=${searchQuery}`;
  } else if (statusQuery) {
    filterQuery = `q=${statusQuery}`;
  }

  // si hay un sortField, se arma el query para ordenar por ese campo
  if (sortField) {
    // No es necesario comprobar si existe sortDirection porque por defecto si existe el sortField, sortDirection tambien existe.
    const sortDirectionQuery = sortDirection;
    sortQuery = `sort=${sortField}&dir=${sortDirectionQuery}`;
  }
  // si hay un page, se arma el query para paginar
  if (limit) {
    limitQuery = `max=${limit}`;
  }
  // si hay un page, se arma el query para paginar
  if (page) {
    pageQuery = `skip=${(page - 1) * limit}`;
  }

  // junto todos los queries y los uno con un &
  const queries = [filterQuery, sortQuery, limitQuery, pageQuery].join("&");
  // si hay queries, se arma el query con el ?
  if (queries !== "") query = "?" + queries;

  // Termino de armar la url completa con su query
  const url = process.env.NEXT_PUBLIC_API_URL + query;

  //Muestro la url en consola para ver que se esta armando bien

  console.log(url);

  // Simulo una llamada a la api
  await new Promise((resolve) => setTimeout(resolve, 1000));

  /////////         ESTO YA ES PARA MOCKEAR LA API         /////////

  const tableItemsWithStatus = tableItems.filter((item) => {
    if (item.status != status) {
      return true;
    }
    return false;
  });

  // Si hay un search, filtro los items por el search
  const searchedTableItems = tableItemsWithStatus.filter((item) => {
    if (search) {
      return filters.some((filter) => {
        return item[filter].toString().toLocaleLowerCase().includes(search);
      });
    }
    return true;
  });
  const sortedTableItems = searchedTableItems.sort(
    (a: CommmerceItem, b: CommmerceItem) => {
      if (sortDirection === 1) {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    }
  );

  const paginatedTableItems = sortedTableItems.slice(
    (page - 1) * limit,
    page * limit
  );

  return {
    data: paginatedTableItems,
    page: page,
    pages: Math.ceil(tableItems.length / limit),
    rowsPerPage: 5,
    total: tableItems.length,
  };
};

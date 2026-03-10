export type PaginationQuery = {
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: string;
};

export type ImportResult = {
  totalRows: number;
  inserted: number;
  updated: number;
  rejected: number;
};

export interface Pagination {
  limit?: number;
  total?: number;
  links: PaginationLink;
  offset?: number;
}

export interface PaginationLink {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
  self?: string;
}

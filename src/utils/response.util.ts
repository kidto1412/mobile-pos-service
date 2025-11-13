export interface PaginationMeta {
  page: number;
  size: number;
  total: number;
}

export function paginateResponse<T>(
  data: T[],
  page: number,
  size: number,
  total: number,
) {
  return {
    content: data,
    page,
    size,
    total,
    totalPages: Math.ceil(total / size),
    hasNextPage: page * size < total,
    hasPrevPage: page > 1,
  };
}

export function baseResponse<T>(data: T) {
  return data;
}

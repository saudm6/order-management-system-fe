

export interface PageResult<T> {
  data: T;
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}

export class ResponseDto<T> {
  readonly result?: T;
  readonly count?: number;
  readonly currentPage?: number;
  readonly totalPage?: number;

  constructor(
    public readonly message: string,
    public readonly data?: T,
    pagination?: {
      count: number;
      page: number;
      size: number;
    },
  ) {
    if (pagination) {
      this.result = this.data;

      this.data = undefined;

      this.count = pagination.count;

      this.currentPage = (pagination.page - 1) * pagination.size + 1;

      this.totalPage = Math.ceil(pagination.count / pagination.size);
    }
  }
}

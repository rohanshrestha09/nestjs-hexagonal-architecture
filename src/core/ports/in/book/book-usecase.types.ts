export type QueryBookDto = {
  page: number;
  size: number;
  sort: string;
  order: 'ASC' | 'DESC';
};

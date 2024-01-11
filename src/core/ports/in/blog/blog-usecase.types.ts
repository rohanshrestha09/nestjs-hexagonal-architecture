export type QueryBlogDto = {
  page: number;
  size: number;
  sort: string;
  order: 'ASC' | 'DESC';
};

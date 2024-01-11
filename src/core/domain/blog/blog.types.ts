export type CreateBlogProps = {
  title: string;
  content: string;
  userId: string;
};

export type UpdateBlogProps = {
  title?: string;
  content?: string;
};

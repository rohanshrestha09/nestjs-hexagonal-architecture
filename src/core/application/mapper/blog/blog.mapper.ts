import { Blog } from 'src/core/domain/blog/blog.domain';

export class BlogMapper {
  static forAdmin(blog: Blog) {
    return blog;
  }

  static forUser(blog: Blog) {
    return blog;
  }
}

import { COURSE_STATUS } from 'src/common/enums/course.enum';

export type CreateCourseProps = {
  code: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  status: COURSE_STATUS;
};

export type UpdateCourseProps = {
  description?: string;
  offerPrice?: number;
  status?: COURSE_STATUS;
};

export type User = {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  verified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
  instructor: string[];
  uploadedBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  lessons: string[];
  isPublished: boolean;
  category: string;
  tags: string[];
  price: number;
  video: {
    url: string;
    publicId: string;
  };
  isPopular: boolean;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CustomResponse<T> = Promise<{
  data: T;
  status: boolean;
  message: string;
  path: string;
}>;

export type CourseWithInstructors = Omit<Course, "instructor"> & {
  instructor: User[];
};

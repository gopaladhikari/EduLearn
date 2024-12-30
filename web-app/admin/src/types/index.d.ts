export type Course = {
  _id: string;
  title: string;
  description: string;
  instructor: string[];
  uploadedBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  lessons: string[];
  category: string;
  tags: string[];
  price: number;
  video: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type User = {
  _id: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

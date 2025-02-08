export type User = {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  password: string;
  role: string;
  bio: string;
  verified: boolean;
  status: string;
  avatar: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  instructor: string[];
  thumbnail: {
    url: string;
    publicId: string;
  };
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

export type Analytics = {
  _id: string;
  courseSlug: string;
  __v: number;
  activeUsers: number;
  averageProgress: number;
  averageRating: number;
  commonFeedback: string[];
  createdAt: string;
  discountedSales: number;
  dropOffPoint: string;
  mostViewedLesson: string;
  popularityScore: number;
  refunds: number;
  totalClicks: number;
  totalCompletions: number;
  totalEnrollments: number;
  totalRevenue: number;
  totalReviews: number;
  totalWatchTime: number;
  trendScore: number;
  updatedAt: string;
};

export type PlatformAnalytics = {
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  totalRefunds: number;
  averageCourseRating: number;
  mostPopularCourse: string;
};

export type CourseWithInstructors = Omit<Course, "instructor"> & {
  instructor: User[];
};

export type CourseWithAnalytics = Course & {
  analytics: Analytics;
};

export type CartItem = {
  course: Partial<Course>;
  priceAtAddition: number;
  addedAt: Date;
};

export type Cart = {
  _id: string;
  userId: string;
  totalPrice: number;
  totalItems: number;
  items: ReadonlyArray<CartItem>;
};

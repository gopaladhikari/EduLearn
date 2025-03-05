export type User = {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  password: string;
  role: "admin" | "user";
  bio: string;
  verified: boolean;
  status: "active" | "restrcited" | "inactive";
  avatar: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Asset = {
  url: string;
  publicId: string;
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  instructor: string[];
  thumbnail: Asset;
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
  video: Asset;
  isPopular: boolean;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Analytics = {
  _id: string;
  course: string;
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

export type CourseAnalytics = {
  totalEnrollments: number;
  totalClicks: number;
  totalCompletions: number;
  averageProgress: number;
  activeUsers: number;
  totalRevenue: number;
  discountedSales: number;
  refunds: number;
  averageRating: number;
  totalReviews: number;
  commonFeedback: string[];
  mostViewedLesson: string;
  dropOffPoint: string;
  totalWatchTime: number;
  popularityScore: number;
  trendScore: number;
};

export type CourseWithInstructors = Omit<Course, "instructor"> & {
  instructor: User[];
};

export type CourseWithAnalytics = Course & {
  analytics: Analytics;
};

import { Course } from "@/types";

// This is a mock function. In a real application, you would fetch this data from your API
export async function getCourseBySlug(slug: string): Promise<Course> {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock course data
  return {
    _id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React and build your first application.",
    slug: slug,
    instructor: [
      {
        _id: "101",
        name: "John Doe",
        title: "Senior React Developer",
        avatar: "/placeholder.svg",
        bio: "John has been developing with React for over 5 years and loves teaching others.",
      },
    ],
    uploadedBy: {
      _id: "101",
      name: "John Doe",
      title: "Senior React Developer",
      avatar: "/placeholder.svg",
      bio: "John has been developing with React for over 5 years and loves teaching others.",
    },
    lessons: [
      "Introduction to React",
      "Components and Props",
      "State and Lifecycle",
      "Hooks",
    ],
    isPublished: true,
    thumbnail: "/placeholder.svg",
    category: "PROGRAMMING",
    tags: ["react", "javascript", "frontend"],
    price: 49.99,
    isPopular: true,
    isBestSeller: false,
    video: {
      url: "https://example.com/intro-to-react.mp4",
      publicId: "intro-to-react",
    },
    averageRating: 4.5,
    totalReviews: 120,
  };
}

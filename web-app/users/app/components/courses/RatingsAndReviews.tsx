import { useState } from "react";
import { Course } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function RatingsAndReviews({ course }: { course: Course }) {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);

  const toggleReview = (reviewId: string) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      comment: "Great course! Learned a lot.",
      likes: 10,
      dislikes: 1,
    },
    {
      id: "2",
      user: "Jane Smith",
      rating: 4,
      comment: "Very informative, but could use more practical examples.",
      likes: 5,
      dislikes: 0,
    },
    // Add more reviews as needed
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Ratings & Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center space-x-4">
          <div className="text-4xl font-bold">{10}</div>
          <div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(10) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-gray-500">{24} reviews</div>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <span className="w-20 text-sm">{rating} stars</span>
              <Progress
                value={
                  (reviews.filter((r) => r.rating === rating).length /
                    reviews.length) *
                  100
                }
                className="h-2 w-full"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-semibold">{review.user}</div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p
                className={`mb-2 ${expandedReviews.includes(review.id) ? "" : "line-clamp-2"}`}
              >
                {review.comment}
              </p>
              {review.comment.length > 100 && (
                <Button
                  variant="link"
                  onClick={() => toggleReview(review.id)}
                  className="h-auto p-0 font-normal"
                >
                  {expandedReviews.includes(review.id)
                    ? "Show less"
                    : "Show more"}
                </Button>
              )}
              <div className="mt-2 flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {review.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <ThumbsDown className="mr-1 h-4 w-4" />
                  {review.dislikes}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

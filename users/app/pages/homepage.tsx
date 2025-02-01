import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "EduLearn | Master New Skills with Expert-Led Online Courses",
      description:
        "Join EduLearn – Your Gateway to Lifelong Learning! Explore thousands of courses taught by industry experts. Learn at your own pace, earn certificates, and transform your career today.",
    },
    {
      name: "og:title",
      content: "EduLearn: Learn Anything, Anytime, Anywhere",
    },
    {
      name: "og:description",
      content:
        "Discover interactive courses, connect with global instructors, and advance your skills with EduLearn. Start your learning journey now!",
    },
  ];
};

export default function homepage() {
  return <div>Hello</div>;
}

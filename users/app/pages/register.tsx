import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Join EduLearn | Create Your Free Learning Account",
      description:
        "Unlock a world of knowledge! Sign up for EduLearn to explore free and paid courses, connect with teachers, and start learning today.",
    },
    {
      name: "og:title",
      content: "Join EduLearn – Start Learning for Free",
    },
    {
      name: "og:description",
      content:
        "Create your account and gain instant access to expert-led courses in tech, business, design, and more. Your future begins here.",
    },
  ];
};

export default function register() {
  return <div>register</div>;
}

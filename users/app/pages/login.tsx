import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Sign In to EduLearn | Access Your Learning Dashboard",
      description:
        "Welcome back! Securely log in to your EduLearn account to resume your courses, track progress, and connect with instructors.",
    },
    {
      name: "og:title",
      content: "Sign In to EduLearn – Continue Your Learning Journey",
    },
    {
      name: "og:description",
      content:
        "Access personalized courses, certificates, and resources. Your next skill is just a login away!",
    },
  ];
};

export default function login() {
  return <div>login</div>;
}

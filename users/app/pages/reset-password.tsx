import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Set a New Password | Secure Your EduLearn Account",
      description:
        "Create a strong new password for your EduLearn account. Ensure your learning progress and data stay protected.",
    },
    {
      name: "og:title",
      content: "Secure Your EduLearn Account – New Password Setup",
    },
    {
      name: "og:description",
      content:
        "Protect your courses, certificates, and progress. Update your password now for uninterrupted learning.",
    },
  ];
};

export default function ResetPassword() {
  return <div>ResetPassword</div>;
}

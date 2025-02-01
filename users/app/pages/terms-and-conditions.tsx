import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "EduLearn Terms of Service | Platform Guidelines & Policies",
      description:
        "Review EduLearn’s Terms of Service to understand your rights, responsibilities, and how we ensure a safe learning environment for all users.",
    },
    {
      name: "og:title",
      content: "EduLearn Terms of Service – Transparent & Fair",
    },
    {
      name: "og:description",
      content:
        "Learn about our commitment to fairness, security, and user satisfaction. Your trust matters to us.",
    },
  ];
};

export default function Terms() {
  return <div>Terms</div>;
}

import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title: "EduLearn Privacy Policy | Your Data Security Matters",
      description:
        "EduLearn values your privacy. Discover how we protect your data, ensure transparency, and comply with global privacy standards.",
    },
    {
      name: "og:title",
      content: "EduLearn Privacy Policy – Safe & Transparent",
    },
    {
      name: "og:description",
      content:
        "Your data is secure with us. Learn how EduLearn safeguards your information while delivering world-class education.",
    },
  ];
};

export default function Privacy() {
  return <div>Privacy</div>;
}

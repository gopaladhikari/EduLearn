import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Reset Your EduLearn Password | Secure Account Recovery",
      description:
        "Forgot your password? Reset it securely in seconds. Follow the steps to regain access to your EduLearn courses and dashboard.",
    },
    {
      name: "og:title",
      content: "Recover Your EduLearn Account – Quick & Secure",
    },
    {
      name: "og:description",
      content:
        "Get back to learning! Reset your password with ease and continue your educational journey without interruptions.",
    },
  ];
};

export default function ForgotPassword() {
  return <div>ForgotPassword</div>;
}

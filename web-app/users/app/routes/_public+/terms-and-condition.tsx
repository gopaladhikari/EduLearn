import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Terms and Condition",
    },
    {
      name: "description",
      content: "Terms and Condition of the website",
    },
  ];
};

export default function TermsAndCondition() {
  return <div>TermsAndCondition</div>;
}

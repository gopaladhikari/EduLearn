import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy" },
    {
      name: "description",
      content: "Privacy Policy of the website",
    },
  ];
};

export default function PrivacyPolicy() {
  return <div>PrivacyPolicy</div>;
}

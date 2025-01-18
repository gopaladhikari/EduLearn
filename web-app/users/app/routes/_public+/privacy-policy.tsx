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
  return (
    <section className="[&_li]:dark:text-white/80 [&_p]:dark:text-white/80">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mb-4">
        Welcome to the EduLearn Platform. We are committed to protecting your
        personal information and your right to privacy. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information
        when you visit our website and use our services.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        Information We Collect
      </h2>
      <p className="mb-4">
        We collect personal information that you provide to us when you register
        on our platform, subscribe to our newsletter, or contact us. This may
        include:
      </p>
      <ul className="mb-4 list-disc pl-6">
        <li>Name</li>
        <li>Email address</li>
        <li>Profile information</li>
        <li>Course progress and completion data</li>
      </ul>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        How We Use Your Information
      </h2>
      <p className="mb-4">We use the information we collect to:</p>
      <ul className="mb-4 list-disc pl-6">
        <li>Provide, operate, and maintain our platform</li>
        <li>Improve, personalize, and expand our services</li>
        <li>Understand and analyze how you use our platform</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Communicate with you about our services</li>
      </ul>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">Data Security</h2>
      <p className="mb-4">
        We have implemented appropriate technical and organizational security
        measures designed to protect the security of any personal information we
        process. However, please note that no electronic transmission over the
        Internet or information storage technology can be guaranteed to be 100%
        secure.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the Last updated date at the top of this Privacy Policy.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at privacy@elearningplatform.com.
      </p>
    </section>
  );
}

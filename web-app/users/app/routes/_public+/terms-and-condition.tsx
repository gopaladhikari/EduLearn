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
  return (
    <section className="[&_li]:dark:text-white/80 [&_p]:dark:text-white/80">
      <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mb-4">
        Welcome to the E-learning Platform. These Terms and Conditions govern
        your use of our website and services. By accessing or using our
        platform, you agree to be bound by these Terms.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using our E-learning Platform, you agree to comply with
        and be bound by these Terms and Conditions. If you do not agree to these
        Terms, please do not use our platform.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">2. User Accounts</h2>
      <p className="mb-4">
        To access certain features of our platform, you may be required to
        create an account. You are responsible for maintaining the
        confidentiality of your account information and for all activities that
        occur under your account.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        3. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on our platform, including courses, videos, text, graphics,
        and logos, is the property of the E-learning Platform or its content
        providers and is protected by copyright and other intellectual property
        laws.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">4. User Conduct</h2>
      <p className="mb-4">
        You agree to use our platform only for lawful purposes and in a way that
        does not infringe upon the rights of others or inhibit their use and
        enjoyment of the platform.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        5. Payment and Refunds
      </h2>
      <p className="mb-4">
        Some courses on our platform may require payment. All payments are
        processed securely. Refunds are subject to our refund policy, which can
        be found on our website.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        6. Limitation of Liability
      </h2>
      <p className="mb-4">
        The E-learning Platform shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages resulting from
        your use of or inability to use our platform.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">7. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify these Terms and Conditions at any time.
        We will notify users of any significant changes by posting a notice on
        our website.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">8. Governing Law</h2>
      <p className="mb-4">
        These Terms and Conditions are governed by and construed in accordance
        with the laws of [Your Jurisdiction], without regard to its conflict of
        law principles.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms and Conditions, please
        contact us at terms@elearningplatform.com.
      </p>
    </section>
  );
}

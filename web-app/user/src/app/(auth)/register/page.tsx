import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register",
  description: "Register to your account",
};

export default function page() {
  return <RegisterForm />;
}

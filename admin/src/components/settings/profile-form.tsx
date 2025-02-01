import { useAuth } from "@/hooks/useAuth";
import {
  fullNameSchema,
  emailSchema,
  usernameSchema,
  bioSchema,
} from "@/schemas/user.schema";
import { FormCard } from "./FormCard";

export default function ProfileForms() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <FormCard
        label="Full Name"
        description="Enter your full name."
        placeholder={user.fullName || "Enter your full name"}
        schema={fullNameSchema}
        defaultValues={user}
        fieldName="fullName"
      />
      <FormCard
        label="Email"
        description="Enter your email."
        placeholder={user.email || "Enter your email"}
        schema={emailSchema}
        defaultValues={user}
        fieldName="email"
      />
      <FormCard
        label="Username"
        description="Enter your username."
        placeholder={user.username || "Enter your username"}
        schema={usernameSchema}
        defaultValues={user}
        fieldName="username"
      />

      <FormCard
        label="Bio"
        description="Enter your bio."
        placeholder={user.bio || "Enter your bio"}
        schema={bioSchema}
        defaultValues={user}
        fieldName="bio"
        type="textarea"
      />
    </>
  );
}

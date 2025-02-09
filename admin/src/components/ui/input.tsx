import { cn } from "@/lib/utils";
import { Eye, EyeClosed, X } from "lucide-react";
import { useState } from "react";

type Props = React.ComponentProps<"input"> & {
  isClearable?: boolean;
  eye?: boolean;
};

function Input({
  type = "text",
  className,
  isClearable,
  eye,
  ...props
}: Props) {
  if (type !== "password" && eye)
    throw new Error("Text or email cannot be toggle able");

  if (isClearable && eye)
    throw new Error("Password cannot is clearable");

  const [inputType, setInputType] = useState(type);
  const [value, setValue] = useState("");

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const clearInput = () => {
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="border-input focus-within:border-primary relative flex h-9 w-full rounded-md border px-3 py-1 shadow-xs transition-colors">
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        className={cn(
          "placeholder:text-muted-foreground w-full bg-transparent text-base outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        {...props}
      />

      {isClearable && value && (
        <button
          type="button"
          onClick={clearInput}
          aria-label="Clear input"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {eye && type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="cursor-pointer"
          aria-label={
            inputType === "password"
              ? "Show password"
              : "Hide password"
          }
        >
          {inputType === "password" ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeClosed className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}

Input.displayName = "Input";

export { Input };

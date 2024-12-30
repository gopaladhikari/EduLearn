import { me } from "@/lib/queries/users.query";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

export type AuthContextType = {
  user: unknown;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: me,
  });

  if (!isPending) {
    if (isSuccess) sessionStorage.setItem("loggedIn", "true");
    else sessionStorage.setItem("loggedIn", "false");
  }

  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

  return (
    <AuthContext
      value={{
        user: data?.data,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within a AuthProvider");

  return context;
}

export { AuthProvider, useAuth };

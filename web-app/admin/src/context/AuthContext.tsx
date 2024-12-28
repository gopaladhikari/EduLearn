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
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: me,
    staleTime: 0,
  });

  return (
    <AuthContext
      value={{
        user: data,
        isLoggedIn: isSuccess,
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

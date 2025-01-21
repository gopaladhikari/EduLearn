import { SessionStorage } from "@/config/constants";
import { me } from "@/lib/queries/users.query";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isPending: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isPending: false,
  user: null,
  setIsLoggedIn: () => null,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionLoggedIn =
    sessionStorage.getItem(SessionStorage.IS_LOGGED_IN) === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(sessionLoggedIn);

  const { isSuccess, isPending, data } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
  });

  useEffect(() => {
    if (!isPending) {
      if (isSuccess) {
        setIsLoggedIn(true);
        sessionStorage.setItem(SessionStorage.IS_LOGGED_IN, "true");
      } else {
        setIsLoggedIn(false);
        sessionStorage.removeItem(SessionStorage.IS_LOGGED_IN);
      }
    }
  }, [isPending, isSuccess]);

  return (
    <AuthContext
      value={{
        isLoggedIn,
        isPending,
        setIsLoggedIn,
        user: data?.data || null,
      }}
    >
      {children}
    </AuthContext>
  );
}

export { AuthProvider, AuthContext };

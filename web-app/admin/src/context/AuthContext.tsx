import { SessionStorage } from "@/config/constants";
import { me } from "@/lib/queries/users.query";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useState } from "react";

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isPending: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isPending: false,
  user: null,
  setIsLoggedIn: () => null,
  setUser: () => null,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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
        setUser(data?.data);
        sessionStorage.setItem(SessionStorage.IS_LOGGED_IN, "true");
      } else {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem(SessionStorage.IS_LOGGED_IN);
      }
    }
  }, [isPending, isSuccess, data?.data]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      isPending,
      setIsLoggedIn,
      user,
      setUser,
    }),
    [isLoggedIn, isPending, user, setIsLoggedIn, setUser],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export { AuthProvider, AuthContext };

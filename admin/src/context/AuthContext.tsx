import { SessionStorage } from "@/config/constants";
import type { User } from "@/types";
import {
  createContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  setUser: () => null,
});

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn =
    sessionStorage.getItem(SessionStorage.IS_LOGGED_IN) === "true";

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoggedIn,
    }),
    [user, isLoggedIn],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export { AuthProvider, AuthContext };

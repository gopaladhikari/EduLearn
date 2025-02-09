import { SessionStorage } from "@/config/constants";
import { useMe } from "@/lib/queries/users.query";
import type { User } from "@/types";
import {
  createContext,
  useEffect,
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

  const { data, isPending, isSuccess } = useMe();

  useEffect(() => {
    if (isPending) return;

    if (isSuccess) {
      setUser(data.data);
      sessionStorage.setItem(SessionStorage.IS_LOGGED_IN, "true");
    } else {
      sessionStorage.removeItem(SessionStorage.IS_LOGGED_IN);
    }
  }, [data, isSuccess, isPending]);

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

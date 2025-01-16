import type { User } from "@/types";
import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type AuthContextType = {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
} & (
  | {
      isLoggedIn: true;
      isPending: false;
      user: User;
    }
  | {
      isLoggedIn: false;
      isPending: boolean;
      user: null;
    }
);

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextType>(() => {
    if (isLoggedIn && user) {
      return {
        isLoggedIn: true,
        isPending: false,
        user,
        setIsLoggedIn,
        setIsPending,
        setUser,
      };
    }

    return {
      isLoggedIn: false,
      isPending,
      user: null,
      setIsLoggedIn,
      setIsPending,
      setUser,
    };
  }, [isLoggedIn, isPending, user, setIsLoggedIn, setIsPending, setUser]);

  return <AuthContext value={value}>{children}</AuthContext>;
};

export { AuthContext, AuthProvider };

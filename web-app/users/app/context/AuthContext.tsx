import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type AuthContextType = {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  isMounted: boolean;
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
  const [isMounted, setIsMounted] = useState(false);

  const value = useMemo<AuthContextType>(() => {
    if (isLoggedIn && user)
      return {
        isMounted,
        isLoggedIn: true,
        isPending: false,
        user,
        setIsLoggedIn,
        setIsPending,
        setUser,
      };

    return {
      isMounted,
      isLoggedIn: false,
      isPending,
      user: null,
      setIsLoggedIn,
      setIsPending,
      setUser,
    };
  }, [
    isLoggedIn,
    isPending,
    user,
    setIsLoggedIn,
    setIsPending,
    setUser,
    isMounted,
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsPending(true);
        setIsMounted(true);
        const { data } = await axiosInstance.get("/api/users/me");
        setIsLoggedIn(true);
        setUser(data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsPending(false);
      }
    };
    fetchUser();
  }, []);

  return <AuthContext value={value}>{children}</AuthContext>;
};

export { AuthContext, AuthProvider };

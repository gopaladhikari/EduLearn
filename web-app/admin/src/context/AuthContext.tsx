import { SessionStorage } from "@/config/constants";
import { me } from "@/lib/queries/users.query";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  isPending: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isPending: false,
  setIsLoggedIn: () => null,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionLoggedIn =
    sessionStorage.getItem(SessionStorage.IS_LOGGED_IN) === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(sessionLoggedIn);

  const { isSuccess, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: me,
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
      }}
    >
      {children}
    </AuthContext>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}

export { AuthProvider, useAuth };

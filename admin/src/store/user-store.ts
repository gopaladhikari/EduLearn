import type { User } from "@/types";
import { Store, useStore } from "@tanstack/react-store";
import { Cookies } from "react-cookie";

const getCurrentUser = (): User | null => {
  const cookieStore = new Cookies();
  const user = cookieStore.get("user") as User | undefined;
  return user ?? null;
};

const userStore = new Store<User | null>(getCurrentUser());

const useMe = (
  selector?: (state: NoInfer<User | null>) => Partial<User>,
) => {
  const store = useStore(userStore, selector);

  return store;
};

const setUserStore = (user: User) => {
  userStore.setState((prev) => {
    return {
      ...prev,
      ...user,
    };
  });
};

const clearUserStore = () => {
  userStore.setState(() => null);
};

userStore.subscribe((state) => {
  const cookieStore = new Cookies();
  if (state.currentVal) {
    console.log("Setting cookie");
    cookieStore.set("user", state.currentVal, { path: "/" });
  } else {
    cookieStore.remove("user", { path: "/" });
  }
});

export { useMe, setUserStore, clearUserStore };

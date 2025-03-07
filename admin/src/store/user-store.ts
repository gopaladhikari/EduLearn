import type { User } from "@/types";
import { Store, useStore } from "@tanstack/react-store";

const userStore = new Store<User | null>(null);

const useMe = () => {
  const store = useStore(userStore);

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

export { useMe, setUserStore, clearUserStore };

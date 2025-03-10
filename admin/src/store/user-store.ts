import type { User } from "@/types";
import { Store, useStore } from "@tanstack/react-store";
import { Cookies } from "react-cookie";
import cryptojs from "crypto-js";
import { env } from "@/config/env";

const userCookieKey = "aa44f4d3ad0bf4e1";

const getCurrentUser = (): User | null => {
  const cookieStore = new Cookies();

  const user = cookieStore.get(userCookieKey);

  if (!user) return null;

  const bytes = cryptojs.AES.decrypt(user, env.encryptionKey);

  const decryptedUser = bytes.toString(cryptojs.enc.Utf8);

  return JSON.parse(decryptedUser);
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
    const cipherText = cryptojs.AES.encrypt(
      JSON.stringify(state.currentVal).toString(),
      env.encryptionKey,
    ).toString();

    cookieStore.set(userCookieKey, cipherText, { path: "/" });
  } else cookieStore.remove(userCookieKey, { path: "/" });
});

export { useMe, setUserStore, clearUserStore };

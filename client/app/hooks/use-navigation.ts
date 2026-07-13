import { UserRoles } from "~/config/constants";
import {
  adminNav,
  instructorNav,
  publicNav,
  studentNav,
} from "~/config/navigation";

import { useUserStore } from "~/store/userStore";

export function useNavs() {
  const user = useUserStore((s) => s.user);

  if (!user) return publicNav;

  switch (user.role) {
    case UserRoles.ADMIN:
      return adminNav;

    case UserRoles.INSTRUCTOR:
      return instructorNav;

    default:
      return studentNav;
  }
}

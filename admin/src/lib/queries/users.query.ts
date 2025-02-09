import { axiosInstance } from "@/config/axios";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } =
          await axiosInstance.get<User>("/api/users/me");
        return data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });
};

type GetAllUserArgs = {
  status?: User["status"];
  verified?: boolean;
  role?: User["role"];
};

export const useAllUsers = (args?: GetAllUserArgs) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<User[]>(
          "/api/users",
          {
            params: args,
          },
        );
        return data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });
};

type GetUserByIdArgs = {
  id: string;
};

export const useUserById = ({ id }: GetUserByIdArgs) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<User>(
          `/api/users/${id}`,
        );
        return data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });
};

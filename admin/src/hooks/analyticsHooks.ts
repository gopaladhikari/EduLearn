import { getPlatformAnalytics } from "@/lib/queries/analytics.query";
import type { PlatformAnalytics } from "@/types";
import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

type GetPlatformAnalyticsQueryOptions = UseQueryOptions<
  PlatformAnalytics,
  Error
>;

export const useGetPlatformAnalytics = (
  options?: GetPlatformAnalyticsQueryOptions,
) => {
  return useQuery<PlatformAnalytics, Error>({
    queryKey: ["platformAnalytics"],
    queryFn: async () => {
      const { data } = await getPlatformAnalytics();
      return data;
    },
    ...options,
  });
};

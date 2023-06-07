import { useQuery } from "@tanstack/react-query";
import { apiClient } from "clients/ApiClient";
import { queryClient } from "clients/ReactQuery";
import { UserNotFound } from "core/UserNotFound";
import { HTTPError } from "ky";
import { useCallback } from "react";
import { UserProfile } from "types/user";
import * as z from "zod";

const UserProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  image: z.string(),
  createdAt: z.string()
});

export type UserProfilePayload = z.infer<typeof UserProfileSchema>;

type UserProfileQuery = {
  userProfileId: string;
};

const fetchUserProfileKey = (query: UserProfileQuery): ["userProfile", UserProfileQuery] => [
  "userProfile",
  query
];

const fetchUserProfile = async ({ userProfileId }: UserProfileQuery): Promise<UserProfile> => {
  try {
    const response = await apiClient.get(`/api/identity/user/${userProfileId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const userProfilePayload = UserProfileSchema.parse(await response.json());

    return {
      id: userProfilePayload.id,
      name: userProfilePayload.name,
      image: userProfilePayload.image,
      email: userProfilePayload.email,
      createdAt: new Date(userProfilePayload.createdAt)
    };
  } catch (err) {
    if (err instanceof HTTPError) {
      switch (err.response.status) {
        case 404:
          throw new UserNotFound();
      }
    }

    throw err;
  }
};

interface UseUserProfileProps {
  userProfile?: UserProfile;
  loading: boolean;
  refetchUserProfile: () => void;
}

const useUserProfile = (query: UserProfileQuery | false): UseUserProfileProps => {
  const {
    data: userProfile,
    isLoading,
    status,
    error
  } = useQuery(query ? fetchUserProfileKey(query) : [], () => (query ? fetchUserProfile(query) : undefined), {
    enabled: query !== false,
    keepPreviousData: !query
  });

  const refetchUserProfile = useCallback(() => {
    if (!query) return;

    queryClient.prefetchQuery(fetchUserProfileKey(query), () => fetchUserProfile(query));
  }, [query]);

  if (status === "error") throw error;

  return {
    userProfile,
    loading: isLoading,
    refetchUserProfile
  };
};

export default useUserProfile;

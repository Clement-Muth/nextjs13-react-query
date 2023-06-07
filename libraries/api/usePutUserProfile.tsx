import { useMutation } from "@tanstack/react-query";
import { apiClient } from "clients/ApiClient";
import { UserProfile } from "types/user";

type PutUserProfileCommand = {
  newUserProfile: UserProfile;
};

const putUserProfile = async ({ newUserProfile }: PutUserProfileCommand): Promise<{ success: boolean }> => {
  await apiClient.put(`/api/identity/user/${newUserProfile.id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      age: newUserProfile.age ?? null,
      id: newUserProfile.id ?? null,
      name: newUserProfile.name ?? null,
      address: newUserProfile.address ?? null
    })
  });

  return {
    success: true
  };
};

const usePutUserProfile = (): typeof putUserProfile => {
  const { mutateAsync: runPutUserProfile } = useMutation(putUserProfile);

  return runPutUserProfile;
};

export default usePutUserProfile;

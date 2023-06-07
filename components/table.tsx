"use client";

import RefreshButton from "./refresh-button";
import useUserProfile from "libraries/api/useUserProfile";
import { timeAgo } from "libraries/db/utils";
import Image from "next/image";

export default async function Table() {
  const { userProfile: user } = useUserProfile({ userProfileId: "1" });

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          {/* <p className="text-sm text-gray-500">
            Fetched user in {duration}ms
          </p> */}
        </div>
        <RefreshButton />
      </div>
      {user ? (
        <div className="divide-y divide-gray-900/5">
          <div key={user.name} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{timeAgo(user.createdAt)}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

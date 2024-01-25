import prisma from "@/app/lib/db";
import React from "react";
import StatCard from "./stat-card";
import { User2, UserCheck2, UserMinus2 } from "lucide-react";

export const UsersCard = async () => {
  const usersCount = await prisma.user.count({
    where: { role: "user" },
  });

  return (
    <StatCard
      data={usersCount}
      label="Total Number of Users"
      icon={<User2 />}
    />
  );
};

export const VerifiedUsersCard = async () => {
  const verifiedUsersCount = await prisma.user.count({
    where: { AND: [{ NOT: { emailVerified: null } }, { role: "user" }] },
  });

  return (
    <StatCard
      data={verifiedUsersCount}
      label="Number of Verified Users"
      icon={<UserCheck2 />}
    />
  );
};

export const UnverifiedUsersCard = async () => {
  const unverifiedUsersCount = await prisma.user.count({
    where: { AND: [{ emailVerified: null }, { role: "user" }] },
  });

  return (
    <StatCard
      data={unverifiedUsersCount}
      label="Number of Unverified Users"
      icon={<UserMinus2 />}
    />
  );
};

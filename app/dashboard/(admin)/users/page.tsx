import { UserDataTable } from "@/components/table/user/user-data-table";
import prisma from "@/app/lib/db";
import { userColumns } from "@/components/table/user/users-table-columns";

const UsersPage = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Users table</h2>
      <UserDataTable columns={userColumns} data={users} />
    </div>
  );
};

export default UsersPage;

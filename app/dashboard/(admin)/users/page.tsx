import { UserDataTable } from "@/components/table/user/user-data-table";
import { userColumns } from "@/components/table/user/columns";
import prisma from "@/app/lib/db";

const UsersPage = async () => {
  const users = await prisma.user.findMany({
    where: { role: "user" },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <UserDataTable columns={userColumns} data={users} />
    </div>
  );
};

export default UsersPage;

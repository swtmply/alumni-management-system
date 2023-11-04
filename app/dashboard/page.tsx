import SignOutButton from "@/components/sign-out-button";
import { auth } from "@/server/auth";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOutButton />
    </div>
  );
};

export default Dashboard;

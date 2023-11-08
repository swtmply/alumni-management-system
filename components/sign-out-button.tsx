"use client";

import { logout } from "@/app/lib/auth/actions";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <Button
      variant={"ghost"}
      className="hover:bg-red-600/40 gap-2 hover:text-white justify-start text-base p-2 rounded-md duration-150 w-full"
      onClick={async () => await logout()}
    >
      <LogOut />
      Logout
    </Button>
  );
};

export default SignOutButton;

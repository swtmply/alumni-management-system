"use client";

import { logout } from "@/server/auth/actions";
import { Button } from "./ui/button";

const SignOutButton = () => {
  return <Button onClick={async () => await logout()}>Signout</Button>;
};

export default SignOutButton;

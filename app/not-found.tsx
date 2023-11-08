"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col gap-2">
      <h4 className="text-4xl font-bold text-red-500">Page Not Found.</h4>
      <p>It seems that the page you are trying to get into is not here.</p>
      <Button onClick={() => router.back()}>Click here to go back</Button>
    </div>
  );
};

export default NotFound;

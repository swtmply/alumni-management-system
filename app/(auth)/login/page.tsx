import LoginForm from "@/components/login-form";
import { EggIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36 flex gap-2 ">
            <EggIcon />
            <p>Login</p>
          </div>
        </div>
        <LoginForm />
        <div>
          <p>
            Don&apos;t have an account yet?
            <Link href="/register" className="ml-2 text-blue-500">
              Register here.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

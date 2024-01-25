import LoginForm from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative flex w-full flex-row justify-center items-center gap-8 p-4">
        <div className="max-w-[400px]">
          <Image
            src={"/tmlcr-logo.jpg"}
            alt="TMLCR Logo"
            width={800}
            height={1200}
          />
        </div>
        <div className="space-y-2.5 max-w-[400px]">
          <LoginForm />
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

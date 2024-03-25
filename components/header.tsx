"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Header = ({ courses }: { courses: string[] }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm({
    defaultValues: {
      search: searchParams.get("search") || "",
      course: searchParams.get("course") || "",
    },
  });

  return (
    <div className="flex items-center gap-2 justify-end mb-8">
      {pathname === "/dashboard/user" && (
        <div className="flex items-center gap-2 flex-grow">
          <div className="w-full flex gap-2 max-w-3xl">
            <div className="relative w-full">
              <Label className="absolute -top-5 left-0">Search</Label>
              <Input placeholder="Enter Keyword" {...form.register("search")} />
            </div>

            <div className="relative w-full">
              <Label className="absolute -top-5 left-0">Course</Label>
              <Select
                onValueChange={(e) => {
                  form.setValue("course", e);
                }}
                defaultValue={form.getValues("course")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => {
                const searchValue = form.getValues("search");
                const courseValue = form.getValues("course");

                const params = new URLSearchParams();
                params.set("search", searchValue);
                params.set("course", courseValue);

                const queryString = params.toString();

                router.push(`${pathname}?${queryString}`);
              }}
              className="flex gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>
      )}

      <ul className="flex mr-4 text-slate-600">
        <Link
          href="/dashboard/about-us"
          className="rounded-full hover:underline p-2"
        >
          About us
        </Link>
        <Link
          href="/dashboard/contact"
          className="rounded-full hover:underline p-2"
        >
          Contact
        </Link>
      </ul>
      <div className="flex flex-col items-end">
        <p className="font-bold text-red-500 leading-3">
          {session?.data?.user?.name}
        </p>
        <p className="capitalize text-sm">{session?.data?.user?.role}</p>
      </div>

      <div className="rounded-full bg-slate-400 aspect-square h-12 relative">
        <Image
          src={session.data?.user?.image || "/images/placeholder.jpg"}
          className="rounded-full"
          alt="Avatar"
          fill
        />
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-2 w-full justify-end mb-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-24 h-2" />
      </div>
      <Skeleton className="w-12 h-12 rounded-full" />
    </div>
  );
};

export default Header;

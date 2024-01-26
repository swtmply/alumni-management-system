import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-end mb-8">
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

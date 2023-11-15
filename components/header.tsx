import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const Header = ({
  session,
}: {
  session:
    | {
        name: string | null | undefined;
        role: string | null | undefined;
        image: string | null | undefined;
      }
    | undefined;
}) => {
  return (
    <div className="flex items-center gap-2 justify-end mb-8">
      <div className="flex flex-col items-end">
        <p className="font-bold text-red-500 leading-3">{session?.name}</p>
        <p className="capitalize text-sm">{session?.role}</p>
      </div>

      <div className="rounded-full bg-slate-400 aspect-square h-12 relative">
        <Image
          src={session?.image || "https://github.com/swtmply.png"}
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

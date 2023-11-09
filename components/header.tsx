import Image from "next/image";

const Header = ({
  session,
}: {
  session:
    | {
        name: string | null | undefined;
        role: string | null | undefined;
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
          src={"https://github.com/swtmply.png"}
          className="rounded-full"
          alt="Avatar"
          fill
        />
      </div>
    </div>
  );
};

export default Header;

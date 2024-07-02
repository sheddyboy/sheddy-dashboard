import Link from "next/link";

interface NavButtonProps {
  children: React.ReactNode;
  active: boolean;
  href: string;
}

export default function NavButton({ children, active, href }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`flex w-full cursor-pointer items-center gap-[16px] rounded-[8px] ${active ? "bg-white font-bold text-purple-100" : "text-white bg-purple-100"} p-[12px]`}
    >
      {children}
    </Link>
  );
}

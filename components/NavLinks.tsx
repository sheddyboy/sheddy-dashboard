"use client";
import {
  CandlestickChart,
  LayoutGrid,
  MessageCircleMore,
  PieChart,
  Settings,
  SquareCheck,
  UsersRound,
} from "lucide-react";
import NavButton from "@/components/NavButton";
import { usePathname } from "next/navigation";
interface NavLinksProps {}

export default function NavLinks({}: NavLinksProps) {
  const path = usePathname();
  return (
    <div className="mx-[16px] flex flex-col gap-[16px]">
      <NavButton active={path === "/dashboard"} href="/dashboard">
        <LayoutGrid className="h-[20px] w-[20px]" />
        Dashboard
      </NavButton>
      <NavButton active={path === "/projects"} href="/projects">
        <CandlestickChart className="h-[20px] w-[20px]" />
        Projects
      </NavButton>
      <NavButton active={path === "/tasks"} href="/tasks">
        <SquareCheck className="h-[20px] w-[20px]" />
        My Task
      </NavButton>
      <NavButton active={path === "/activities"} href="/activities">
        <PieChart className="h-[20px] w-[20px]" />
        Activities
      </NavButton>
      <NavButton active={path === "/team"} href="/team">
        <UsersRound className="h-[20px] w-[20px]" />
        Team
      </NavButton>
      <NavButton active={path === "/messages"} href="/messages">
        <MessageCircleMore className="h-[20px] w-[20px]" />
        Messages
      </NavButton>
      <NavButton active={path === "/settings"} href="/settings">
        <Settings className="h-[20px] w-[20px]" />
        Settings
      </NavButton>
    </div>
  );
}

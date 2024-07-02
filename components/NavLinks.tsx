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
      <NavButton active={path === "/project"} href="/project">
        <CandlestickChart className="h-[20px] w-[20px]" />
        Project
      </NavButton>
      <NavButton active={path === "/tasks"} href="/tasks">
        <SquareCheck className="h-[20px] w-[20px]" />
        My Task
      </NavButton>
      <NavButton active={path === "/activity"} href="/activity">
        <PieChart className="h-[20px] w-[20px]" />
        Activity
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

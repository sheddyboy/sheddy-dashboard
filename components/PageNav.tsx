"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
interface PageNavProps {}

type Route = {
  [key: string]: string;
};

export default function PageNav({}: PageNavProps) {
  const path = usePathname();
  const routs: Route = {
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/tasks": "My Tasks",
    "/activities": "Activities",
    "/team": "Team",
    "/messages": "Messages",
    "/settings": "Settings",
  };

  return (
    <div className="flex items-center justify-between px-[30px] py-[12px]">
      <span className="text-[20px] font-semibold leading-[120%] tracking-[0.02em]">
        {routs[`/${path.split("/")[1]}`]}
      </span>
      <div className="flex items-center justify-between gap-[38px]">
        <div className="relative flex items-center">
          <Search className="absolute left-[12px] h-[20px] w-[20px] text-[#7D7A89]" />
          <Input
            placeholder="Search anything..."
            className="h-[41px] w-[213px] pl-[40px]"
          />
        </div>
        <div className="flex items-center gap-[24px]">
          <Bell className="h-[24px] w-[24px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="icon" size="icon">
                <div className="flex items-center gap-[16px]">
                  <Avatar className="h-[40px] w-[40px]">
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  Jackson Pierce
                  <ChevronDown className="h-[20px] w-[20px]" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

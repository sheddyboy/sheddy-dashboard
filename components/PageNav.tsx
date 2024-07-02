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
    "/project": "Project",
    "/tasks": "My Tasks",
    "/activity": "Activity",
    "/team": "Team",
    "/messages": "Messages",
    "/settings": "Settings",
  };

  return (
    <div className=" justify-between items-center px-[30px] flex py-[12px]">
      <span className="font-semibold text-[20px]">{routs[path]}</span>
      <div className="flex justify-between items-center gap-[38px]">
        <div className="relative flex items-center">
          <Search className="absolute text-[#7D7A89] left-[12px] w-[20px] h-[20px]" />
          <Input
            placeholder="Search anything..."
            className="w-[213px] pl-[40px] h-[41px]"
          />
        </div>
        <div className="flex items-center gap-[24px]">
          <Bell className="w-[24px] h-[24px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="icon" size="icon">
                <div className="flex gap-[16px] items-center">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  Jackson Pierce
                  <ChevronDown className="w-[20px] h-[20px]" />
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

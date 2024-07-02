import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkspaceDropdown from "@/components/WorkspaceDropdown";
import NavLinks from "@/components/NavLinks";

interface NavProps {}

export default function Nav({}: NavProps) {
  return (
    <nav className="text-white flex h-full w-[256px] flex-col justify-between gap-[32px] overflow-auto bg-purple-100">
      <div className="flex flex-col gap-[16px]">
        <div className="font-poppins flex items-center px-[24px] py-[15px] font-semibold">
          SheddyDash
        </div>
        <NavLinks />
      </div>
      <div className="mb-[30px] ml-[16px] mr-[24px] flex flex-col gap-[18px]">
        <div className="flex justify-between">
          <span>Workspace</span>
          <Button variant="icon" size="icon">
            <Plus className="h-[20px] w-[20px]" />
          </Button>
        </div>
        <WorkspaceDropdown />
      </div>
    </nav>
  );
}

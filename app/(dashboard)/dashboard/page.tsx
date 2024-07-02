import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <div className="flex flex-1 flex-col gap-[30px] px-[30px] pt-[42px]">
      <div className="grid grid-cols-4 gap-[30px]">
        <Card>
          <CardContent className="flex items-center gap-[20px] p-[16px]">
            <Image alt="" src="/assigned-task.svg" width={42} height={42} />
            <div className="flex flex-col">
              <span className="">Assigned Task</span>
              <span className="text-[26px] font-semibold">05</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-[20px] p-[16px]">
            <Image alt="" src="/task-completed.svg" width={42} height={42} />
            <div className="flex flex-col">
              <span className="">Task Complete</span>
              <span className="text-[26px] font-semibold">15</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-[20px] p-[16px]">
            <Image
              alt=""
              src="/objective-completed.svg"
              width={42}
              height={42}
            />
            <div className="flex flex-col">
              <span className="">Objective Complete</span>
              <span className="text-[26px] font-semibold">37</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-[20px] p-[16px]">
            <Image alt="" src="/project-completed.svg" width={42} height={42} />
            <div className="flex flex-col">
              <span className="">Project Complete</span>
              <span className="text-[26px] font-semibold">61%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid flex-1 grid-cols-[1.4fr,1fr] gap-[30px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <span>Today Task (3)</span>
            <span>See All</span>
          </div>
          <Card>
            <CardContent className="flex flex-col gap-[16px] p-[16px]"></CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span>Activity</span>
              <span>See All</span>
            </div>
            <Card>
              <CardContent className="flex flex-col gap-[16px] p-[16px]"></CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span>Ongoing Project</span>
              <span>See All</span>
            </div>
            <Card>
              <CardContent className="flex flex-col gap-[16px] p-[16px]"></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

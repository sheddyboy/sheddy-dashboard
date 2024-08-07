"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getProjectDetails } from "@/actions";

interface ProjectNavProps {
  slug: string;
}

export default function ProjectNav({ slug }: ProjectNavProps) {
  const { data: projectsData } = useSuspenseQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectDetails(+slug),
  });
  return (
    <Card>
      <CardContent className="rounded-[8px] p-[16px]">
        <div className="-mx-4 flex items-center justify-between border-b border-b-[#F1F2F4] px-4 pb-[20px]">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4">
              <Image
                alt="logo"
                src={projectsData?.image ?? ""}
                width={58}
                height={58}
                className="h-[58px] w-[58px] rounded-[10px] object-cover object-center"
              />
              <div className="flex flex-col gap-[6px]">
                <span>Project / Details</span>
                <span>Sunstone App</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center -space-x-4">
                {projectsData?.profileProjects
                  .slice(0, 3)
                  .map(({ profileId, profile: { profilePicture, name } }) => (
                    <Avatar
                      key={profileId}
                      className="h-[32px] w-[32px] border-[2px] border-white"
                    >
                      <AvatarImage src={profilePicture ?? ""} />
                      <AvatarFallback>
                        {name?.toUpperCase().slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
              </div>
              <Button className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#110D59] p-0">
                <Image
                  alt="project-add"
                  src="/project-add.svg"
                  width={14}
                  height={14}
                />
              </Button>
            </div>
          </div>
          <Button className="h-auto rounded-[8px] bg-[#110D59] px-[10px] py-[12px]">
            + Add Board
          </Button>
        </div>
        <div className="flex items-center gap-[24px]">
          <Link href={`/projects/${slug}/kanban`}>
            <Button variant="link" className="p-0">
              Kanban
            </Button>
          </Link>
          <Link href={`/projects/${slug}/list`}>
            <Button variant="link" className="p-0">
              List
            </Button>
          </Link>
          <Link href={`/projects/${slug}/calender`}>
            <Button variant="link" className="p-0">
              Calender
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

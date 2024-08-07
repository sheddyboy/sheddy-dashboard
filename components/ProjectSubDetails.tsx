"use client";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, CheckCircle2, Paperclip } from "lucide-react";
import { getProjects } from "@/actions";
import { useQuery } from "@tanstack/react-query";

interface ProjectSubDetailsProps {
  id: number;
}

export default function ProjectSubDetails({ id }: ProjectSubDetailsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const projectsData = data?.find(({ id: projectId }) => id === projectId);
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-md font-semibold capitalize">
            {projectsData?.name}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-5 w-5" />
              <span className="text-xsm font-semibold">26.10.201</span>
            </div>
            {/* <div className="flex items-center gap-1">
              <Paperclip className="h-5 w-5" />
              <span className="text-xsm font-semibold">3</span>
            </div> */}
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-xsm font-semibold">
                {projectsData?.tasks.length}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center -space-x-4">
          {projectsData?.profileProjects
            .slice(0, 3)
            .map(({ profileId, profile: { profilePicture, name } }) => (
              <Avatar key={profileId}>
                <AvatarImage src={profilePicture ?? ""} />
                <AvatarFallback>
                  {name?.toUpperCase().slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            ))}
        </div>
      </div>
      <Progress value={50} className="h-1" />
    </div>
  );
}

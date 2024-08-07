"use client";
import { getProjects } from "@/actions";
import ProjectSubDetails from "@/components/ProjectSubDetails";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {}

export default function Project({}: ProjectProps) {
  const { data: projectsData } = useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  return (
    <div className="grid grid-cols-3 gap-[30px] overflow-auto px-[30px] pt-6">
      {projectsData?.map(({ id, image, name }) => (
        <Link key={id} href={`/projects/${id}/list`}>
          <Card>
            <CardContent className="flex flex-col gap-4 p-4">
              <Image
                alt=""
                src={image ?? ""}
                width={322}
                height={162}
                className="aspect-[2] w-full rounded-[10px]"
              />
              <ProjectSubDetails id={id} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

import { getProjectDetails, getTaskByProjectAndStatus } from "@/actions";
import ProjectNav from "@/components/ProjectNav";
import { getQueryClient } from "@/lib/utils";
import { wait } from "@/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
interface ProjectSlugLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default async function ProjectSlugLayout({
  children,
  params: { slug },
}: ProjectSlugLayoutProps) {
  const queryClient = getQueryClient();
  try {
    const { statuses } = await queryClient.fetchQuery({
      queryKey: ["project", slug],
      queryFn: () => getProjectDetails(+slug),
    });
    statuses.forEach(({ id: statusId, projectId }) => {
      queryClient.prefetchQuery({
        queryKey: ["task", projectId, statusId],
        queryFn: () => getTaskByProjectAndStatus(projectId, statusId),
      });
    });
  } catch (error) {
    notFound();
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col overflow-hidden px-[30px]">
        <ProjectNav slug={slug} />
        {children}
      </div>
    </HydrationBoundary>
  );
}

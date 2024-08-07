import { getProjects } from "@/actions";
import { getQueryClient } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default async function ProjectLayout({ children }: ProjectLayoutProps) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

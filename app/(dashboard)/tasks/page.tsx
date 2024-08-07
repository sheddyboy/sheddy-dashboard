import { ArrowUpDown, CheckCircle2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TasksTable from "@/components/TasksTable";
import { getQueryClient } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTask, getTasks } from "@/actions";

interface TasksProps {
  searchParams: {
    task: string | undefined;
  };
}

export default function Tasks({
  searchParams: { task: taskSlug },
}: TasksProps) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col overflow-auto py-6">
        <div className="flex flex-1 flex-col gap-5 overflow-auto px-[30px]">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Assigned</span>
            <div className="flex items-center gap-[30px]">
              <Link href="/tasks?task=new">
                <Button
                  variant="icon"
                  size="icon"
                  className="flex items-center gap-2"
                >
                  <ClipboardList className="h-5 w-5" />
                  <span className="text-xsm font-semibold">New Task</span>
                </Button>
              </Link>
              <Button
                variant="icon"
                size="icon"
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xsm font-semibold">All Task</span>
              </Button>
              <Button
                variant="icon"
                size="icon"
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-5 w-5" />
                <span className="text-xsm font-semibold">Sort</span>
              </Button>
            </div>
          </div>
          <TasksTable taskSlug={taskSlug} />
        </div>
      </div>
    </HydrationBoundary>
  );
}

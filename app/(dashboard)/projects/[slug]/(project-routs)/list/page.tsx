"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { Suspense } from "react";
import { TableSkeleton } from "@/components/TasksTable";
import NewTask from "@/components/NewTask";
import {
  getProjectDetails,
  getTask,
  getTaskByProjectAndStatus,
} from "@/actions";
import NewTaskSkeleton from "@/components/NewTaskSkeleton";
import { getQueryClient } from "@/lib/utils";
import Link from "next/link";

interface ListViewProps {
  params: {
    slug: string;
  };
  searchParams: {
    task: string | undefined;
  };
}

export default function ListView({
  params: { slug: projectId },
  searchParams: { task: taskSlug },
}: ListViewProps) {
  const queryClient = getQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectDetails(+projectId),
  });

  return (
    <main className={`flex flex-1 gap-[24px] overflow-auto pt-[30px]`}>
      <div
        className={`flex flex-col ${taskSlug ? "w-[70%]" : "w-[100%]"} gap-[30px]`}
      >
        {data?.statuses.map(({ id: statusId, name }) => (
          <div key={statusId} className="flex flex-col gap-[20px]">
            <h2>{name}</h2>
            <Card>
              <CardContent className="rounded-[8px] p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="p-[20px]">Task</TableHead>
                      <TableHead className="p-[20px]">DueDate</TableHead>
                      <TableHead className="p-[20px]">Priority</TableHead>
                      <TableHead className="p-[20px]">Objective</TableHead>
                      <TableHead className="p-[20px]">Assignee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <Suspense fallback={<TableSkeleton length={1} />}>
                      <TableItem statusId={statusId} projectId={+projectId} />
                    </Suspense>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {taskSlug && <NewTask taskSlug={taskSlug} />}
    </main>
  );
}

interface TableItemProps {
  projectId: number;
  statusId: number;
}

function TableItem({ projectId, statusId }: TableItemProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["task", projectId, statusId],
    queryFn: () => getTaskByProjectAndStatus(projectId, statusId),
  });
  return (
    <>
      {data.map(({ id, name, slug }) => (
        <TableRow key={id}>
          <TableCell className="p-[20px]">
            <Link href={`/projects/${projectId}/list?task=${slug}`}>
              {name}
            </Link>
          </TableCell>
          <TableCell className="p-[20px]">Paid</TableCell>
          <TableCell className="p-[20px]">Credit Card</TableCell>
          <TableCell className="p-[20px]">$250.00</TableCell>
          <TableCell className="p-[20px]">$250.00</TableCell>
        </TableRow>
      ))}
    </>
  );
}

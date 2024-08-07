"use client";
import NewTask from "@/components/NewTask";
import TaskCheckbox from "@/components/TaskCheckbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { getTasks } from "@/actions";
import NewTaskSkeleton from "@/components/NewTaskSkeleton";

interface TasksTableProps {
  taskSlug: string | undefined;
}

export default function TasksTable({ taskSlug }: TasksTableProps) {
  return (
    <div className="flex flex-1 gap-6 overflow-auto">
      <div className={`flex ${taskSlug ? "w-[70%]" : "w-[100%]"} flex-col`}>
        <Card className="flex max-h-full flex-col overflow-auto">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow>
                  <TableHead className="">Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="">Objective</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Project</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <Suspense fallback={<TableSkeleton length={10} />}>
                  <TableCells />
                </Suspense>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {taskSlug && <NewTask taskSlug={taskSlug} />}
    </div>
  );
}

interface TableCellsProps {}

export function TableCells({}: TableCellsProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  return (
    <>
      {data.map((task) => (
        <TableRow key={task.id}>
          <TableCell className="font-semibold">
            <div className="flex items-center gap-4">
              <TaskCheckbox isActive={task.isCompleted} />
              <Link
                className="cursor-pointer hover:underline"
                href={`/tasks?task=${task.slug}`}
              >
                {task.name}
              </Link>
            </div>
          </TableCell>
          <TableCell>{task.dueDate?.toDateString()}</TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33337 12.9993C3.33337 12.9993 4.16671 12.166 6.66671 12.166C9.16671 12.166 10.8334 13.8327 13.3334 13.8327C15.8334 13.8327 16.6667 12.9993 16.6667 12.9993V4.20646C16.6667 3.761 16.0209 3.40491 15.5954 3.53668C15.0749 3.69786 14.3389 3.83268 13.3334 3.83268C10.8334 3.83268 9.16671 2.16602 6.66671 2.16602C4.16671 2.16602 3.33337 2.99935 3.33337 2.99935V12.9993Z"
                  fill="#F14D4D"
                />
                <path
                  d="M3.33337 18.8338V3.73438"
                  stroke="#F14D4D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Hard</span>
            </div>
          </TableCell>
          <TableCell className="">
            <div className="flex items-center gap-1">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5471 14.3269H11.2965"
                  stroke="#7D7A89"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.9504 6.25072H16.201"
                  stroke="#7D7A89"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.27195 6.20521C7.27195 5.1255 6.39015 4.25 5.30266 4.25C4.21517 4.25 3.33337 5.1255 3.33337 6.20521C3.33337 7.28492 4.21517 8.16042 5.30266 8.16042C6.39015 8.16042 7.27195 7.28492 7.27195 6.20521Z"
                  stroke="#7D7A89"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.29648 14.2951C7.29648 13.2153 6.41536 12.3398 5.32788 12.3398C4.23971 12.3398 3.35791 13.2153 3.35791 14.2951C3.35791 15.3748 4.23971 16.2503 5.32788 16.2503C6.41536 16.2503 7.29648 15.3748 7.29648 14.2951Z"
                  stroke="#7D7A89"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>3 Objective</span>
            </div>
          </TableCell>
          <TableCell className="">Ongoing</TableCell>
          <TableCell className="">Bookum App</TableCell>
        </TableRow>
      ))}
    </>
  );
}

interface TableSkeletonProps {
  length: number;
}

export function TableSkeleton({ length }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-semibold">
            <div className="flex items-center gap-4">
              <Skeleton className="min-h-8 min-w-8 rounded-full" />
              <Skeleton className="h-3 w-[80%]" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-[80%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-[80%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-[80%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-[80%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-[80%]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

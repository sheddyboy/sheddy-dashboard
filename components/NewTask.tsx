"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  BatteryMedium,
  CalendarDays,
  Ellipsis,
  Plus,
  TargetIcon,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { TaskObjective } from "./TaskObjective";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  getPriorities,
  getProjects,
  getStatuses,
  getUsers,
  getTask,
} from "@/actions";
import Link from "next/link";
import useCreateSearchParams from "@/hooks/useCreateSearchParams";
import NewTaskSkeleton from "@/components/NewTaskSkeleton";

interface NewTaskProps {
  taskSlug: string;
}

export type TaskType = {
  taskName: string;
  assignee: { name: string; image?: string };
  dueDate: string;
  project: { name: string; id: number } | null;
  priority: string;
  status: string;
  description: string;
  attachments: string[];
  objectives: { name: string; value: boolean; id: number }[];
  comments: {
    id: number;
    comment: string;
    user: {
      name: string | null;
      profilePicture: string | null;
    };
  }[];
};

export default function NewTask({ taskSlug }: NewTaskProps) {
  const { removeSearchQuery } = useCreateSearchParams();
  const { data: taskData, isLoading: taskDataLoading } = useQuery({
    queryKey: ["tasks", taskSlug],
    queryFn: () => getTask(taskSlug),
    enabled: taskSlug !== "new",
  });
  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  const { data: prioritiesData } = useQuery({
    queryKey: ["priorities"],
    queryFn: () => getPriorities(),
  });
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const [taskDetails, setTaskDetails] = useState<TaskType | null>(
    taskData
      ? {
          taskName: taskData.name,
          description: taskData.description ?? "",
          dueDate: taskData.dueDate?.toDateString() ?? "",
          attachments: taskData.attachments,
          objectives: taskData.objectives,
          comments: taskData.comments,
          assignee: {
            name: taskData.assignee?.name ?? "",
            image: taskData.assignee?.profilePicture ?? undefined,
          },
          priority: taskData.priority?.name ?? "",
          project: taskData.project
            ? {
                name: taskData.project.name,
                id: taskData.project.id,
              }
            : null,
          status: taskData.status?.name ?? "",
        }
      : null,
  );
  const { data: statusesData } = useQuery({
    queryKey: ["statuses", taskDetails?.project?.id],
    queryFn: () => getStatuses(taskDetails?.project?.id!),
    enabled: !!taskDetails?.project,
  });
  const [commentInput, setCommentInput] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [popOvers, setPopOvers] = useState({
    assignee: false,
    dueDate: false,
    project: false,
    priority: false,
    status: false,
  });
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const latestCommentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (latestCommentContainerRef.current) {
      latestCommentContainerRef.current.scrollTop = 0;
    }
  }, [taskDetails?.comments]);

  useEffect(() => {
    if (taskData) {
      setTaskDetails({
        taskName: taskData.name,
        description: taskData.description ?? "",
        dueDate: taskData.dueDate?.toDateString() ?? "",
        attachments: taskData.attachments,
        objectives: taskData.objectives,
        comments: taskData.comments,
        assignee: {
          name: taskData.assignee?.name ?? "",
          image: taskData.assignee?.profilePicture ?? undefined,
        },
        priority: taskData.priority?.name ?? "",
        project: taskData.project
          ? { name: taskData.project.name, id: taskData.project.id }
          : null,
        status: taskData.status?.name ?? "",
      });
    } else {
      setTaskDetails({
        taskName: "",
        description: "",
        dueDate: "",
        attachments: [],
        objectives: [],
        comments: [],
        assignee: {
          name: "",
          image: undefined,
        },
        priority: "",
        project: null,
        status: "",
      });
    }
  }, [taskData]);

  return (
    <>
      {!taskDataLoading ? (
        <Card className="sticky top-0 h-full flex-1">
          <CardContent className="flex h-full flex-col p-0">
            <div className="flex flex-1 flex-col gap-5 overflow-auto p-4">
              <div className="flex items-center justify-between">
                {/* <Link href="/tasks"> */}
                <Button
                  onClick={() => {
                    removeSearchQuery("task");
                  }}
                  variant="icon"
                  size="icon"
                  className="h-6 w-6"
                >
                  <X />
                </Button>
                {/* </Link> */}
                <Button variant="icon" size="icon" className="h-6 w-6">
                  <Ellipsis />
                </Button>
              </div>
              <div className="flex flex-1 flex-col gap-4 overflow-hidden">
                <div className="flex-1 overflow-auto">
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex flex-1 flex-col gap-1">
                      <Input
                        placeholder="Task name"
                        className="w-full border-transparent bg-transparent text-xlg font-semibold"
                        value={taskDetails?.taskName ?? ""}
                        onChange={(e) =>
                          setTaskDetails((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  taskName: e.target.value,
                                }
                              : prev,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-5 flex flex-col gap-3">
                    <div className="flex items-center gap-1">
                      <span className="w-14 text-xsm font-semibold">
                        Assignee
                      </span>
                      <Popover
                        open={popOvers.assignee}
                        onOpenChange={() =>
                          setPopOvers((prev) => ({
                            ...prev,
                            assignee: !prev.assignee,
                          }))
                        }
                      >
                        <PopoverTrigger asChild className="flex-1 px-2">
                          <Button
                            variant="ghost"
                            size="md"
                            className="flex w-auto justify-start gap-2"
                          >
                            {typeof taskDetails?.assignee.image === "string" ? (
                              <Avatar className="h-5 w-5">
                                <AvatarImage
                                  src={taskDetails?.assignee.image}
                                  alt={taskDetails?.assignee.name}
                                />
                                <AvatarFallback>
                                  {taskDetails?.assignee.name
                                    .toUpperCase()
                                    .slice(0, 1)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <User className="h-5 w-5" />
                            )}
                            <span
                              className={`text-sm font-medium ${taskDetails?.assignee.name ? "text-text-100" : "text-text-20"} `}
                            >
                              {taskDetails?.assignee.name
                                ? taskDetails.assignee.name
                                : "Assign to"}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {usersData?.map(
                                  ({ id, name, profilePicture }) => (
                                    <CommandItem
                                      key={id}
                                      onSelect={(value) => {
                                        setPopOvers((prev) => ({
                                          ...prev,
                                          assignee: false,
                                        }));
                                        setTaskDetails((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                assignee: {
                                                  name: value,
                                                  image:
                                                    profilePicture ?? undefined,
                                                },
                                              }
                                            : prev,
                                        );
                                      }}
                                    >
                                      {name}
                                    </CommandItem>
                                  ),
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-14 text-xsm font-semibold">
                        Due date
                      </span>
                      <Popover
                        open={popOvers.dueDate}
                        onOpenChange={() =>
                          setPopOvers((prev) => ({
                            ...prev,
                            dueDate: !prev.dueDate,
                          }))
                        }
                      >
                        <PopoverTrigger asChild className="flex-1 px-2">
                          <Button
                            variant="ghost"
                            size="md"
                            className="flex w-auto justify-start gap-2"
                          >
                            <CalendarDays className="h-5 w-5" />
                            <span
                              className={`text-sm font-medium ${taskDetails?.dueDate ? "text-text-100" : "text-text-20"} `}
                            >
                              {taskDetails?.dueDate
                                ? new Date(
                                    taskDetails?.dueDate,
                                  ).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                  })
                                : "No due date"}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(e) => {
                              setDate(e);
                              setTaskDetails((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      dueDate: e?.toDateString() ?? "",
                                    }
                                  : prev,
                              );
                              setPopOvers((prev) => ({
                                ...prev,
                                dueDate: false,
                              }));
                            }}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-14 text-xsm font-semibold">
                        Project
                      </span>
                      <Popover
                        open={popOvers.project}
                        onOpenChange={() =>
                          setPopOvers((prev) => ({
                            ...prev,
                            project: !prev.project,
                          }))
                        }
                      >
                        <PopoverTrigger asChild className="flex-1 px-2">
                          <Button
                            variant="ghost"
                            size="md"
                            className="flex w-auto justify-start gap-2"
                          >
                            <TargetIcon className="h-5 w-5" />
                            <span
                              className={`text-sm font-medium ${taskDetails?.project ? "text-text-100" : "text-text-20"} `}
                            >
                              {taskDetails?.project?.name ?? `Select project`}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {projectsData?.map((project) => (
                                  <CommandItem
                                    key={project.id}
                                    onSelect={() => {
                                      setTaskDetails((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              project: {
                                                name: project.name,
                                                id: project.id,
                                              },
                                            }
                                          : prev,
                                      );
                                      setPopOvers((prev) => ({
                                        ...prev,
                                        project: !prev.project,
                                      }));
                                    }}
                                  >
                                    {project.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-14 text-xsm font-semibold">
                        Priority
                      </span>
                      <Popover
                        open={popOvers.priority}
                        onOpenChange={() =>
                          setPopOvers((prev) => ({
                            ...prev,
                            priority: !prev.priority,
                          }))
                        }
                      >
                        <PopoverTrigger asChild className="flex-1 px-2">
                          <Button
                            variant="ghost"
                            size="md"
                            className="flex w-auto justify-start gap-2"
                          >
                            <TrendingUp className="h-5 w-5" />
                            <span
                              className={`text-sm font-medium ${taskDetails?.priority ? "text-text-100" : "text-text-20"} `}
                            >
                              {taskDetails?.priority
                                ? taskDetails?.priority
                                : "Level"}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {prioritiesData?.map(({ id, name }) => (
                                  <CommandItem
                                    key={id}
                                    onSelect={(value) => {
                                      setTaskDetails((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              priority: value,
                                            }
                                          : prev,
                                      );
                                      setPopOvers((prev) => ({
                                        ...prev,
                                        priority: !prev.priority,
                                      }));
                                    }}
                                  >
                                    {name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    {taskDetails?.project && (
                      <div className="flex items-center gap-1">
                        <span className="w-14 text-xsm font-semibold">
                          Status
                        </span>
                        <Popover
                          open={popOvers.status}
                          onOpenChange={() =>
                            setPopOvers((prev) => ({
                              ...prev,
                              status: !prev.status,
                            }))
                          }
                        >
                          <PopoverTrigger asChild className="flex-1 px-2">
                            <Button
                              variant="ghost"
                              size="md"
                              className="flex w-auto justify-start gap-2"
                            >
                              <BatteryMedium className="h-5 w-5" />
                              <span
                                className={`text-sm font-medium ${taskDetails?.status ? "text-text-100" : "text-text-20"} `}
                              >
                                {taskDetails?.status
                                  ? taskDetails?.status
                                  : "Select Status"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Command>
                              <CommandInput placeholder="Search framework..." />
                              <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {statusesData?.map(({ id, name }) => (
                                    <CommandItem
                                      key={id}
                                      onSelect={(value) => {
                                        setTaskDetails((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                status: value,
                                              }
                                            : prev,
                                        );
                                        setPopOvers((prev) => ({
                                          ...prev,
                                          status: !prev.status,
                                        }));
                                      }}
                                    >
                                      {name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                  <Textarea
                    className="mb-4 bg-white"
                    placeholder="Description.."
                    value={taskDetails?.description ?? ""}
                    onChange={(e) => {
                      setTaskDetails((prev) =>
                        prev
                          ? {
                              ...prev,
                              description: e.target.value,
                            }
                          : prev,
                      );
                    }}
                  />
                  <div className="mb-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xsm font-semibold">Attachment</span>
                      <Button
                        variant="icon"
                        size="icon"
                        onClick={() => attachmentInputRef.current?.click()}
                      >
                        <Plus className="h-5 w-5" />
                        <Input
                          className="hidden"
                          ref={attachmentInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const images = e.target.files;
                            console.log("images", images);
                            if (images) {
                              const srcUrls = Array.from(images).map(
                                (imageFile) => URL.createObjectURL(imageFile),
                              );
                              setTaskDetails((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      attachments: srcUrls,
                                    }
                                  : prev,
                              );
                            }
                          }}
                        />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 overflow-auto">
                      {taskDetails?.attachments?.map((item) => (
                        <Image
                          key={item}
                          alt=""
                          src={item}
                          className="h-[70px] w-[70px] rounded-[8px] object-cover object-center"
                          width={70}
                          height={70}
                        />
                      ))}
                    </div>
                  </div>
                  <TaskObjective
                    objectives={taskDetails?.objectives ?? []}
                    setObjectives={setTaskDetails}
                  />
                </div>
                <div className="mt-auto flex max-h-48 flex-col gap-4">
                  <div className="flex flex-1 flex-col gap-2.5 overflow-hidden">
                    <span className="text-xsm font-semibold">
                      {`Comments(${taskDetails?.comments?.length ?? 0})`}
                    </span>
                    <div
                      className="flex flex-1 flex-col gap-4 overflow-auto"
                      ref={latestCommentContainerRef}
                    >
                      {taskDetails?.comments?.map((comment, index) => (
                        <TaskComment key={index} comment={comment} />
                      ))}
                    </div>
                  </div>
                  <Input
                    placeholder="Ask question or post an update"
                    className="mt-auto bg-transparent"
                    value={commentInput}
                    onChange={(e) => {
                      setCommentInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setTaskDetails((prev) =>
                          prev
                            ? {
                                ...prev,
                                comments: [
                                  {
                                    id: Math.random() * 1000,
                                    user: { name: "", profilePicture: "" },
                                    comment: commentInput,
                                  },
                                  ...prev.comments,
                                ],
                              }
                            : prev,
                        );
                        setCommentInput("");
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <NewTaskSkeleton />
      )}
    </>
  );
}

interface TaskCommentProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: {
    id: number;
    comment: string;
    user: {
      name: string | null;
      profilePicture: string | null;
    };
  };
}

export const TaskComment = forwardRef<HTMLDivElement, TaskCommentProps>(
  ({ comment, ...props }, ref) => {
    return (
      <div className="flex items-start gap-2" {...props} ref={ref}>
        <Avatar className="h-5 w-5">
          <AvatarImage src={comment.user.profilePicture ?? undefined} />
          <AvatarFallback className="text-xsm">
            {comment.user.name?.toUpperCase().slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{comment.user.name}</span>
          <span className="text-sm font-medium text-text-80">
            {comment.comment}
          </span>
        </div>
      </div>
    );
  },
);

TaskComment.displayName = "TaskComment";

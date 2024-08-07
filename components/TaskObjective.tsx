"use client";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import TaskCheckbox from "@/components/TaskCheckbox";
import { Input } from "@/components/ui/input";
import { TaskType } from "@/components/NewTask";

interface TaskObjectiveProps {
  objectives: { name: string; value: boolean; id: number }[];
  setObjectives: Dispatch<SetStateAction<TaskType | null>>;
}

export function TaskObjective({
  objectives,
  setObjectives,
}: TaskObjectiveProps) {
  useEffect(() => {
    if (objectiveItemContainerRef.current && lastObjectiveItemRef.current) {
      objectiveItemContainerRef.current.scrollTop =
        lastObjectiveItemRef.current.offsetTop;
      // lastObjectiveItemRef.current?.querySelector("input")?.focus();
    }
  }, [objectives]);
  const objectiveItemContainerRef = useRef<HTMLDivElement>(null);
  const lastObjectiveItemRef = useRef<HTMLDivElement>(null);
  // console.log("lastObjectiveItemRef", lastObjectiveItemRef.current);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xsm font-semibold">Objective</span>
        <Button
          variant="icon"
          size="icon"
          onClick={() => {
            setObjectives((prev) =>
              prev
                ? {
                    ...prev,
                    objectives: prev.objectives && [
                      ...prev.objectives,
                      { id: Math.random() * 1000, name: "", value: false },
                    ],
                  }
                : prev,
            );
          }}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <div
        className="flex max-h-40 flex-col overflow-auto"
        ref={objectiveItemContainerRef}
      >
        {objectives?.map((item, index, array) => (
          <TaskObjectiveItem
            key={item.id}
            ref={lastObjectiveItemRef}
            setObjectives={setObjectives}
            objectiveId={item.id}
            value={item.value}
            name={item.name}
            lastItem={index === array.length - 1}
            lastObjectiveItemRef={lastObjectiveItemRef}
          />
        ))}
      </div>
    </div>
  );
}

interface TaskObjectiveItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  setObjectives: Dispatch<SetStateAction<TaskType | null>>;
  objectiveId: number;
  lastItem: boolean;
  name: string;
  value: boolean;
  lastObjectiveItemRef: RefObject<HTMLDivElement>;
}

export const TaskObjectiveItem = forwardRef<
  HTMLDivElement,
  TaskObjectiveItemProps
>(
  (
    {
      setObjectives,
      objectiveId,
      name,
      lastObjectiveItemRef,
      value,
      lastItem,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(name);
    return (
      <div
        className={`flex items-center gap-2 border-b ${lastItem ? "border-b-transparent" : "border-b-[#F1F2F4]"} py-2.5`}
        ref={ref}
        {...props}
      >
        <TaskCheckbox isActive={value} />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Write Objective"
          className="h-7 border-0 bg-transparent"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setObjectives((prev) =>
                prev
                  ? {
                      ...prev,
                      objectives: prev.objectives && [
                        ...prev.objectives,
                        { id: Math.random() * 1000, name: "", value: false },
                      ],
                    }
                  : prev,
              );
            }
          }}
          onBlur={(e) => {
            if (e.target.value.trim() === "") {
              setObjectives((prev) =>
                prev
                  ? {
                      ...prev,
                      objectives: prev.objectives?.filter(
                        (item) => item.id !== objectiveId,
                      ),
                    }
                  : prev,
              );
            }
          }}
        />
        <Button
          variant="icon"
          size="icon"
          className="h-5 w-5"
          onClick={() => {
            setObjectives((prev) =>
              prev
                ? {
                    ...prev,
                    objectives: prev.objectives?.filter(
                      (item) => item.id !== objectiveId,
                    ),
                  }
                : prev,
            );
          }}
        >
          <X className="" />
        </Button>
      </div>
    );
  },
);

TaskObjectiveItem.displayName = "TaskObjectiveItem";

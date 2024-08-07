"use client";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
interface TaskCheckboxProps {
  isActive: boolean;
}

export default function TaskCheckbox({ isActive }: TaskCheckboxProps) {
  const [activeState, setActiveState] = useState(isActive);
  return (
    <Toggle
      pressed={activeState}
      onClick={() => setActiveState((prev) => !prev)}
      variant="task"
      size="task"
      className=""
    >
      {activeState && (
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.25293 4.00018L4.41826 7.16418L10.7463 0.836182"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Toggle>
  );
}

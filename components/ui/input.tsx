import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "file:bg-transparent flex h-[49px] w-full rounded-[8px] border border-[#D8E0E8] bg-[#F8F9FD] px-3 py-2 text-sm font-medium outline-none file:border-0 file:text-sm file:font-medium placeholder:text-text-20 focus:border-blue-40 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

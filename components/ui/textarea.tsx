import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bg-transparent flex min-h-[80px] w-full rounded-[8px] border border-[#D8E0E8] border-input bg-[#F8F9FD] px-3 py-2 text-sm outline-none placeholder:text-muted-foreground placeholder:text-text-20 focus:border-blue-40 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

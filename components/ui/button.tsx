import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-[#E3E4E8] disabled:text-[#F1F2F4]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-80 text-primary-foreground hover:bg-blue-60 active:bg-blue-100",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-blue-80 text-blue-80 bg-transparent hover:bg-blue-80/5 active:bg-blue-80/15 disabled:bg-transparent disabled:text-[#D3D4DA] disabled:border-[#D3D4DA] ",
        secondary: "bg-blue-80/10 text-blue-80 hover:bg-blue-80/5",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "text-inherit",
      },
      size: {
        default: "h-[51px] px-[24px] font-semibold",
        md: "h-[45px] px-[20px] font-semibold",
        sm: "h-[33px] px-[14px] font-medium",
        lg: "h-11  px-8",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

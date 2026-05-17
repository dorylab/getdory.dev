import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-normal tracking-normal transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[#26251e] bg-[#26251e] text-[#f7f7f4] shadow-none hover:border-[#3b3a33] hover:bg-[#3b3a33] hover:text-[#f7f7f4] dark:border-[#edecec] dark:bg-[#edecec] dark:text-[#14120b] dark:hover:border-[#d7d6d5] dark:hover:bg-[#d7d6d5]",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground shadow-none hover:bg-destructive/90",
        outline:
          "border border-[#26251e06] bg-[#e6e5e0] text-[#26251e] shadow-none hover:border-[#26251e06] hover:bg-[#e1e0db] hover:text-[#26251e] dark:border-white/8 dark:bg-[#26241e] dark:text-[#edecec] dark:hover:bg-[#2b2923]",
        glow: "border border-[#26251e] bg-[#26251e] text-[#f7f7f4] shadow-none hover:border-[#3b3a33] hover:bg-[#3b3a33] dark:border-[#edecec] dark:bg-[#edecec] dark:text-[#14120b] dark:hover:border-[#d7d6d5] dark:hover:bg-[#d7d6d5]",
        secondary:
          "border border-[#26251e06] bg-[#e6e5e0] text-[#26251e] shadow-none hover:border-[#26251e06] hover:bg-[#e1e0db] hover:text-[#26251e] dark:border-white/8 dark:bg-[#26241e] dark:text-[#edecec] dark:hover:bg-[#2b2923]",
        ghost:
          "border border-[#26251e06] bg-[#e6e5e0] text-[#26251e] shadow-none hover:border-[#26251e06] hover:bg-[#e1e0db] hover:text-[#26251e] dark:border-white/8 dark:bg-[#26241e] dark:text-[#edecec] dark:hover:bg-[#2b2923]",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[43px] px-[1.35em] py-0 text-base leading-none",
        xs: "h-8 px-3 py-0 text-xs leading-none",
        sm: "h-9 px-4 py-0 text-sm leading-none",
        lg: "h-[43px] px-[1.35em] py-0 text-base leading-none",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

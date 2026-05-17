"use client";

import { type ComponentProps, useState } from "react";

import { buttonVariants } from "@/components/landing/variants";
import { cn } from "@/lib/utils";
import EasyToUseImg from "@/public/easy-to-use-sql-console.png";
import ResultTableImg from "@/public/result-table.png";
import schemaSuggestionImg from "@/public/schema-aware-autocomplete.png";

import { FramedImage } from "../ui/shotframe";

const highlightPositions = {
  0: "translateX(0)",
  1: "translateX(100%)",
  2: "translateX(200%)",
} as const;

export function PreviewImages(props: ComponentProps<"div">) {
  const [active, setActive] = useState<0 | 1 | 2>(0);
  const previews = [
    {
      image: EasyToUseImg,
      name: "Easy to Use",
    },
    {
      image: schemaSuggestionImg,
      name: "Suggestions",
    },
    {
      image: ResultTableImg,
      name: "Results",
    },
  ] as const;

  return (
    <div {...props} className={cn("relative grid", props.className)}>
      <div className="absolute bottom-3 left-1/2 z-2 flex w-[calc(100%-1.5rem)] -translate-x-1/2 flex-row rounded-full border bg-white p-0.5 shadow-xl sm:bottom-0 sm:w-auto dark:bg-black">
        <div
          role="none"
          className="absolute z-[-1] h-[43px] w-1/3 rounded-full bg-[#26251e] transition-transform sm:w-40 dark:bg-[#edecec]"
          style={{
            transform: highlightPositions[active],
          }}
        />
        {previews.map((item, i) => (
          <button
            key={i}
            className={cn(
              buttonVariants({
                variant: active === i ? "primary" : "secondary",
              }),
              "min-w-0 flex-1 px-3 text-sm sm:w-40 sm:flex-none",
            )}
            onClick={() => setActive(i as 0 | 1 | 2)}
          >
            <span className="block truncate">{item.name}</span>
          </button>
        ))}
      </div>
      {previews.map((item, i) => (
        <FramedImage
          key={i}
          src={item.image}
          ratio={1440 / 900}
          className={cn(
            "col-start-1 row-start-1 select-none",
            active === i
              ? "animate-in fade-in slide-in-from-bottom-12 duration-800"
              : "invisible",
          )}
        />
      ))}
    </div>
  );
}

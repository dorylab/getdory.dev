import Image from "next/image";
import type { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";
import ProductOilBackdrop from "@/public/product-oil-backdrop.png";

type PaintedProductFrameProps = {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function PaintedProductFrame({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 1023px) calc(100vw - 48px), 700px",
  width = 3024,
  height = 1730,
  priority = false,
}: PaintedProductFrameProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-[24px] p-5 pt-9 shadow-[0_18px_46px_rgba(23,22,21,0.1)] sm:p-7 sm:pt-12 dark:shadow-[0_18px_46px_rgba(0,0,0,0.34)]",
        className,
      )}
    >
      <Image
        src={ProductOilBackdrop}
        alt=""
        fill
        aria-hidden="true"
        sizes={sizes}
        className="-z-10 object-cover object-center dark:brightness-[0.42] dark:saturate-[0.78]"
      />
      <Image
        src={src}
        alt={alt}
        {...(typeof src === "string" ? { width, height } : {})}
        priority={priority}
        sizes={sizes}
        className={cn(
          "h-auto w-full rounded-[14px] shadow-[0_14px_30px_rgba(47,108,255,0.16)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.48)]",
          imageClassName,
        )}
      />
    </figure>
  );
}

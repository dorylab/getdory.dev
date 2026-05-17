"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/landing/variants";
import { Button } from "@/components/ui/button";
import { detectPlatform, type DownloadPlatform } from "@/lib/download-platform";
import { cn } from "@/lib/utils";

type DownloadButtonProps = {
  macAppleSiliconUrl?: string;
  macIntelUrl?: string;
  macUrl?: string;
  windowsInstallerUrl?: string;
  windowsUrl?: string;
  fallbackUrl: string;
  className?: string;
  platformOverride?: DownloadPlatform;
};

export function DownloadButton({
  macAppleSiliconUrl,
  macIntelUrl,
  macUrl,
  windowsInstallerUrl,
  windowsUrl,
  fallbackUrl,
  className,
  platformOverride,
}: DownloadButtonProps) {
  const t = useTranslations("landing");
  const [platform, setPlatform] = useState<DownloadPlatform>("other");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setPlatform(detectPlatform());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  function handleDownload() {
    posthog.capture(
      "download_button_click",
      { platform },
      { transport: "sendBeacon" },
    );
  }

  const resolvedPlatform = platformOverride ?? platform;

  const label =
    resolvedPlatform === "mac-apple-silicon" || resolvedPlatform === "mac-intel"
      ? t("downloadForMac")
      : resolvedPlatform === "windows"
        ? t("downloadForWindows")
        : t("downloadLatest");

  const href =
    resolvedPlatform === "mac-apple-silicon"
      ? (macAppleSiliconUrl ?? macUrl ?? macIntelUrl ?? fallbackUrl)
      : resolvedPlatform === "mac-intel"
        ? (macIntelUrl ?? macUrl ?? macAppleSiliconUrl ?? fallbackUrl)
        : resolvedPlatform === "windows"
          ? (windowsInstallerUrl ?? windowsUrl ?? fallbackUrl)
          : fallbackUrl;

  return (
    <Button
      asChild
      className={cn(buttonVariants(), "h-auto shadow-none max-sm:text-sm", className)}
      onClick={handleDownload}
    >
      <a href={href}>
        <span className="min-w-0 truncate">{label}</span>
        <Download className="ml-2 h-4 w-4 shrink-0" />
      </a>
    </Button>
  );
}

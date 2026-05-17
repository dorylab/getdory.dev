"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface ModeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ModeToggle({
  compact = true,
  className,
}: ModeToggleProps) {
  const t = useTranslations("navbar.theme");
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = React.useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  if (!mounted) {
    return null;
  }

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "shrink-0",
          className,
        )}
        onClick={toggleTheme}
      >
        {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
        <span className="sr-only">{t("toggle")}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className={cn(
        "w-full justify-between text-left shadow-none",
        className,
      )}
      onClick={toggleTheme}
    >
      <span className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6">
          {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
        </span>
        <span className="flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {isDark ? t("switchToLight") : t("switchToDark")}
          </span>
          <span className="text-muted-foreground text-xs">
            {isDark ? t("currentDark") : t("currentLight")}
          </span>
        </span>
      </span>
    </Button>
  );
}

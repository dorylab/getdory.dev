"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import DoryIcon from "@/public/dory.png";

import { ModeToggle } from "../../dory/mode-toggle";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarProps {
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  name = "Dory",
  homeUrl = "/",
  mobileLinks = [],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const t = useTranslations("navbar");
  const fallbackMobileLinks = [
    { text: t("home"), href: "/" },
    { text: t("blog"), href: "/blog" },
    { text: t("download"), href: "/download" },
  ];
  const resolvedMobileLinks =
    mobileLinks.length > 0 ? mobileLinks : fallbackMobileLinks;
  const hasMobileLinks = showNavigation && resolvedMobileLinks.length > 0;

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-3 z-50 px-3 md:px-6",
        className,
      )}
    >
      <div className="relative mx-auto flex max-w-[1300px] justify-center">
        <NavbarComponent className="justify-center px-0 py-0">
          <div className="site-header-shell pointer-events-auto relative flex w-full max-w-[21.5rem] items-center justify-between gap-3 rounded-full px-3 py-1.5 sm:max-w-[24rem] md:w-fit md:max-w-full md:justify-center md:gap-3 md:px-2">
            <NavbarLeft className="flex-none">
              <Link
                href={homeUrl}
                className="group flex min-w-0 items-center gap-2.5 rounded-full py-1.5 pr-3 pl-1 transition-opacity hover:opacity-90"
              >
                <Image
                  src={DoryIcon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded-full object-contain"
                  priority
                />
                <span className="min-w-0">
                  <span className="text-landing-foreground block truncate text-[0.95rem] font-semibold tracking-[-0.03em] dark:text-white">
                    {name}
                  </span>
                </span>
              </Link>
            </NavbarLeft>
            {showNavigation && (
              <div className="hidden md:flex">
                {customNavigation || <Navigation />}
              </div>
            )}
            <NavbarRight className="flex-none">
              <div className="hidden items-center gap-2 md:flex">
                <ModeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="site-header-download-button"
                >
                  <Link href="/download">{t("download")}</Link>
                </Button>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="size-5" />
                    <span className="sr-only">{t("toggleMenu")}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-background/95 flex h-full w-[88vw] max-w-sm flex-col border-l border-white/10 px-6 py-6 backdrop-blur-xl"
                >
                  <SheetHeader className="space-y-4 text-left">
                    <Link href={homeUrl} className="flex items-center gap-3">
                      <Image
                        src={DoryIcon}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-contain"
                      />
                      <div className="min-w-0">
                        <SheetTitle className="truncate text-3xl font-semibold tracking-tight">
                          {name}
                        </SheetTitle>
                        <SheetDescription className="mt-1 text-sm">
                          {t("tagline")}
                        </SheetDescription>
                      </div>
                    </Link>
                  </SheetHeader>

                  {hasMobileLinks ? (
                    <nav className="mt-8 grid gap-2">
                      {resolvedMobileLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="hover:bg-accent/60 flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors"
                        >
                          <span>{link.text}</span>
                          <ArrowUpRight className="text-muted-foreground size-4" />
                        </Link>
                      ))}
                    </nav>
                  ) : (
                    <></>
                  )}

                  <div className="mt-auto flex flex-col gap-3 pt-8 md:hidden">
                    <Button
                      asChild
                      className="site-header-download-button w-full"
                    >
                      <Link href="/download">{t("download")}</Link>
                    </Button>
                    <ModeToggle compact={false} />
                  </div>
                </SheetContent>
              </Sheet>
            </NavbarRight>
          </div>
        </NavbarComponent>
      </div>
    </header>
  );
}

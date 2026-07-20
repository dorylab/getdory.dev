import { ArrowRight, Bot, Layers3, Play, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ComponentType, ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { DownloadButton } from "@/components/landing/download-button";
import { buttonVariants } from "@/components/landing/variants";
import Github from "@/components/logos/github";
import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import { Link } from "@/i18n/navigation";
import { getLatestReleaseDownloads } from "@/lib/github-release";
import { generateMarketingMetadata } from "@/lib/marketing-og";
import { cn } from "@/lib/utils";
import HeroPreview from "@/public/hero.png";

type PageProps = {
  params: Promise<{ lang: string }>;
};

type Icon = ComponentType<{ className?: string }>;

type TextItem = {
  title: string;
  description: string;
};

type DatabaseGroup = {
  label: string;
  items: string[];
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateMarketingMetadata({ page: "home", lang });
}

const proofIcons = [UserRound, Layers3, Bot] as const;
const databaseIcons: Record<string, string> = {
  ClickHouse: "/icons/databases/clickhouse.svg",
  PostgreSQL: "/icons/databases/postgresql.svg",
  MySQL: "/icons/databases/mysql.svg",
  MariaDB: "/icons/databases/mariadb.svg",
  SQLite: "/icons/databases/sqlite.svg",
  DuckDB: "/icons/databases/duckdb.svg",
  "SQL Server": "/icons/databases/sqlserver.svg",
  Oracle: "/icons/databases/oracle.svg",
  Neon: "/icons/databases/neon.svg",
  Snowflake: "/icons/databases/more.svg",
};

function SectionLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <div
      className={cn(
        "mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase",
        inverse ? "text-[#f7f1e8]/58" : "text-dory-muted",
      )}
    >
      <span className={cn("size-1.5", inverse ? "bg-[#d9c48b]" : "bg-dory-ink")} />
      {children}
    </div>
  );
}

function ProductFrame({
  src,
  alt,
  priority,
  className,
  imageClassName,
  children,
}: {
  src: StaticImageData | string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-black/10 bg-[#11100f] p-2 shadow-[0_36px_120px_rgba(16,16,15,0.2)] dark:border-white/12 dark:shadow-[0_36px_120px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={3024}
        height={1900}
        priority={priority}
        className={cn(
          "aspect-[1.62/1] w-full rounded-[16px] bg-black object-cover object-left-top",
          imageClassName,
        )}
      />
      {children}
    </div>
  );
}

function SectionHeader({
  label,
  title,
  description,
  inverse = false,
}: {
  label: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  inverse?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <SectionLabel inverse={inverse}>{label}</SectionLabel>
      <h2
        className={cn(
          "text-[clamp(2.55rem,5vw,5.2rem)] leading-[0.96] font-medium tracking-[-0.045em] text-balance",
          inverse && "text-[#f7f1e8]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-7 md:text-lg md:leading-8",
            inverse ? "text-[#f7f1e8]/64" : "text-dory-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProofItem({ icon: IconComponent, item, index }: { icon: Icon; item: TextItem; index: number }) {
  return (
    <div className="grid min-h-44 grid-rows-[auto_1fr] border-l border-dory-line px-5 py-6 first:border-l-0 md:px-7">
      <div className="flex items-center justify-between text-dory-muted">
        <IconComponent className="size-4.5" />
        <span className="text-xs tabular-nums">0{index + 1}</span>
      </div>
      <div className="self-end pt-8">
        <h3 className="text-lg font-medium">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-dory-muted">{item.description}</p>
      </div>
    </div>
  );
}

function DatabaseSupport({ groups, note }: { groups: DatabaseGroup[]; note: string }) {
  return (
    <div className="grid gap-4">
      {groups.map((group, groupIndex) => (
        <div
          key={group.label}
          className={cn(
            "border border-dory-line bg-dory-surface p-5",
            groupIndex === 0 &&
              "bg-[linear-gradient(135deg,rgba(217,196,139,0.18),transparent_55%),var(--dory-surface-strong)]",
          )}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-xl font-medium">{group.label}</h3>
            {groupIndex === 0 ? <span className="text-xs font-medium text-dory-muted">{note}</span> : null}
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((name) => (
              <div key={name} className="flex min-h-16 items-center gap-3 border border-dory-line bg-dory-page p-3">
                <span className="flex size-10 shrink-0 items-center justify-center border border-dory-line bg-dory-surface">
                  <Image
                    src={databaseIcons[name] ?? "/icons/databases/more.svg"}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <span className="min-w-0 text-sm font-medium md:text-base">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const [t, downloads] = await Promise.all([
    getTranslations({ locale: lang, namespace: "landing" }),
    getLatestReleaseDownloads(),
  ]);

  const proofItems = t.raw("agentHome.proof.items") as TextItem[];
  const workflowSteps = t.raw("agentHome.workflow.steps") as TextItem[];
  const databaseGroups = t.raw("agentHome.database.groups") as DatabaseGroup[];

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen overflow-x-clip bg-dory-page px-4 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col">
          <section className="relative overflow-hidden border-b border-dory-line pt-18 pb-0 text-center md:pt-24">
            <div className="pointer-events-none absolute inset-x-[-12%] top-0 h-[700px] bg-[radial-gradient(circle_at_50%_0%,rgba(47,108,255,0.12),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(136,182,255,0.12),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_58%)]" />

            <div className="relative z-10 mx-auto max-w-5xl">
              <SectionLabel>{t("agentHome.hero.kicker")}</SectionLabel>
              <h1 className="mx-auto max-w-[1040px] text-[clamp(3rem,7.2vw,7rem)] leading-[0.92] font-medium tracking-[-0.06em] text-balance [word-break:keep-all]">
                {t("agentHome.hero.title")}
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-dory-muted md:text-xl md:leading-9">
                {t("agentHome.hero.description")}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <DownloadButton
                  macUrl={downloads.macUrl}
                  fallbackUrl={downloads.releaseUrl}
                  platformOverride="mac-apple-silicon"
                />
                <a
                  href="https://app.getdory.dev"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
                >
                  {t("heroExperienceCta")}
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <ProductFrame
              src={HeroPreview}
              alt={t("agentHome.hero.imageAlt")}
              priority
              className="relative z-10 mx-auto mt-12 max-w-[1180px] translate-y-4 shadow-[0_28px_90px_rgba(16,16,15,0.16)] md:translate-y-6"
            />
          </section>

          <section className="grid border-b border-dory-line py-4 md:grid-cols-3 md:py-0">
            {proofItems.map((item, index) => (
              <ProofItem key={item.title} item={item} icon={proofIcons[index] ?? Layers3} index={index} />
            ))}
          </section>

          <section
            id="shared-workflow"
            className="relative scroll-mt-20 overflow-hidden border-b border-dory-line bg-[#171615] px-6 py-20 text-[#f7f1e8] md:px-10 md:py-28"
          >
            <div className="pointer-events-none absolute top-[-240px] right-[-180px] size-[560px] rounded-full bg-[#24496f]/25 blur-[120px]" />
            <div className="relative">
              <SectionHeader
                inverse
                label={t("agentHome.workflow.label")}
                title={t("agentHome.workflow.title")}
                description={t("agentHome.workflow.description")}
              />

              <div className="mt-16 grid border-y border-white/14 md:grid-cols-4">
                {workflowSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="group relative border-b border-white/14 py-7 md:min-h-64 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <div className="flex items-center justify-between text-xs text-[#f7f1e8]/42">
                      <span>0{index + 1}</span>
                      {index < workflowSteps.length - 1 ? <ArrowRight className="hidden size-4 md:block" /> : null}
                    </div>
                    <div className="mt-16">
                      <h3 className="text-xl font-medium">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#f7f1e8]/58">{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-10 max-w-4xl text-xl leading-8 text-[#f7f1e8]/82 md:text-3xl md:leading-11">
                {t("agentHome.workflow.statement")}
              </p>
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-20 md:grid-cols-[0.72fr_1.28fr] md:py-28">
            <SectionHeader
              label={t("agentHome.database.label")}
              title={t("agentHome.database.title")}
              description={t("agentHome.database.description")}
            />

            <DatabaseSupport groups={databaseGroups} note={t("agentHome.database.clickhouseNote")} />
          </section>

          <section className="grid gap-10 pt-20 md:grid-cols-[1fr_auto] md:items-end md:pt-28">
            <div>
              <SectionLabel>{t("agentHome.cta.label")}</SectionLabel>
              <h2 className="max-w-[800px] text-[clamp(3.5rem,7vw,7rem)] leading-[0.88] font-medium tracking-[-0.06em] text-balance">
                {t("agentHome.cta.title")}
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.cta.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/download" className={cn(buttonVariants(), "gap-2")}>
                {t("downloadLatest")}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://app.getdory.dev"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
              >
                <Play className="size-4" />
                {t("heroExperienceCta")}
              </a>
              <a
                href="https://github.com/dorylab/dory"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
              >
                <Github className="size-4" />
                {t("viewOnGitHub")}
              </a>
            </div>
          </section>
        </div>
      </main>
      <FooterSection locale={lang} />
    </MarketingLayout>
  );
}

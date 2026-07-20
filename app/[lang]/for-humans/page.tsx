import {
  ArrowRight,
  Bookmark,
  Bot,
  ChartNoAxesCombined,
  Check,
  Clock3,
  Code2,
  Database,
  Download,
  PanelsTopLeft,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/landing/variants";
import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import { Link } from "@/i18n/navigation";
import { getMarketingOgImage } from "@/lib/marketing-og";
import { cn } from "@/lib/utils";
import ResultPreview from "@/public/result-table.png";

type PageProps = { params: Promise<{ lang: string }> };
type TextItem = { title: string; description: string };

const capabilityIcons = [
  Database,
  Code2,
  Bookmark,
  Clock3,
  Download,
  PanelsTopLeft,
  ChartNoAxesCombined,
  Bot,
] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const title = t("agentHome.humans.metaTitle");
  const description = t("agentHome.humans.metaDescription");
  const image = getMarketingOgImage("home", lang);

  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

function ProductFrame({
  src,
  alt,
  className,
  width = 3024,
  height = 1730,
  priority = false,
}: {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] border border-black/10 bg-[#11100f] p-2 shadow-[0_36px_120px_rgba(16,16,15,0.2)] dark:border-white/12 dark:shadow-[0_36px_120px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
        className="h-auto w-full rounded-[15px]"
      />
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 border-y border-dory-line">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-b border-dory-line py-3.5 text-sm leading-6 last:border-b-0"
        >
          <Check className="mt-1 size-3.5 shrink-0 text-dory-muted" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ForHumansPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const capabilities = t.raw("agentHome.humans.workspace.capabilities") as TextItem[];
  const connectionItems = t.raw("agentHome.humans.workspace.connectionItems") as string[];
  const resultFeatures = t.raw("agentHome.humans.results.features") as string[];
  const handoffFeatures = t.raw("agentHome.humans.handoff.features") as string[];
  const workflowSteps = t.raw("agentHome.workflow.steps") as TextItem[];
  const trustItems = t.raw("agentHome.humans.control.items") as string[];

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen overflow-x-clip bg-dory-page px-4 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <header className="relative overflow-hidden border-b border-dory-line pt-24 pb-18 md:pt-32 md:pb-24">
            <div className="pointer-events-none absolute inset-x-[-12%] top-0 h-[560px] bg-[radial-gradient(circle_at_25%_0%,rgba(47,108,255,0.14),transparent_36%)] dark:bg-[radial-gradient(circle_at_25%_0%,rgba(136,182,255,0.12),transparent_36%)]" />
            <div className="relative max-w-5xl">
              <p className="text-xs font-medium tracking-[0.16em] text-dory-muted uppercase">
                {t("agentHome.humans.label")}
              </p>
              <h1 className="mt-6 max-w-[1000px] text-[clamp(3.4rem,7vw,7rem)] leading-[0.9] font-medium tracking-[-0.06em] text-balance">
                {t("agentHome.humans.title")}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-dory-muted md:text-xl md:leading-9">
                {t("agentHome.humans.description")}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/download" className={cn(buttonVariants(), "gap-2")}>
                  {t("downloadLatest")}
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/for-agents" className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}>
                  {t("agentHome.agents.label")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </header>

          <section className="border-b border-dory-line py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div className="lg:pr-6">
                <span className="text-xs text-dory-muted">01 / 05</span>
                <h2 className="mt-5 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                  {t("agentHome.humans.workspace.title")}
                </h2>
                <p className="mt-5 text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                  {t("agentHome.humans.workspace.description")}
                </p>
              </div>
              <ProductFrame
                src="/images/for-humans/play-workspace.png"
                alt={t("agentHome.humans.workspace.imageAlt")}
                priority
              />
            </div>

            <div className="mt-18 border-t border-dory-line pt-12 md:mt-24 md:pt-16">
              <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                <h3 className="max-w-2xl text-3xl leading-[1.05] font-medium tracking-[-0.035em] md:text-4xl">
                  {t("agentHome.humans.workspace.capabilitiesTitle")}
                </h3>
                <p className="max-w-2xl text-base leading-7 text-dory-muted md:justify-self-end">
                  {t("agentHome.humans.workspace.capabilitiesDescription")}
                </p>
              </div>

              <div className="mt-10 grid border-t border-l border-dory-line md:grid-cols-2 lg:grid-cols-4">
                {capabilities.map((item, index) => {
                  const Icon = capabilityIcons[index] ?? Bot;
                  const isAi = index === capabilities.length - 1;

                  return (
                    <article
                      key={item.title}
                      className={cn(
                        "min-h-[220px] border-r border-b border-dory-line p-5 md:p-6",
                        isAi && "border-[#171615] bg-[#171615] text-[#f7f1e8] dark:border-white/15",
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <Icon className={cn("size-5", isAi ? "text-[#d9c48b]" : "text-dory-muted")} />
                        <span className={cn("font-mono text-[10px]", isAi ? "text-white/45" : "text-dory-muted")}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h4 className="mt-10 text-lg font-medium tracking-[-0.02em]">{item.title}</h4>
                      <p className={cn("mt-3 text-sm leading-6", isAi ? "text-white/60" : "text-dory-muted")}>
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="border-x border-b border-dory-line px-5 py-5 md:flex md:items-start md:gap-8 md:px-6">
                <p className="shrink-0 text-xs font-medium tracking-[0.12em] text-dory-muted uppercase md:w-52 md:pt-1">
                  {t("agentHome.humans.workspace.connectionLabel")}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 md:mt-0">
                  {connectionItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm leading-6">
                      <Check className="size-3.5 shrink-0 text-dory-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <figure>
                <ProductFrame
                  src="/images/for-humans/play-saved-queries.png"
                  alt={t("agentHome.humans.workspace.savedQueriesAlt")}
                  className="rounded-[16px] p-1.5 shadow-none"
                />
                <figcaption className="mt-3 text-xs tracking-[0.1em] text-dory-muted uppercase">Saved Queries</figcaption>
              </figure>
              <figure>
                <ProductFrame
                  src="/images/for-humans/play-query-history.png"
                  alt={t("agentHome.humans.workspace.historyAlt")}
                  className="rounded-[16px] p-1.5 shadow-none"
                />
                <figcaption className="mt-3 text-xs tracking-[0.1em] text-dory-muted uppercase">Query History</figcaption>
              </figure>
            </div>
          </section>

          <section className="grid gap-10 border-b border-dory-line py-20 md:py-28 lg:grid-cols-[1.28fr_0.72fr] lg:items-center">
            <div className="relative lg:-ml-16 lg:pb-24">
              <ProductFrame src={ResultPreview} alt={t("agentHome.humans.results.imageAlt")} width={3024} height={1898} />
              <ProductFrame
                src="/images/charts.png"
                alt={t("agentHome.humans.results.chartAlt")}
                width={3024}
                height={1964}
                className="mt-5 rounded-[16px] p-1.5 shadow-none lg:absolute lg:right-[-3rem] lg:bottom-0 lg:w-[46%]"
              />
            </div>
            <div className="lg:pl-6">
              <span className="text-xs text-dory-muted">02 / 05</span>
              <h2 className="mt-5 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.humans.results.title")}
              </h2>
              <p className="mt-5 text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.results.description")}
              </p>
              <FeatureList items={resultFeatures} />
            </div>
          </section>

          <section className="border-b border-dory-line py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-dory-muted">
                  <Bot className="size-5" />
                  <span className="text-xs">03 / 05</span>
                </div>
                <h2 className="mt-8 max-w-xl text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                  {t("agentHome.humans.ai.title")}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-dory-muted md:text-lg md:leading-8 lg:justify-self-end">
                {t("agentHome.humans.ai.description")}
              </p>
            </div>

            <div className="mt-12 grid gap-6 bg-[linear-gradient(135deg,rgba(47,108,255,0.08),transparent_55%)] p-5 sm:p-8 md:grid-cols-[1fr_0.72fr] md:p-12 dark:bg-[linear-gradient(135deg,rgba(136,182,255,0.08),transparent_55%)]">
              <figure className="md:pt-14">
                <figcaption className="mb-4 text-xs tracking-[0.12em] text-dory-muted uppercase">
                  {t("agentHome.humans.ai.contextLabel")}
                </figcaption>
                <ProductFrame
                  src="/images/core-features/dory-copilot-context.png"
                  alt={t("agentHome.humans.ai.contextAlt")}
                  width={684}
                  height={1250}
                  className="mx-auto max-w-[500px] rounded-[16px] p-1.5 shadow-none"
                />
              </figure>
              <figure>
                <figcaption className="mb-4 text-xs tracking-[0.12em] text-dory-muted uppercase">
                  {t("agentHome.humans.ai.actionsLabel")}
                </figcaption>
                <ProductFrame
                  src="/images/core-features/dory-copilot-actions.png"
                  alt={t("agentHome.humans.ai.actionsAlt")}
                  width={684}
                  height={1898}
                  className="mx-auto max-h-[760px] max-w-[430px] rounded-[16px] p-1.5 shadow-none"
                />
              </figure>
            </div>
          </section>

          <section className="border-b border-dory-line py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <span className="text-xs text-dory-muted">04 / 05</span>
                <h2 className="mt-5 max-w-2xl text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                  {t("agentHome.humans.handoff.title")}
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                  {t("agentHome.humans.handoff.description")}
                </p>
                <FeatureList items={handoffFeatures} />
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <ProductFrame
                src="/images/agent-runs/agent-runs-list.png"
                alt={t("agentHome.humans.handoff.listAlt")}
                className="rounded-[16px] p-1.5 shadow-none lg:mt-20"
              />
              <ProductFrame
                src="/images/agent-runs/agent-run-detail.png"
                alt={t("agentHome.humans.handoff.detailAlt")}
              />
            </div>
            <ProductFrame
              src="/images/agent-runs/agent-run-workspace.png"
              alt={t("agentHome.humans.handoff.workspaceAlt")}
              className="mt-6 lg:ml-auto lg:w-[88%]"
            />
          </section>

          <section className="border-b border-dory-line py-20 md:py-28">
            <div className="grid gap-8 md:grid-cols-[0.68fr_1.32fr]">
              <div>
                <span className="text-xs text-dory-muted">05 / 05</span>
                <p className="mt-5 text-xs font-medium tracking-[0.16em] text-dory-muted uppercase">
                  {t("agentHome.workflow.label")}
                </p>
                <h2 className="mt-4 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                  {t("agentHome.workflow.title")}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                  {t("agentHome.workflow.description")}
                </p>
              </div>

              <ol className="grid border-t border-l border-dory-line sm:grid-cols-2">
                {workflowSteps.map((step, index) => (
                  <li key={step.title} className="relative min-h-[200px] border-r border-b border-dory-line p-5 md:p-6">
                    <div className="flex items-center justify-between text-dory-muted">
                      <span className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
                      {index < workflowSteps.length - 1 && <ArrowRight className="size-4" aria-hidden="true" />}
                    </div>
                    <h3 className="mt-12 text-lg font-medium tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-dory-muted">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-8 max-w-4xl border-l-2 border-dory-ink pl-5 text-base leading-7 md:text-lg md:leading-8">
              {t("agentHome.workflow.statement")}
            </p>
          </section>

          <section className="my-20 grid gap-8 bg-[#171615] px-6 py-9 text-[#f7f1e8] md:grid-cols-[0.7fr_1.3fr] md:px-10 md:py-12">
            <div>
              <ShieldCheck className="size-6 text-[#d9c48b]" />
              <h2 className="mt-6 text-2xl font-medium md:text-3xl">{t("agentHome.humans.control.title")}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#f7f1e8]/58">
                {t("agentHome.humans.control.description")}
              </p>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-white/12 py-3.5 text-sm leading-6">
                  <Check className="mt-1 size-3.5 shrink-0 text-[#d9c48b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <FooterSection locale={lang} />
    </MarketingLayout>
  );
}

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

import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import { getMarketingOgImage } from "@/lib/marketing-og";
import { cn } from "@/lib/utils";
import ActionsPreview from "@/public/actions-focus.png";
import AskPreview from "@/public/ask-focus.png";
import AutoCompletePreview from "@/public/auto-complete.png";
import ContextPreview from "@/public/context-focus.png";
import HeroPreview from "@/public/hero.png";
import ResultPreview from "@/public/result-table.png";
import SqlEditorOilBackdrop from "@/public/sql-editor-oil-backdrop.png";

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
        "overflow-hidden rounded-[20px] border border-black/10 bg-[#11100f] p-1.5 shadow-[0_28px_90px_rgba(16,16,15,0.16)] dark:border-white/12 dark:shadow-[0_28px_90px_rgba(0,0,0,0.42)]",
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
    <ul className="mt-6 border-y border-dory-line">
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
  const isCjk = lang === "zh" || lang === "ja";
  const completionFeatures = t.raw("agentHome.humans.workspace.completionFeatures") as TextItem[];
  const capabilities = t.raw("agentHome.humans.workspace.capabilities") as TextItem[];
  const resultFeatures = t.raw("agentHome.humans.results.features") as string[];
  const handoffFeatures = t.raw("agentHome.humans.handoff.features") as string[];
  const workflowSteps = t.raw("agentHome.workflow.steps") as TextItem[];
  const trustItems = t.raw("agentHome.humans.control.items") as string[];
  const aiCards = [
    {
      id: "ask",
      image: AskPreview,
      label: t("aiNative.tabs.ask.label"),
      title: t("aiNative.tabs.ask.title"),
      description: t("aiNative.tabs.ask.description"),
      imageAlt: t("aiNative.tabs.ask.imageAlt"),
    },
    {
      id: "actions",
      image: ActionsPreview,
      label: t("aiNative.tabs.actions.label"),
      title: t("aiNative.tabs.actions.title"),
      description: t("aiNative.tabs.actions.description"),
      imageAlt: t("aiNative.tabs.actions.imageAlt"),
    },
    {
      id: "context",
      image: ContextPreview,
      label: t("aiNative.tabs.context.label"),
      title: t("aiNative.tabs.context.title"),
      description: t("aiNative.tabs.context.description"),
      imageAlt: t("aiNative.tabs.context.imageAlt"),
    },
  ] as const;

  return (
    <MarketingLayout lang={lang}>
      <main lang={lang} className="min-h-screen overflow-x-clip bg-dory-page px-4 pb-20 text-dory-ink sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <header className="relative isolate mx-auto w-full max-w-[1080px] border-b border-dory-line pt-20 pb-16 sm:pt-24 md:pt-28 md:pb-20">
            <div className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_30%_0%,rgba(47,108,255,0.13),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_0%,rgba(136,182,255,0.11),transparent_40%)]" />
            <div className="relative max-w-4xl">
              <h1
                className={cn(
                  "max-w-[920px] text-[clamp(3.2rem,6vw,5.75rem)] leading-[0.94] font-medium tracking-[-0.055em] text-balance",
                  isCjk &&
                    "max-w-[850px] text-[clamp(3rem,5.4vw,5.2rem)] leading-[1.02] tracking-[-0.045em]",
                )}
              >
                {t("agentHome.humans.title")}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-pretty text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.description")}
              </p>
            </div>
            <ProductFrame
              src={HeroPreview}
              alt={t("agentHome.hero.imageAlt")}
              priority
              className="relative mt-10 md:mt-12"
            />
          </header>

          <section className="border-b border-dory-line py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-12">
              <div>
                <h3
                  className={cn(
                    "max-w-xl text-[clamp(2rem,3vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.03em] text-balance",
                    isCjk && "text-[clamp(1.875rem,2.8vw,2.5rem)] leading-[1.16] tracking-[-0.025em]",
                  )}
                >
                  {t("agentHome.humans.workspace.completionTitle")}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-pretty text-dory-muted">
                  {t("agentHome.humans.workspace.completionDescription")}
                </p>

                <div className="mt-8 border-t border-dory-line">
                  {completionFeatures.map((item, index) => (
                    <article key={item.title} className="grid grid-cols-[28px_1fr] gap-3 border-b border-dory-line py-4 last:border-b-0">
                      <span className="pt-0.5 font-mono text-[10px] text-dory-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium tracking-[-0.01em]">{item.title}</h4>
                        <p className="mt-1.5 text-sm leading-6 text-dory-muted">{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <figure className="relative isolate overflow-hidden rounded-[24px] p-5 pt-9 shadow-[0_18px_46px_rgba(23,22,21,0.1)] sm:p-7 sm:pt-12 dark:shadow-[0_18px_46px_rgba(0,0,0,0.34)]">
                <Image
                  src={SqlEditorOilBackdrop}
                  alt=""
                  fill
                  aria-hidden="true"
                  sizes="(max-width: 1023px) calc(100vw - 48px), 700px"
                  className="-z-10 object-cover object-center dark:brightness-[0.42] dark:saturate-[0.78]"
                />
                <Image
                  src={AutoCompletePreview}
                  alt={t("agentHome.humans.workspace.completionImageAlt")}
                  sizes="(max-width: 1023px) calc(100vw - 72px), 700px"
                  className="h-auto w-full rounded-[14px] shadow-[0_14px_30px_rgba(47,108,255,0.16)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.48)]"
                />
              </figure>
            </div>

            <div className="mt-16 border-t border-dory-line pt-10 md:mt-20 md:pt-12">
              <div className="max-w-4xl">
                <h3
                  className={cn(
                    "max-w-[820px] text-[clamp(2.125rem,3.2vw,2.875rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance",
                    isCjk &&
                      "max-w-[760px] text-[clamp(2rem,3vw,2.625rem)] leading-[1.16] tracking-[-0.025em]",
                  )}
                >
                  {t("agentHome.humans.workspace.capabilitiesTitle")}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-pretty text-dory-muted">
                  {t("agentHome.humans.workspace.capabilitiesDescription")}
                </p>
              </div>

              <div className="mt-8 grid border-t border-l border-dory-line md:grid-cols-2 lg:grid-cols-4">
                {capabilities.map((item, index) => {
                  const Icon = capabilityIcons[index] ?? Bot;
                  const isAi = index === capabilities.length - 1;

                  return (
                    <article
                      key={item.title}
                      className={cn(
                        "min-h-[200px] border-r border-b border-dory-line p-5",
                        isAi && "border-[#171615] bg-[#171615] text-[#f7f1e8] dark:border-white/15",
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <Icon className={cn("size-5", isAi ? "text-[#d9c48b]" : "text-dory-muted")} />
                        <span className={cn("font-mono text-[10px]", isAi ? "text-white/45" : "text-dory-muted")}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h4 className="mt-8 text-lg font-medium tracking-[-0.02em]">{item.title}</h4>
                      <p className={cn("mt-3 text-sm leading-6", isAi ? "text-white/60" : "text-dory-muted")}>
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
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

          <section className="border-b border-dory-line py-16 md:py-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl leading-[1.06] font-medium tracking-[-0.035em] md:text-4xl lg:text-5xl">
                {t("agentHome.humans.results.title")}
              </h2>
              <p className="mt-4 text-base leading-7 text-pretty text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.results.description")}
              </p>
              <FeatureList items={resultFeatures} />
            </div>
            <div className="relative mt-8 md:mt-10 lg:mt-12 lg:pb-20">
              <ProductFrame src={ResultPreview} alt={t("agentHome.humans.results.imageAlt")} width={3024} height={1898} />
              <ProductFrame
                src="/images/charts.png"
                alt={t("agentHome.humans.results.chartAlt")}
                width={3024}
                height={1964}
                className="mt-5 rounded-[14px] p-1 shadow-none lg:absolute lg:right-[-1.5rem] lg:bottom-0 lg:w-[48%]"
              />
            </div>
          </section>

          <section className="border-b border-dory-line py-16 md:py-24">
            <div className="max-w-4xl">
              <h2
                className={cn(
                  "max-w-[820px] text-[clamp(2.125rem,3.2vw,2.875rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance",
                  isCjk &&
                    "max-w-[760px] text-[clamp(2rem,3vw,2.625rem)] leading-[1.16] tracking-[-0.025em]",
                )}
              >
                {t("agentHome.humans.handoff.title")}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-pretty text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.handoff.description")}
              </p>
              <div className="max-w-3xl">
                <FeatureList items={handoffFeatures} />
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 md:items-start">
              <ProductFrame
                src="/images/agent-runs/agent-runs-list.png"
                alt={t("agentHome.humans.handoff.listAlt")}
                className="rounded-[16px] p-1.5 shadow-none"
              />
              <ProductFrame
                src="/images/agent-runs/agent-run-detail.png"
                alt={t("agentHome.humans.handoff.detailAlt")}
                className="rounded-[16px] p-1.5 shadow-none"
              />
            </div>
            <ProductFrame
              src="/images/agent-runs/agent-run-workspace.png"
              alt={t("agentHome.humans.handoff.workspaceAlt")}
              className="mt-5"
            />
          </section>

          <section className="border-b border-dory-line py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:gap-12">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-dory-muted uppercase">
                  {t("agentHome.workflow.label")}
                </p>
                <h2 className="mt-3 text-3xl leading-[1.06] font-medium tracking-[-0.035em] md:text-4xl lg:text-5xl">
                  {t("agentHome.workflow.title")}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-pretty text-dory-muted md:text-lg md:leading-8">
                  {t("agentHome.workflow.description")}
                </p>
              </div>

              <ol className="grid border-t border-l border-dory-line sm:grid-cols-2">
                {workflowSteps.map((step, index) => (
                  <li key={step.title} className="relative min-h-[190px] border-r border-b border-dory-line p-5">
                    <div className="flex items-center justify-between text-dory-muted">
                      <span className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
                      {index < workflowSteps.length - 1 && <ArrowRight className="size-4" aria-hidden="true" />}
                    </div>
                    <h3 className="mt-10 text-lg font-medium tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-dory-muted">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-8 max-w-3xl border-l-2 border-dory-ink pl-5 text-base leading-7 text-pretty md:text-lg md:leading-8">
              {t("agentHome.workflow.statement")}
            </p>
          </section>

          <section className="my-16 grid gap-8 bg-[#171615] px-6 py-8 text-[#f7f1e8] md:my-24 md:grid-cols-[0.75fr_1.25fr] md:px-9 md:py-10">
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

          <section className="border-b border-dory-line py-16 md:py-24">
            <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
              <div>
                <h2
                  className={cn(
                    "max-w-[760px] text-[clamp(3rem,6vw,5.25rem)] leading-[0.96] font-medium tracking-[-0.05em] text-balance",
                    isCjk &&
                      "max-w-[700px] text-[clamp(2.75rem,5.4vw,4.8rem)] leading-[1.04] tracking-[-0.045em]",
                  )}
                >
                  {t.rich("aiNative.heading", {
                    ask: (chunks) => <span className="text-dory-ink">{chunks} </span>,
                    act: (chunks) => <span className="text-dory-ink">{chunks} </span>,
                    stay: (chunks) => <span className="text-dory-muted">{chunks}</span>,
                  })}
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-pretty text-dory-muted md:text-lg md:leading-8 lg:justify-self-end lg:pb-1">
                {t("aiNative.description")}
              </p>
            </div>

            <div className="mt-10 grid border-t border-l border-dory-line lg:grid-cols-3">
              {aiCards.map((card, index) => (
                <article
                  key={card.id}
                  className="flex min-h-[520px] flex-col border-r border-b border-dory-line bg-dory-surface p-5 sm:p-7 lg:min-h-[610px]"
                >
                  <div className="flex items-center justify-between gap-4 text-xs text-dory-muted">
                    <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span>{card.label}</span>
                  </div>
                  <h3 className="mt-10 text-2xl leading-tight font-medium tracking-[-0.025em] md:text-[1.7rem]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-pretty text-dory-muted md:text-base md:leading-7">
                    {card.description}
                  </p>
                  <figure className="mt-auto pt-9">
                    <div className="aspect-square overflow-hidden border border-black/10 bg-[#11100f] p-2 dark:border-white/12">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        sizes="(max-width: 1023px) 100vw, 400px"
                        placeholder="blur"
                        className="h-full w-full bg-[#11100f] object-cover object-top"
                      />
                    </div>
                  </figure>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <FooterSection locale={lang} />
    </MarketingLayout>
  );
}

import {
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  Database,
  Laptop,
  Layers3,
  Network,
  Server,
  Table2,
  TerminalSquare,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/landing/variants";
import { MarketingLayout } from "@/components/marketing-layout";
import FooterSection from "@/components/sections/footer";
import { Link } from "@/i18n/navigation";
import { getMarketingOgImage } from "@/lib/marketing-og";
import { cn } from "@/lib/utils";
import McpPreview from "@/public/mcp.png";

type PageProps = { params: Promise<{ lang: string }> };
type TextItem = { title: string; description: string };
type Icon = ComponentType<{ className?: string }>;

const runtimeIcons: Icon[] = [Laptop, TerminalSquare, Network];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const title = `${t("agentHome.agents.title")} — Dory`;
  const description = t("agentHome.agents.description");
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
}: {
  src: StaticImageData | string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] border border-black/10 bg-[#11100f] p-2 shadow-[0_36px_120px_rgba(16,16,15,0.2)] dark:border-white/12 dark:shadow-[0_36px_120px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <Image src={src} alt={alt} width={3024} height={1730} className="h-auto w-full rounded-[15px]" />
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

export default async function ForAgentsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const connectionAgents = t.raw("agentHome.agents.connections.agents") as string[];
  const focusedTools = t.raw("agentHome.agents.tools.items") as string[];
  const artifactModes = t.raw("agentHome.agents.artifacts.modes") as TextItem[];
  const runFeatures = t.raw("agentHome.agents.runs.features") as string[];
  const runtimeItems = t.raw("agentHome.agents.runtime.items") as TextItem[];

  return (
    <MarketingLayout lang={lang}>
      <main className="min-h-screen overflow-x-clip bg-dory-page px-4 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <header className="relative overflow-hidden border-b border-dory-line pt-24 pb-18 md:pt-32 md:pb-24">
            <div className="pointer-events-none absolute inset-x-[-12%] top-0 h-[560px] bg-[radial-gradient(circle_at_75%_0%,rgba(47,108,255,0.14),transparent_36%)] dark:bg-[radial-gradient(circle_at_75%_0%,rgba(136,182,255,0.12),transparent_36%)]" />
            <div className="relative max-w-5xl">
              <p className="text-xs font-medium tracking-[0.16em] text-dory-muted uppercase">
                {t("agentHome.agents.label")}
              </p>
              <h1 className="mt-6 max-w-[1050px] text-[clamp(3.4rem,7vw,7rem)] leading-[0.9] font-medium tracking-[-0.06em] text-balance">
                {t("agentHome.agents.title")}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-dory-muted md:text-xl md:leading-9">
                {t("agentHome.agents.description")}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/docs/reference/mcp" className={cn(buttonVariants(), "gap-2")}>
                  {t("agentHome.agents.connections.doryLayer")}
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/for-humans" className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}>
                  {t("agentHome.humans.label")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </header>

          <section className="grid gap-10 border-b border-dory-line py-20 md:py-28 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <span className="text-xs text-dory-muted">01 / 04</span>
              <h2 className="mt-5 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.agents.connections.title")}
              </h2>
              <p className="mt-5 text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.agents.connections.description")}
              </p>
              <div className="mt-8 border-y border-dory-line py-5">
                <div className="grid grid-cols-3 gap-2">
                  {connectionAgents.map((agent) => (
                    <div key={agent} className="border border-dory-line bg-dory-surface px-3 py-3 text-center text-xs font-medium">
                      {agent}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center py-3 text-dory-muted"><ArrowDown className="size-4" /></div>
                <div className="flex items-center justify-center gap-2 bg-[#171615] px-4 py-4 text-sm font-medium text-[#f7f1e8]">
                  <Layers3 className="size-4 text-[#d9c48b]" />
                  {t("agentHome.agents.connections.doryLayer")}
                </div>
                <div className="flex justify-center py-3 text-dory-muted"><ArrowDown className="size-4" /></div>
                <div className="flex items-center justify-center gap-2 border border-dory-line bg-dory-surface px-4 py-4 text-sm font-medium">
                  <Database className="size-4" />
                  {t("agentHome.agents.connections.databaseLayer")}
                </div>
              </div>
            </div>
            <ProductFrame src={McpPreview} alt={t("agentHome.agents.connections.imageAlt")} />
          </section>

          <section className="grid border-b border-dory-line lg:grid-cols-[0.78fr_1.22fr]">
            <article className="border-b border-dory-line py-20 lg:border-r lg:border-b-0 lg:pr-10">
              <div className="flex items-center justify-between text-dory-muted">
                <Code2 className="size-5" />
                <span className="text-xs">02 / 04</span>
              </div>
              <h2 className="mt-12 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.agents.tools.title")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.agents.tools.description")}
              </p>
              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {focusedTools.map((tool) => (
                  <div key={tool} className="flex items-center gap-3 border border-dory-line bg-dory-surface px-3.5 py-3 text-sm">
                    <span className="size-1.5 bg-dory-ink" />
                    {tool}
                  </div>
                ))}
              </div>
            </article>

            <article className="py-20 lg:pl-10">
              <div className="flex items-center justify-between text-dory-muted">
                <Table2 className="size-5" />
                <span className="text-xs">03 / 04</span>
              </div>
              <h2 className="mt-12 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.agents.artifacts.title")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.agents.artifacts.description")}
              </p>
              <div className="mt-8 grid gap-px bg-dory-line sm:grid-cols-2">
                {artifactModes.map((mode, index) => (
                  <div key={mode.title} className="min-h-36 bg-dory-page p-5">
                    <span className="text-xs text-dory-muted">0{index + 1}</span>
                    <h3 className="mt-7 text-lg font-medium">{mode.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-dory-muted">{mode.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="border-b border-dory-line py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <span className="text-xs text-dory-muted">04 / 04</span>
                <h2 className="mt-5 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                  {t("agentHome.agents.runs.title")}
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                  {t("agentHome.agents.runs.description")}
                </p>
                <FeatureList items={runFeatures} />
              </div>
            </div>

            <div className="relative mt-12 pb-12 lg:min-h-[760px]">
              <ProductFrame
                src="/images/agent-runs/agent-run-detail.png"
                alt={t("agentHome.agents.runs.detailAlt")}
                className="relative z-10 max-w-[980px]"
              />
              <ProductFrame
                src="/images/agent-runs/agent-runs-list.png"
                alt={t("agentHome.agents.runs.listAlt")}
                className="relative z-20 mt-5 max-w-[660px] rounded-[16px] p-1.5 lg:absolute lg:right-0 lg:bottom-0"
              />
              <ProductFrame
                src="/images/agent-runs/agent-run-workspace.png"
                alt={t("agentHome.agents.runs.workspaceAlt")}
                className="relative z-30 mt-5 max-w-[620px] rounded-[16px] p-1.5 lg:absolute lg:bottom-6 lg:left-10"
              />
            </div>
          </section>

          <section className="py-20 md:py-28">
            <div className="flex items-end justify-between gap-6 border-b border-dory-line pb-6">
              <div>
                <p className="text-xs font-medium tracking-[0.16em] text-dory-muted uppercase">
                  {t("agentHome.agents.runtime.label")}
                </p>
                <h2 className="mt-5 text-3xl font-medium tracking-[-0.035em] md:text-5xl">
                  {t("agentHome.agents.runtime.title")}
                </h2>
              </div>
              <Server className="hidden size-7 text-dory-muted md:block" />
            </div>
            <div className="grid md:grid-cols-3">
              {runtimeItems.map((item, index) => {
                const RuntimeIcon = runtimeIcons[index] ?? Server;
                return (
                  <article
                    key={item.title}
                    className="border-b border-dory-line py-7 md:min-h-56 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <RuntimeIcon className="size-5 text-dory-muted" />
                    <h3 className="mt-12 text-xl font-medium">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-dory-muted">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <FooterSection locale={lang} />
    </MarketingLayout>
  );
}

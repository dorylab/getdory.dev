import { ArrowRight, Bot, Check, PencilLine, ShieldCheck } from "lucide-react";
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
import AiPreview from "@/public/hero.png";
import ConsolePreview from "@/public/easy-to-use-sql-console.png";
import ResultPreview from "@/public/result-table.png";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const title = `${t("agentHome.humans.title")} — Dory`;
  const description = t("agentHome.humans.description");
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

export default async function ForHumansPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const workspaceFeatures = t.raw("agentHome.humans.workspace.features") as string[];
  const resultFeatures = t.raw("agentHome.humans.results.features") as string[];
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

          <section className="grid gap-10 border-b border-dory-line py-20 md:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="lg:pr-6">
              <span className="text-xs text-dory-muted">01 / 04</span>
              <h2 className="mt-5 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.humans.workspace.title")}
              </h2>
              <p className="mt-5 text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.workspace.description")}
              </p>
              <FeatureList items={workspaceFeatures} />
            </div>
            <ProductFrame src={ConsolePreview} alt={t("agentHome.humans.workspace.imageAlt")} />
          </section>

          <section className="grid gap-10 border-b border-dory-line py-20 md:py-28 lg:grid-cols-[1.28fr_0.72fr] lg:items-center">
            <ProductFrame src={ResultPreview} alt={t("agentHome.humans.results.imageAlt")} className="lg:-ml-16" />
            <div className="lg:pl-6">
              <span className="text-xs text-dory-muted">02 / 04</span>
              <h2 className="mt-5 text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.humans.results.title")}
              </h2>
              <p className="mt-5 text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.results.description")}
              </p>
              <FeatureList items={resultFeatures} />
            </div>
          </section>

          <section className="grid border-b border-dory-line lg:grid-cols-2">
            <article className="border-b border-dory-line py-20 lg:border-r lg:border-b-0 lg:pr-10">
              <div className="flex items-center justify-between text-dory-muted">
                <Bot className="size-5" />
                <span className="text-xs">03 / 04</span>
              </div>
              <h2 className="mt-12 max-w-xl text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.humans.ai.title")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.ai.description")}
              </p>
              <ProductFrame src={AiPreview} alt={t("agentHome.humans.ai.imageAlt")} className="mt-10 rounded-[16px] p-1.5 shadow-none" />
            </article>

            <article className="py-20 lg:pl-10">
              <div className="flex items-center justify-between text-dory-muted">
                <PencilLine className="size-5" />
                <span className="text-xs">04 / 04</span>
              </div>
              <h2 className="mt-12 max-w-xl text-3xl leading-[1.04] font-medium tracking-[-0.035em] md:text-5xl">
                {t("agentHome.humans.handoff.title")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-dory-muted md:text-lg md:leading-8">
                {t("agentHome.humans.handoff.description")}
              </p>
              <ProductFrame
                src="/images/agent-runs/agent-run-workspace.png"
                alt={t("agentHome.humans.handoff.imageAlt")}
                className="mt-10 rounded-[16px] p-1.5 shadow-none"
              />
            </article>
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

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import FooterSection from "@/components/sections/footer";
import { Link } from "@/i18n/navigation";
import { MarketingLayout } from "@/components/marketing-layout";
import { defaultLanguage, locales, type Language } from "@/lib/i18n";
import { policies, policyIndexCopy } from "@/lib/policies";
import { siteConfig } from "@/lib/site";

function resolveLanguage(lang: string): Language {
  return locales.includes(lang as Language)
    ? (lang as Language)
    : defaultLanguage;
}

function policyPath(slug: string) {
  return `/policies/${slug}`;
}

function canonicalPath(locale: Language, pathname: string) {
  return locale === defaultLanguage ? pathname : `/${locale}${pathname}`;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLanguage(lang);
  const copy = policyIndexCopy[locale];
  const pathname = "/policies";

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: canonicalPath(locale, pathname),
      languages: Object.fromEntries([
        ...locales.map((language) => [
          language,
          canonicalPath(language, pathname),
        ]),
        ["x-default", pathname],
      ]),
    },
    openGraph: {
      title: `${copy.title} | Dory`,
      description: copy.description,
      url: new URL(canonicalPath(locale, pathname), siteConfig.url).toString(),
    },
  };
}

export default async function PoliciesIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLanguage(lang);
  const copy = policyIndexCopy[locale];
  const linkLocale = locale === defaultLanguage ? undefined : locale;

  return (
    <MarketingLayout lang={locale}>
      <main className="min-h-screen bg-dory-page px-4 pt-20 pb-20 text-dory-ink sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-[980px]">
          <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl leading-none font-semibold tracking-[-0.055em] text-balance md:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">
            {copy.intro}
          </p>

          <section className="mt-12 grid gap-px overflow-hidden border border-slate-950/10 bg-slate-950/10 md:grid-cols-3 dark:border-white/10 dark:bg-white/10">
            {policies.map((policy) => (
              <Link
                key={policy.slug}
                href={policyPath(policy.slug)}
                locale={linkLocale}
                className="group flex min-h-[18rem] flex-col justify-between bg-dory-page-wash p-6 text-dory-ink transition hover:bg-dory-surface dark:bg-[#111827] dark:hover:bg-white/[0.06]"
              >
                <div>
                  <div className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                    {copy.updatedLabel} {policy.lastUpdated}
                  </div>
                  <h2 className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.035em] text-balance md:text-3xl">
                    {policy.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {policy.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                  {copy.readPolicy}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </section>
        </div>
      </main>
      <FooterSection locale={locale} />
    </MarketingLayout>
  );
}

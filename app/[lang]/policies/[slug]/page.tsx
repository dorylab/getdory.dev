import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import FooterSection from "@/components/sections/footer";
import { Link } from "@/i18n/navigation";
import { MarketingLayout } from "@/components/marketing-layout";
import { defaultLanguage, locales, type Language } from "@/lib/i18n";
import { getPolicy, policies, policyIndexCopy } from "@/lib/policies";
import { siteConfig } from "@/lib/site";

function resolveLanguage(lang: string): Language {
  return locales.includes(lang as Language)
    ? (lang as Language)
    : defaultLanguage;
}

function canonicalPath(locale: Language, pathname: string) {
  return locale === defaultLanguage ? pathname : `/${locale}${pathname}`;
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    policies.map((policy) => ({
      lang,
      slug: policy.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLanguage(lang);
  const policy = getPolicy(slug);

  if (!policy) return {};

  const pathname = `/policies/${policy.slug}`;

  return {
    title: policy.title,
    description: policy.description,
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
      title: `${policy.title} | Dory`,
      description: policy.description,
      url: new URL(canonicalPath(locale, pathname), siteConfig.url).toString(),
    },
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveLanguage(lang);
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  const copy = policyIndexCopy[locale];
  const linkLocale = locale === defaultLanguage ? undefined : locale;

  return (
    <MarketingLayout lang={locale}>
      <main className="min-h-screen bg-dory-page px-4 pt-20 pb-20 text-dory-ink sm:px-6 md:px-10">
        <article className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <Link
              href="/policies"
              locale={linkLocale}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" />
              {copy.title}
            </Link>
            <nav className="grid gap-1 border-l border-slate-950/10 pl-4 dark:border-white/10">
              {policies.map((item) => (
                <Link
                  key={item.slug}
                  href={`/policies/${item.slug}`}
                  locale={linkLocale}
                  className={
                    item.slug === policy.slug
                      ? "py-1.5 text-sm font-semibold text-slate-950 dark:text-white"
                      : "py-1.5 text-sm text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  }
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="border-b border-slate-950/10 pb-8 dark:border-white/10">
              <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-5xl leading-none font-semibold tracking-[-0.055em] text-balance md:text-7xl">
                {policy.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">
                {policy.description}
              </p>
              <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                {copy.updatedLabel}: {policy.lastUpdated}
              </p>
            </div>

            <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
              {policy.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <FooterSection locale={locale} />
    </MarketingLayout>
  );
}

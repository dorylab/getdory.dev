import type { Language } from "@/lib/i18n";

export const policySlugs = [
  "privacy-policy",
  "terms-of-service",
  "rules-and-policies",
] as const;

export type PolicySlug = (typeof policySlugs)[number];

type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Policy = {
  slug: PolicySlug;
  title: string;
  description: string;
  lastUpdated: string;
  sections: PolicySection[];
};

export const policyIndexCopy = {
  en: {
    title: "Policies",
    description:
      "Privacy, terms, and acceptable use rules for Dory products, services, and websites.",
    eyebrow: "Legal",
    intro:
      "These pages explain how DoryLab handles data, what terms apply to Dory services, and what rules keep the community and product safe.",
    updatedLabel: "Last updated",
    readPolicy: "Read policy",
  },
  zh: {
    title: "政策",
    description: "Dory 产品、服务和网站的隐私、条款与使用规则。",
    eyebrow: "法律信息",
    intro:
      "这些页面说明 DoryLab 如何处理数据、Dory 服务适用的条款，以及维护社区和产品安全的使用规则。",
    updatedLabel: "最后更新",
    readPolicy: "阅读政策",
  },
  ja: {
    title: "ポリシー",
    description:
      "Dory の製品、サービス、Web サイトに適用されるプライバシー、利用規約、利用ルールです。",
    eyebrow: "法務",
    intro:
      "これらのページでは、DoryLab によるデータの取り扱い、Dory サービスに適用される条件、コミュニティと製品を安全に保つためのルールを説明します。",
    updatedLabel: "最終更新",
    readPolicy: "ポリシーを読む",
  },
  es: {
    title: "Políticas",
    description:
      "Privacidad, términos y reglas de uso aceptable para los productos, servicios y sitios web de Dory.",
    eyebrow: "Legal",
    intro:
      "Estas páginas explican cómo DoryLab maneja los datos, qué términos se aplican a los servicios de Dory y qué reglas mantienen seguros la comunidad y el producto.",
    updatedLabel: "Última actualización",
    readPolicy: "Leer política",
  },
} satisfies Record<Language, {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  updatedLabel: string;
  readPolicy: string;
}>;

const lastUpdated = "May 21, 2026";

export const policies = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How DoryLab collects, uses, stores, and protects information when you use Dory websites, products, and services.",
    lastUpdated,
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This Privacy Policy explains how DoryLab collects, uses, shares, and protects information when you visit getdory.dev, use Dory products, download Dory software, contact us, or interact with related services.",
          "Dory is a database and data workspace product. Depending on how you deploy or use it, you may connect it to databases, files, AI providers, authentication providers, or self-hosted infrastructure. You are responsible for ensuring that you have the rights and permissions required to process any data you connect to Dory.",
        ],
      },
      {
        heading: "Information We Collect",
        bullets: [
          "Account and contact information, such as your name, email address, organization, authentication identifiers, and support messages.",
          "Product usage information, such as pages visited, downloads, selected language, feature usage, feedback submissions, device information, browser information, approximate location derived from network data, and diagnostic events.",
          "Technical data, such as IP address, request metadata, logs, crash reports, error messages, and performance information needed to operate and secure the service.",
          "Content you choose to provide, such as documentation feedback, support details, saved queries, workspace configuration, or information entered into hosted Dory services.",
          "Connection and integration metadata needed to operate configured features. Dory should not be used to submit secrets or regulated personal data to us unless a specific service agreement allows it.",
        ],
      },
      {
        heading: "How We Use Information",
        bullets: [
          "Provide, operate, maintain, and improve Dory products, websites, downloads, and services.",
          "Authenticate users, manage accounts, provide support, respond to inquiries, and communicate service updates.",
          "Understand product usage, diagnose issues, improve performance, prevent abuse, and protect security.",
          "Develop new features, documentation, and integrations based on aggregated or de-identified usage patterns.",
          "Comply with legal obligations, enforce our terms, and protect the rights, safety, and property of DoryLab, users, and third parties.",
        ],
      },
      {
        heading: "Cookies, Analytics, and Local Storage",
        paragraphs: [
          "We may use cookies, local storage, analytics tools, and similar technologies to keep the website working, remember preferences, understand usage, and improve the product. For example, the website may use Vercel Analytics, PostHog, and local browser storage for events such as downloads, language changes, and feedback state.",
          "You can control cookies through your browser settings. Disabling cookies or local storage may affect some website or product features.",
        ],
      },
      {
        heading: "AI Providers and Connected Data",
        paragraphs: [
          "Dory may allow you to connect third-party AI providers or configure self-hosted AI services. When you use those features, prompts, schema context, query text, results, or related metadata may be sent to the provider you configure. That provider's terms and privacy policy apply to its processing.",
          "If you self-host Dory, you are responsible for configuring authentication, AI providers, logs, databases, backups, retention, and network access in a way that matches your security and privacy obligations.",
        ],
      },
      {
        heading: "Sharing Information",
        bullets: [
          "Service providers that help us host, analyze, secure, support, and operate Dory services.",
          "Third-party integrations you choose to connect or enable.",
          "Professional advisers, authorities, or other parties when required by law or necessary to protect rights, security, and safety.",
          "Successors in connection with a merger, acquisition, financing, reorganization, or sale of assets, subject to appropriate protections.",
        ],
      },
      {
        heading: "Security and Retention",
        paragraphs: [
          "We use reasonable administrative, technical, and organizational safeguards designed to protect information. No system is completely secure, and you should use appropriate controls for sensitive databases, credentials, and production environments.",
          "We keep information for as long as needed to provide services, comply with legal obligations, resolve disputes, enforce agreements, maintain security, and support legitimate business purposes. Retention periods may vary by data type and service configuration.",
        ],
      },
      {
        heading: "Your Choices and Rights",
        paragraphs: [
          "Depending on where you live, you may have rights to access, correct, delete, export, restrict, or object to certain processing of your personal information. You may also have the right to withdraw consent where processing is based on consent.",
          "To make a privacy request, contact us at contact@getdory.dev. We may need to verify your identity before completing a request.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "Dory is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, contact us so we can take appropriate action.",
        ],
      },
      {
        heading: "Changes and Contact",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised last updated date.",
          "Questions about this Privacy Policy can be sent to contact@getdory.dev.",
        ],
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description:
      "The terms that govern access to and use of Dory websites, products, hosted services, downloads, documentation, and related materials.",
    lastUpdated,
    sections: [
      {
        heading: "Agreement to These Terms",
        paragraphs: [
          "These Terms of Service govern your access to and use of Dory websites, products, hosted services, downloads, documentation, and related materials provided by DoryLab. By accessing or using Dory, you agree to these Terms.",
          "If you use Dory on behalf of an organization, you represent that you have authority to accept these Terms for that organization. If you do not agree to these Terms, do not use Dory services.",
        ],
      },
      {
        heading: "Dory Products and Services",
        paragraphs: [
          "Dory provides software and services for database exploration, SQL workflows, AI-assisted analysis, documentation, downloads, and related developer workflows. Some parts of Dory may be open source, some may be hosted services, and some may depend on third-party providers configured by you.",
          "We may add, change, suspend, or discontinue features at any time. We may also set usage limits, eligibility requirements, or technical requirements for particular services.",
        ],
      },
      {
        heading: "Accounts and Security",
        bullets: [
          "You must provide accurate account information and keep it up to date.",
          "You are responsible for safeguarding credentials, API keys, database credentials, tokens, and devices used with Dory.",
          "You are responsible for activity under your account or deployment, except where caused by our failure to meet these Terms.",
          "You must promptly notify us if you believe your account or deployment has been compromised.",
        ],
      },
      {
        heading: "Your Data and Responsibilities",
        paragraphs: [
          "You retain your rights in data, queries, files, schemas, prompts, results, configuration, and other content you submit or connect to Dory. You grant DoryLab the limited rights needed to provide, secure, troubleshoot, and improve the services you use.",
          "You are responsible for the legality, accuracy, permissions, security classification, retention, and backup of data you process with Dory. Do not connect Dory to data unless you have the right to access and process that data.",
        ],
      },
      {
        heading: "Acceptable Use",
        bullets: [
          "Do not use Dory to violate laws, rights, privacy, security, or contractual obligations.",
          "Do not attempt to bypass access controls, probe systems without authorization, disrupt services, or introduce malware.",
          "Do not upload or process content that is illegal, abusive, deceptive, infringing, or designed to harm others.",
          "Do not use automated access, scraping, or load generation in a way that harms the service or other users.",
          "Do not remove proprietary notices, misuse branding, or imply endorsement without written permission.",
        ],
      },
      {
        heading: "Third-Party Services",
        paragraphs: [
          "Dory may integrate with databases, identity providers, AI providers, cloud platforms, analytics tools, and other third-party services. Your use of third-party services is governed by their terms and privacy policies.",
          "DoryLab is not responsible for third-party services, content, models, outputs, availability, security practices, or data handling outside our control.",
        ],
      },
      {
        heading: "Software, Open Source, and Feedback",
        paragraphs: [
          "Software made available under an open-source license is governed by the applicable open-source license. These Terms apply to hosted services, websites, documentation, and other DoryLab materials unless a separate agreement or license says otherwise.",
          "If you provide feedback, suggestions, or ideas, you grant DoryLab permission to use them without restriction or compensation, while you retain any rights you may have in your original materials.",
        ],
      },
      {
        heading: "Disclaimers",
        paragraphs: [
          "Dory services and materials are provided as is and as available, without warranties of any kind to the fullest extent permitted by law. We do not guarantee that the services will be uninterrupted, error-free, secure, or that outputs will be accurate or suitable for your use case.",
          "AI-generated outputs, SQL suggestions, explanations, and analyses may be incomplete or incorrect. You are responsible for reviewing, testing, and validating outputs before relying on them, especially in production, security, financial, medical, legal, or other high-impact contexts.",
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          "To the fullest extent permitted by law, DoryLab and its affiliates, contributors, suppliers, and licensors will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenues, data, goodwill, or business opportunities.",
          "To the fullest extent permitted by law, our total liability for claims relating to the services is limited to the amount you paid to DoryLab for the service giving rise to the claim during the 12 months before the event giving rise to liability, or USD 100 if no paid service applies.",
        ],
      },
      {
        heading: "Changes, Suspension, and Termination",
        paragraphs: [
          "We may update these Terms from time to time. Continued use of Dory after updated Terms become effective means you accept the updated Terms.",
          "We may suspend or terminate access if you violate these Terms, create risk for the service or other users, or if required by law. You may stop using Dory at any time.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these Terms can be sent to contact@getdory.dev.",
        ],
      },
    ],
  },
  {
    slug: "rules-and-policies",
    title: "Rules and Policies",
    description:
      "Operational, community, and acceptable use rules for Dory products, hosted services, documentation, and community spaces.",
    lastUpdated,
    sections: [
      {
        heading: "Purpose",
        paragraphs: [
          "These Rules and Policies describe the baseline behavior expected when using Dory products, hosted services, documentation, feedback channels, repositories, and community spaces. They supplement the Privacy Policy and Terms of Service.",
        ],
      },
      {
        heading: "Use Dory Responsibly",
        bullets: [
          "Use Dory only with systems, databases, files, and accounts that you are authorized to access.",
          "Review generated SQL, AI answers, explanations, and charts before running or sharing them.",
          "Use least-privilege database accounts where possible, especially for production systems.",
          "Back up important data and test risky changes in a safe environment before applying them to production.",
          "Follow your organization's data governance, security, retention, and incident response requirements.",
        ],
      },
      {
        heading: "Prohibited Conduct",
        bullets: [
          "Unauthorized access, credential theft, vulnerability exploitation, denial-of-service activity, malware distribution, or attempts to bypass security controls.",
          "Processing or sharing data in violation of law, privacy rights, employment obligations, customer agreements, or confidentiality duties.",
          "Harassment, threats, hate, abuse, impersonation, spam, phishing, fraud, or deceptive activity.",
          "Uploading, generating, or distributing illegal, infringing, exploitative, or harmful content.",
          "Interfering with Dory services, other users, repositories, documentation, or community channels.",
        ],
      },
      {
        heading: "Data and Security Rules",
        bullets: [
          "Do not paste production secrets, private keys, access tokens, passwords, or regulated data into public feedback, issues, discussions, or support channels.",
          "Do not submit sensitive database results to a hosted or third-party AI provider unless you have permission and have reviewed the provider's terms.",
          "Rotate credentials if they are exposed, and remove exposed secrets from public repositories or shared logs.",
          "Report suspected security issues privately rather than publicly posting exploit details.",
        ],
      },
      {
        heading: "Community and Contribution Standards",
        bullets: [
          "Be respectful, direct, and constructive when participating in discussions, issues, pull requests, support requests, or feedback forms.",
          "Keep bug reports actionable by including reproduction steps, expected behavior, actual behavior, environment details, and relevant logs without secrets.",
          "Respect maintainers' time and decisions. Repeated demands, off-topic posts, or abusive behavior may be removed.",
          "Only submit content that you have the right to contribute under the applicable project license or terms.",
        ],
      },
      {
        heading: "Enforcement",
        paragraphs: [
          "We may remove content, restrict access, suspend accounts, block traffic, report abuse, or take other action when we believe these rules are violated or when needed to protect users, DoryLab, the service, or third parties.",
          "Enforcement decisions may consider severity, risk, intent, history, and remediation. We may update these rules as the product and community evolve.",
        ],
      },
      {
        heading: "Reporting Issues",
        paragraphs: [
          "To report abuse, policy violations, or security concerns, contact contact@getdory.dev. Include enough detail for us to understand and investigate the issue, but do not include unnecessary personal data or secrets.",
        ],
      },
    ],
  },
] satisfies Policy[];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((policy) => policy.slug === slug);
}

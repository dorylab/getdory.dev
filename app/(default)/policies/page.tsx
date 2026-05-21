import LangPoliciesIndexPage, {
  generateMetadata as generateLangMetadata,
} from "../../[lang]/policies/page";

export function generateMetadata() {
  return generateLangMetadata({ params: Promise.resolve({ lang: "en" }) });
}

export default function PoliciesIndexPage() {
  return <LangPoliciesIndexPage params={Promise.resolve({ lang: "en" })} />;
}

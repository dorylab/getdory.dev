import LangForAgentsPage, {
  generateMetadata as generateLangMetadata,
} from "../../[lang]/for-agents/page";

export function generateMetadata() {
  return generateLangMetadata({ params: Promise.resolve({ lang: "en" }) });
}

export default function ForAgentsPage() {
  return <LangForAgentsPage params={Promise.resolve({ lang: "en" })} />;
}

import LangForHumansPage, {
  generateMetadata as generateLangMetadata,
} from "../../[lang]/for-humans/page";

export function generateMetadata() {
  return generateLangMetadata({ params: Promise.resolve({ lang: "en" }) });
}

export default function ForHumansPage() {
  return <LangForHumansPage params={Promise.resolve({ lang: "en" })} />;
}

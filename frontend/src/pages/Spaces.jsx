import { Link } from "react-router-dom";
import SpecsBar from "../components/SpecsBar";
import { Section, SpaceCard, Gallery } from "../components/Blocks";
import { useLang } from "../lib/i18n";
import { SPACES } from "../lib/content";

export default function Spaces() {
  const { t } = useLang();

  return (
    <>
      <Section eyebrow={t("spaces.eyebrow")} title={t("spaces.title")} lede={t("spaces.lede")}>
        <div className="cards cards--3">
          {SPACES.map((s) => (
            <SpaceCard key={s.id} space={s} />
          ))}
        </div>
      </Section>

      <SpecsBar />

      <Section tint eyebrow={t("gal.eyebrow")} title={t("gal.title")} lede={t("gal.lede")}>
        <Gallery />
        <div style={{ marginTop: 26 }}>
          <Link to="/enquire" className="btn btn--gold">
            {t("cta.visit")}
          </Link>
        </div>
      </Section>
    </>
  );
}

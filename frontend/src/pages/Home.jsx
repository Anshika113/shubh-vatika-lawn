import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SpecsBar from "../components/SpecsBar";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import PlateCalculator from "../components/PlateCalculator";
import { Section, SpaceCard, Gallery, Testimonials, Faqs, ReviewsWidget } from "../components/Blocks";
import { useLang } from "../lib/i18n";
import { SPACES } from "../lib/content";

export default function Home() {
  const { t } = useLang();

  return (
    <>
      <Hero />
      <SpecsBar />

      {/* Signature element sabse upar — buyer ka pehla sawaal yahi hai */}
      <Section id="calendar" eyebrow={t("cal.eyebrow")} title={t("cal.title")} lede={t("cal.lede")}>
        <div className="scene">
          <AvailabilityCalendar compact />
        </div>
      </Section>

      <Section tint eyebrow={t("calc.eyebrow")} title={t("calc.title")} lede={t("calc.lede")}>
        <PlateCalculator />
      </Section>

      <Section eyebrow={t("spaces.eyebrow")} title={t("spaces.title")} lede={t("spaces.lede")}>
        <div className="cards cards--3">
          {SPACES.map((s) => (
            <SpaceCard key={s.id} space={s} />
          ))}
        </div>
      </Section>

      <Section tint eyebrow={t("gal.eyebrow")} title={t("gal.title")} lede={t("gal.lede")}>
        <Gallery />
      </Section>

      <Section eyebrow={t("tst.eyebrow")} title={t("tst.title")}>
        <Testimonials />
        <div style={{ marginTop: 28 }}>
          <ReviewsWidget />
        </div>
      </Section>

      <Section tint eyebrow={t("faq.eyebrow")} title={t("faq.title")}>
        <Faqs />
        <div style={{ marginTop: 28 }}>
          <Link to="/enquire" className="btn btn--gold">
            {t("cta.visit")}
          </Link>
        </div>
      </Section>
    </>
  );
}

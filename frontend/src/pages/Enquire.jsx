import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import EnquiryForm from "../components/EnquiryForm";
import { Section, ReviewsWidget } from "../components/Blocks";
import { useLang } from "../lib/i18n";
import { VENUE } from "../lib/content";

export default function Enquire() {
  const { t, pick, lang } = useLang();
  const [params, setParams] = useSearchParams();
  const [date, setDate] = useState(params.get("date") || "");

  /* Calendar se aayi tareekh URL mein bhi rahe — link share ho sake */
  useEffect(() => {
    const next = new URLSearchParams(params);
    if (date) next.set("date", date);
    else next.delete("date");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <>
      <Section eyebrow={t("form.eyebrow")} title={t("form.title")} lede={t("form.lede")}>
        <div className="calc" style={{ gridTemplateColumns: undefined }}>
          <div className="scene">
            <AvailabilityCalendar onPick={setDate} />
          </div>
          <div>
            <EnquiryForm date={date} onDateChange={setDate} />
            <p style={{ marginTop: 16, fontSize: ".92rem", color: "var(--muted)" }}>
              {pick(VENUE.address)}
              <br />
              {pick(VENUE.hours)}
            </p>
          </div>
        </div>
      </Section>

      <Section tint eyebrow={t("reviews.eyebrow")} title={lang === "hi" ? "गूगल पर हमारी रेटिंग" : "Our rating on Google"}>
        <ReviewsWidget />
      </Section>
    </>
  );
}

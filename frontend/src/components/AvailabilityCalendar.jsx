import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang, STRINGS, formatDate } from "../lib/i18n";
import { getAvailability } from "../lib/api";
import { waLink } from "./FloatingActions";

/*
 * SIGNATURE ELEMENT.
 * Koi competitor venue apni tareekh ki uplabdhata online nahi dikhata.
 * Yahi cheez demo bechti hai.
 */

export default function AvailabilityCalendar({ onPick, compact = false }) {
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() + 1 });
  const [data, setData] = useState(null);
  const [picked, setPicked] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    setLoading(true);
    getAvailability(cursor.y, cursor.m).then((res) => {
      if (live) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      live = false;
    };
  }, [cursor.y, cursor.m]);

  const atStart =
    cursor.y === today.getFullYear() && cursor.m === today.getMonth() + 1;

  const step = (dir) => {
    setCursor((c) => {
      let m = c.m + dir;
      let y = c.y;
      if (m > 12) { m = 1; y += 1; }
      if (m < 1) { m = 12; y -= 1; }
      return { y, m };
    });
  };

  const choose = (day) => {
    if (day.status === "booked" || day.status === "past") return;
    setPicked(day);
    onPick?.(day.date);
  };

  const pad = data ? data.days[0].weekday : 0;

  return (
    <div className="cal">
      <div className="cal__bar">
        <div className="cal__month">
          {STRINGS.months[lang][cursor.m - 1]} <span className="num">{cursor.y}</span>
        </div>
        <div className="cal__nav">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label={t("cal.prev")}>
            ‹
          </button>
          <button type="button" onClick={() => step(1)} aria-label={t("cal.next")}>
            ›
          </button>
        </div>
      </div>

      <div className="cal__dow" aria-hidden="true">
        {STRINGS.dows[lang].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="cal__grid" role="grid" aria-label={t("cal.title")}>
        {Array.from({ length: pad }, (_, i) => (
          <div className="day day--pad" key={`pad-${i}`} aria-hidden="true" />
        ))}

        {loading && !data
          ? Array.from({ length: 30 }, (_, i) => <div className="day day--pad" key={`sk-${i}`} />)
          : data.days.map((d) => {
              const disabled = d.status === "booked" || d.status === "past";
              const sel = picked?.date === d.date;
              const label = `${formatDate(d.date, lang)} — ${
                d.status === "available"
                  ? t("cal.available")
                  : d.status === "tentative"
                  ? t("cal.tentative")
                  : t("cal.booked")
              }${d.muhurat ? `, ${t("cal.muhurat")}` : ""}`;
              return (
                <button
                  type="button"
                  key={d.date}
                  className={`day day--${d.status}${sel ? " day--sel" : ""}`}
                  onClick={() => choose(d)}
                  disabled={disabled}
                  aria-label={label}
                  aria-pressed={sel}
                >
                  <span className="num">{d.day}</span>
                  {d.muhurat && !disabled && <i className="day__dot" aria-hidden="true" />}
                </button>
              );
            })}
      </div>

      <div className="cal__legend">
        <span><i className="lg-a" />{t("cal.available")}</span>
        <span><i className="lg-t" />{t("cal.tentative")}</span>
        <span><i className="lg-b" />{t("cal.booked")}</span>
        <span><i className="lg-m" />{t("cal.muhurat")}</span>
      </div>

      {picked && (
        <div className="cal__picked">
          <div>
            <div className="eyebrow" style={{ margin: 0 }}>{t("cal.picked")}</div>
            <strong className="num" style={{ fontSize: "1.1rem" }}>
              {formatDate(picked.date, lang)}
            </strong>
            {picked.status === "tentative" && (
              <p style={{ fontSize: ".88rem", color: "var(--muted)", margin: "6px 0 0", maxWidth: "42ch" }}>
                {t("cal.tentativeNote")}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {compact ? (
              <button type="button" className="btn" onClick={() => navigate(`/enquire?date=${picked.date}`)}>
                {t("cta.visit")}
              </button>
            ) : null}
            <a
              className="btn btn--ghost"
              href={waLink(t("waPrefill.withDate", { date: formatDate(picked.date, lang) }))}
              target="_blank"
              rel="noreferrer"
            >
              {t("cta.whatsapp")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

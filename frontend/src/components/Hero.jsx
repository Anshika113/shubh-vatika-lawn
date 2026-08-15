import { Link } from "react-router-dom";
import { useLang } from "../lib/i18n";
import { useParallax } from "../lib/hooks";
import { VENUE } from "../lib/content";
import { waLink } from "./FloatingActions";

/* Marigold garland — hero ke upar latki hui, parallax layer */
function Garland() {
  const flowers = Array.from({ length: 34 }, (_, i) => i);
  return (
    <svg className="garland" viewBox="0 0 1200 78" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 6 Q 150 52 300 10 Q 450 -8 600 14 Q 750 44 900 8 Q 1050 -6 1200 18"
        fill="none"
        stroke="#3F5D3A"
        strokeWidth="2.5"
        opacity="0.85"
      />
      {flowers.map((i) => {
        const x = (i / (flowers.length - 1)) * 1200;
        const y = 14 + Math.sin((i / 3.4) * 1.15) * 16 + (i % 3) * 4;
        const r = 6 + (i % 4);
        return (
          <g key={i}>
            <line x1={x} y1={y - 8} x2={x} y2={y} stroke="#3F5D3A" strokeWidth="1.4" opacity="0.7" />
            <circle cx={x} cy={y + r * 0.6} r={r} fill={i % 3 === 0 ? "#7A1F3D" : "#F0A202"} opacity="0.95" />
            <circle cx={x} cy={y + r * 0.6} r={r * 0.42} fill="#FBF6EC" opacity="0.22" />
          </g>
        );
      })}
    </svg>
  );
}

export default function Hero() {
  const { t, pick } = useLang();
  const scene = useParallax(0.16);

  return (
    <section className="hero" ref={scene}>
      <div className="hero__photo" aria-hidden="true" />
      <div className="hero__wash" aria-hidden="true" />
      <Garland />

      <div className="wrap hero__in">
        <span className="hero__cap">{t("hero.cap")}</span>
        <h1>{pick(VENUE.name)}</h1>
        <p className="hero__line">
          {t("hero.line")}
          <br />
          <span className="num" style={{ color: "var(--marigold)", fontWeight: 700 }}>
            {t("hero.cap2")}
          </span>
        </p>

        <div className="hero__acts">
          <Link to="/enquire" className="btn btn--gold">
            {t("cta.checkDate")}
          </Link>
          <a href={`tel:${VENUE.phone}`} className="btn btn--light">
            {t("cta.call")} · {VENUE.phone_display}
          </a>
          <a
            href={waLink(t("waPrefill.generic"))}
            className="btn"
            target="_blank"
            rel="noreferrer"
            style={{ background: "rgba(251,246,236,.14)", border: "1px solid rgba(251,246,236,.4)" }}
          >
            {t("cta.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}

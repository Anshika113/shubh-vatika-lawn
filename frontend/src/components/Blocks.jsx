import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../lib/i18n";
import { useTilt, useReveal } from "../lib/hooks";
import { GALLERY, GALLERY_CATS, TESTIMONIALS, FAQS } from "../lib/content";

/* ------------------------------------------------------------- Space card */

export function SpaceCard({ space }) {
  const { t, pick } = useLang();
  const ref = useTilt(5, 5);

  return (
    <article className="space scene" ref={ref}>
      <div className="space__shots">
        {space.photos.slice(0, 3).map((src, i) => (
          <img key={i} src={src} alt={`${pick(space.name)} ${i + 1}`} loading="lazy" decoding="async" />
        ))}
      </div>
      <div className="space__body">
        <h3>{pick(space.name)}</h3>
        <div className="space__meta num">
          <span>{pick(space.capacity)}</span>
          <span>{pick(space.area)}</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: ".96rem" }}>{pick(space.blurb)}</p>
        <ul className="ticks">
          {pick(space.includes).map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <Link to={`/enquire?space=${space.id}`} className="btn btn--ghost">
          {t("cta.enquireThis")}
        </Link>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- Gallery */

export function Gallery() {
  const { t, pick } = useLang();
  const [cat, setCat] = useState("all");
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (!zoom) return;
    const esc = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [zoom]);

  const shown = cat === "all" ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  return (
    <>
      <div className="filters">
        {GALLERY_CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`pill${cat === c.id ? " is-on" : ""}`}
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
          >
            {pick(c.label)}
          </button>
        ))}
      </div>

      <div className="grid-gal scene">
        {shown.map((g) => (
          <button key={g.id} type="button" className="shot" onClick={() => setZoom(g)}>
            <img src={g.src} alt={pick(g.alt)} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      <p className="notice" style={{ marginTop: 16 }}>
        {t("photoNote")}
      </p>

      {zoom && (
        <button type="button" className="lightbox" onClick={() => setZoom(null)} aria-label="Close">
          <img src={zoom.src} alt={pick(zoom.alt)} />
        </button>
      )}
    </>
  );
}

/* ----------------------------------------------------------- Testimonials */

export function Testimonials() {
  const { pick } = useLang();
  return (
    <div className="cards">
      {TESTIMONIALS.map((q) => (
        <blockquote className="quote" key={q.id}>
          <p>{pick(q.text)}</p>
          <div className="quote__who">{pick(q.name)}</div>
          <div className="quote__meta">{pick(q.meta)}</div>
        </blockquote>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- FAQ */

export function Faqs() {
  const { pick } = useLang();
  return (
    <div>
      {FAQS.map((f, i) => (
        <details className="faq" key={i}>
          <summary>{pick(f.q)}</summary>
          <p>{pick(f.a)}</p>
        </details>
      ))}
    </div>
  );
}

/* -------------------------------------------------------- Google reviews */

export function ReviewsWidget() {
  const { t } = useLang();
  return (
    <div className="reviews">
      <div className="gscore">
        <b className="num">4.7</b>
        <div>
          <div className="stars" aria-hidden="true">★★★★★</div>
          <div style={{ fontSize: ".88rem", color: "var(--muted)" }}>{t("reviews.line")}</div>
        </div>
      </div>
      <p className="notice">{t("reviews.widget")}</p>
    </div>
  );
}

/* ------------------------------------------------------- Section wrapper */

export function Section({ eyebrow, title, lede, tint, children, id }) {
  const ref = useReveal();
  return (
    <section className={`section${tint ? " section--tint" : ""}`} id={id}>
      <div className="wrap reveal" ref={ref}>
        {(eyebrow || title || lede) && (
          <div className="section-head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {lede && <p className="lede" style={{ marginTop: 12 }}>{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

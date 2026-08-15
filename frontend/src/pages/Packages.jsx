import { Link } from "react-router-dom";
import PlateCalculator from "../components/PlateCalculator";
import { Section, Faqs } from "../components/Blocks";
import { useLang, formatINR } from "../lib/i18n";
import { useTilt } from "../lib/hooks";
import { PACKAGES, COMPARISON_ROWS } from "../lib/content";

function PackageCard({ pkg }) {
  const { t, pick } = useLang();
  const ref = useTilt(4, 5);

  return (
    <article className={`pkgcard scene${pkg.popular ? " pkgcard--pop" : ""}`} ref={ref}>
      <h3>
        {pick(pkg.name)}
        {pkg.popular && <span className="tag-pop">{pick(pkg.note)}</span>}
      </h3>
      <div className="pkgcard__price num">{formatINR(pkg.rental)}</div>
      <div className="pkgcard__sub">
        {t("pkgs.rentalLabel")} · {t("pkgs.perPlateFrom")}{" "}
        <strong className="num">{formatINR(pkg.plate_veg)}</strong>
      </div>

      <div className="incex">
        <div>
          <h4 style={{ color: "var(--foliage)" }}>{t("pkgs.included")}</h4>
          <ul className="inc">
            {pick(pkg.included).map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: "var(--warn)" }}>{t("pkgs.extra")}</h4>
          <ul className="exc">
            {pick(pkg.extra).map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={`/enquire?package=${pkg.id}`}
        className={`btn ${pkg.popular ? "btn--gold" : "btn--ghost"}`}
        style={{ marginTop: 20, width: "100%" }}
      >
        {t("cta.enquireThis")}
      </Link>
    </article>
  );
}

export default function Packages() {
  const { t, pick, lang } = useLang();

  return (
    <>
      <Section eyebrow={t("pkgs.eyebrow")} title={t("pkgs.title")} lede={t("pkgs.lede")}>
        <div className="cards cards--3">
          {PACKAGES.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </Section>

      <Section tint title={t("pkgs.compare")}>
        <div className="tablewrap">
          <table className="ptable">
            <thead>
              <tr>
                <th scope="col">{lang === "hi" ? "विवरण" : "Detail"}</th>
                {PACKAGES.map((p) => (
                  <th key={p.id} scope="col">
                    {pick(p.name)}
                    {p.popular && <span className="tag-pop">{pick(p.note)}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{pick(row.label)}</th>
                  {PACKAGES.map((p) => (
                    <td key={p.id} className={p.popular ? "is-pop" : ""}>
                      {pick(row.values[p.id])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow={t("calc.eyebrow")} title={t("calc.title")} lede={t("calc.lede")}>
        <PlateCalculator />
      </Section>

      <Section tint eyebrow={t("faq.eyebrow")} title={t("faq.title")}>
        <Faqs />
      </Section>
    </>
  );
}

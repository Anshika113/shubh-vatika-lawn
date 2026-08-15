import { useLang } from "../lib/i18n";
import { VENUE } from "../lib/content";

/* Developer credit — footer mein maangi gayi thi. */
const DEV_NAME = "Anshika";
const DEV_PHONE = "8604438328";

export default function Footer() {
  const { t, pick, lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div>
          <h4>{t("ftr.address")}</h4>
          {/* NAP text form mein — image mein nahi, Google padh sake */}
          <address>
            <strong>{pick(VENUE.name)}</strong>
            <br />
            {pick(VENUE.address)}
            <br />
            <a href={`tel:${VENUE.phone}`}>{VENUE.phone_display}</a>
            <br />
            <a href={`mailto:${VENUE.email}`}>{VENUE.email}</a>
          </address>

          <h4 style={{ marginTop: 22 }}>{t("ftr.hours")}</h4>
          <p>{pick(VENUE.hours)}</p>
        </div>

        <div>
          <h4>{t("ftr.reach")}</h4>
          <ul className="ftr__list">
            {VENUE.distances.map((d, i) => (
              <li key={i}>{pick(d)}</li>
            ))}
          </ul>
          <p style={{ marginTop: 18 }}>
            <a
              className="btn btn--gold"
              href={`https://www.google.com/maps/dir/?api=1&destination=${VENUE.maps_query}`}
              target="_blank"
              rel="noreferrer"
            >
              {t("ftr.directions")}
            </a>
          </p>
        </div>

        <div>
          <h4>{lang === "hi" ? "नक़्शा" : "Map"}</h4>
          <iframe
            className="ftr__map"
            title={lang === "hi" ? "स्थान का नक़्शा" : "Venue location map"}
            src={`https://www.google.com/maps?q=${VENUE.maps_query}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="wrap">
        <div className="ftr__bottom">
          <span>
            © {year} {pick(VENUE.name)}. {t("ftr.rights")}.{" "}
            <a href="/privacy" style={{ opacity: 0.8 }}>
              {t("ftr.privacy")}
            </a>
          </span>

          <span className="credit">
            {t("ftr.credit")} {DEV_NAME} —{" "}
            <a href={`tel:+91${DEV_PHONE}`} aria-label={`Call ${DEV_NAME} on ${DEV_PHONE}`}>
              {DEV_PHONE}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

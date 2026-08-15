import { Link } from "react-router-dom";
import { useLang } from "../lib/i18n";
import { VENUE } from "../lib/content";

export function waLink(text) {
  return `https://wa.me/${VENUE.whatsapp}?text=${encodeURIComponent(text)}`;
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.1-.3.2-.6 0a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4A3.4 3.4 0 0 0 6 9c0 1.5 1.1 3 1.2 3.2s2.1 3.3 5.2 4.6a17 17 0 0 0 1.7.6 4 4 0 0 0 1.9.1c.6-.1 1.8-.7 2-1.4s.2-1.3.2-1.4-.2-.2-.5-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

export default function FloatingActions() {
  const { t } = useLang();

  return (
    <>
      <a
        className="wafloat"
        href={waLink(t("waPrefill.generic"))}
        target="_blank"
        rel="noreferrer"
        aria-label={t("cta.whatsapp")}
      >
        <WaIcon />
      </a>

      {/* Mobile sticky bar — teen se zyada action nahi */}
      <nav className="sticky" aria-label="Quick actions">
        <Link to="/enquire">{t("cta.checkDate")}</Link>
        <a href={`tel:${VENUE.phone}`}>{t("cta.call")}</a>
        <a href={waLink(t("waPrefill.generic"))} target="_blank" rel="noreferrer">
          {t("cta.whatsapp")}
        </a>
      </nav>
    </>
  );
}

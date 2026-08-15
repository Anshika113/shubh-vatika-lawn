import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLang } from "../lib/i18n";
import { useStuck } from "../lib/hooks";

const LINKS = [
  { to: "/", key: "home", end: true },
  { to: "/spaces", key: "spaces" },
  { to: "/packages", key: "packages" },
  { to: "/enquire", key: "enquire" },
];

export default function Header() {
  const { t, lang, setLang } = useLang();
  const stuck = useStuck();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`hdr${stuck ? " is-stuck" : ""}`}>
      <div className="wrap hdr__in">
        <NavLink to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            ॐ
          </span>
          <span>
            <span className="brand__name">
              {lang === "hi" ? "शुभ वाटिका" : "Shubh Vatika"}
            </span>
            <br />
            <span className="brand__sub">{t("brandSub")}</span>
          </span>
        </NavLink>

        <nav className="nav nav--desktop" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              {t(`nav.${l.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="langtog" role="group" aria-label="Language / भाषा">
          <button
            type="button"
            className={lang === "hi" ? "is-on" : ""}
            onClick={() => setLang("hi")}
            aria-pressed={lang === "hi"}
          >
            हिंदी
          </button>
          <button
            type="button"
            className={lang === "en" ? "is-on" : ""}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>

        <NavLink to="/enquire" className="btn btn--gold hdr__cta">
          {t("cta.checkDate")}
        </NavLink>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>

      {open && (
        <nav id="drawer" className="drawer" aria-label="Mobile">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {t(`nav.${l.key}`)}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

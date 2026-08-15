import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang, formatINR } from "../lib/i18n";
import { useCountUp, useTilt } from "../lib/hooks";
import { getEstimate } from "../lib/api";
import { PACKAGES } from "../lib/content";

export default function PlateCalculator() {
  const { t, pick } = useLang();
  const [guests, setGuests] = useState(400);
  const [menu, setMenu] = useState("veg");
  const [pkg, setPkg] = useState("gold");
  const [est, setEst] = useState(null);
  const bill = useTilt(4, 3);

  useEffect(() => {
    let live = true;
    getEstimate(pkg, guests, menu).then((r) => live && setEst(r));
    return () => {
      live = false;
    };
  }, [pkg, guests, menu]);

  const total = useCountUp(est?.total ?? 0);
  const catering = useCountUp(est?.catering ?? 0);

  return (
    <div className="calc">
      <div>
        <div className="field">
          <label htmlFor="guests">{t("calc.guests")}</label>
          <div className="slider__val num" aria-live="polite">
            {guests.toLocaleString("en-IN")}
          </div>
          <input
            id="guests"
            className="slider"
            type="range"
            min="50"
            max="800"
            step="25"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
          <div
            className="num"
            style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", color: "var(--muted)" }}
          >
            <span>50</span>
            <span>800</span>
          </div>
        </div>

        <fieldset className="field" style={{ border: 0, padding: 0, margin: "0 0 20px" }}>
          <legend className="field__legend">{t("calc.menu")}</legend>
          <div className="pills">
            <button
              type="button"
              className={`pill${menu === "veg" ? " is-on" : ""}`}
              onClick={() => setMenu("veg")}
              aria-pressed={menu === "veg"}
            >
              {t("calc.veg")}
            </button>
            <button
              type="button"
              className={`pill${menu === "nonveg" ? " is-on" : ""}`}
              onClick={() => setMenu("nonveg")}
              aria-pressed={menu === "nonveg"}
            >
              {t("calc.nonveg")}
            </button>
          </div>
        </fieldset>

        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field__legend">{t("calc.pkg")}</legend>
          <div className="pills">
            {PACKAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`pill${pkg === p.id ? " is-on" : ""}`}
                onClick={() => setPkg(p.id)}
                aria-pressed={pkg === p.id}
              >
                {pick(p.name)}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="bill scene" ref={bill}>
        <div className="bill__row">
          <span>{t("calc.plateRate")}</span>
          <span className="num">{formatINR(est?.plate_rate ?? 0)}</span>
        </div>
        <div className="bill__row">
          <span>
            {t("calc.catering")} <span className="num">({guests})</span>
          </span>
          <span className="num">{formatINR(catering)}</span>
        </div>
        <div className="bill__row">
          <span>{t("calc.rental")}</span>
          <span className="num">{formatINR(est?.rental ?? 0)}</span>
        </div>

        <div className="bill__total">
          <span>{t("calc.total")}</span>
          <b className="num" aria-live="polite">
            {formatINR(total)}
          </b>
        </div>

        {est?.below_minimum && (
          <div className="bill__warn">{t("calc.below", { n: est.min_guests })}</div>
        )}

        <p className="bill__note">{t("calc.note")}</p>

        <Link to="/enquire" className="btn btn--gold btn--wide" style={{ marginTop: 14 }}>
          {t("cta.visit")}
        </Link>
      </div>
    </div>
  );
}

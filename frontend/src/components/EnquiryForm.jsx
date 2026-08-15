import { useState } from "react";
import { useLang, STRINGS, formatDate } from "../lib/i18n";
import { postEnquiry } from "../lib/api";
import { VENUE } from "../lib/content";
import { waLink } from "./FloatingActions";

const EVENT_KEYS = ["wedding", "reception", "engagement", "haldi", "other"];

export default function EnquiryForm({ date, onDateChange }) {
  const { t, lang } = useLang();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "",
    event_type: "wedding",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done
  const [failure, setFailure] = useState("");

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = t("form.errName");
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = t("form.errPhone");
    if (!date) e.event_date = t("form.errDate");
    if (!form.guests || Number(form.guests) < 25) e.guests = t("form.errGuests");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setFailure("");
    if (!validate()) return;
    setState("sending");
    try {
      await postEnquiry({
        name: form.name.trim(),
        phone: form.phone.replace(/\D/g, "").slice(-10),
        event_date: date,
        guests: Number(form.guests),
        event_type: form.event_type,
        message: form.message.trim(),
      });
      setState("done");
    } catch (err) {
      setState("idle");
      setFailure(err.status === 409 ? t("form.errBooked") : t("form.errSend"));
    }
  };

  if (state === "done") {
    return (
      <div className="form">
        <div className="done">
          <h3>{t("form.thanksTitle")}</h3>
          <p style={{ marginTop: 10 }}>
            {t("form.thanksBody", { phone: form.phone.replace(/\D/g, "").slice(-10) })}
          </p>
          <div className="orwa" style={{ justifyContent: "center", marginTop: 16 }}>
            <a
              className="btn"
              href={waLink(
                t("waPrefill.withDate", { date: formatDate(date, lang) })
              )}
              target="_blank"
              rel="noreferrer"
            >
              {t("form.waBtn")}
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setForm({ name: "", phone: "", guests: "", event_type: "wedding", message: "" });
                setState("idle");
              }}
            >
              {t("form.another")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const waText =
    `${t("waPrefill.withDate", { date: date ? formatDate(date, lang) : "—" })}` +
    (form.guests ? ` (${form.guests} ${lang === "hi" ? "मेहमान" : "guests"})` : "");

  return (
    <div className="form">
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">{t("form.name")}</label>
          <input
            id="f-name"
            className="input"
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="err">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="f-phone">{t("form.phone")}</label>
          <input
            id="f-phone"
            className="input num"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={set("phone")}
            autoComplete="tel"
            placeholder="98765 43210"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="err">{errors.phone}</p>}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="f-date">{t("form.date")}</label>
          <input
            id="f-date"
            className="input num"
            type="date"
            value={date || ""}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => onDateChange(e.target.value)}
            aria-invalid={!!errors.event_date}
          />
          {errors.event_date && <p className="err">{errors.event_date}</p>}
        </div>

        <div className="field">
          <label htmlFor="f-guests">{t("form.guests")}</label>
          <input
            id="f-guests"
            className="input num"
            type="number"
            inputMode="numeric"
            min="25"
            max="2000"
            value={form.guests}
            onChange={set("guests")}
            placeholder="400"
            aria-invalid={!!errors.guests}
          />
          {errors.guests && <p className="err">{errors.guests}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-type">{t("form.type")}</label>
        <select id="f-type" className="select" value={form.event_type} onChange={set("event_type")}>
          {EVENT_KEYS.map((k) => (
            <option key={k} value={k}>
              {STRINGS.form.events[k][lang]}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-msg">{t("form.message")}</label>
        <textarea id="f-msg" className="textarea" value={form.message} onChange={set("message")} />
      </div>

      {failure && <p className="err" style={{ marginBottom: 12 }}>{failure}</p>}

      <div className="orwa">
        <button type="button" className="btn" onClick={submit} disabled={state === "sending"}>
          {state === "sending" ? t("cta.sending") : t("cta.send")}
        </button>
        <span style={{ color: "var(--muted)" }}>{t("form.or")}</span>
        <a className="btn btn--ghost" href={waLink(waText)} target="_blank" rel="noreferrer">
          {t("form.waBtn")}
        </a>
        <a className="btn btn--ghost" href={`tel:${VENUE.phone}`}>
          {t("cta.call")}
        </a>
      </div>
    </div>
  );
}

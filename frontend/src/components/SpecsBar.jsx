import { useLang } from "../lib/i18n";
import { SPECS } from "../lib/content";

/* Buyer sabse pehle yahi dhoondhta hai — isliye hero ke turant neeche. */
export default function SpecsBar() {
  const { pick } = useLang();

  return (
    <section className="specs" aria-label="Venue specifications">
      <div className="specs__grid">
        {SPECS.map((s) => (
          <div className="spec" key={s.key}>
            <div className="spec__label">{pick(s.label)}</div>
            <div className="spec__val num">{s.value}</div>
            <div className="spec__unit">{pick(s.unit)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

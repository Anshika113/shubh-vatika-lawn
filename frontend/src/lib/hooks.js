import { useEffect, useRef, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scroll par section ka reveal. */
export function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Pointer ke hisaab se halka 3D tilt. Touch aur reduced-motion par band. */
export function useTilt(max = 7, lift = 6) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || window.matchMedia("(hover: none)").matches) return;

    let frame = 0;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${
          -py * max
        }deg) translate3d(0, ${-lift}px, 0)`;
      });
    };

    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max, lift]);
  return ref;
}

/* Hero ka parallax — --py CSS variable set karta hai. */
export function useParallax(strength = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900) * strength;
        el.style.setProperty("--py", `${y}px`);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return ref;
}

/* Number ko target tak count karke dikhana. */
export function useCountUp(target, duration = 500) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    if (reduced()) {
      prev.current = target;
      setVal(target);
      return;
    }
    const from = prev.current;
    const delta = target - from;
    if (delta === 0) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + delta * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

/* Sticky header ko shadow dene ke liye. */
export function useStuck(offset = 8) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return stuck;
}

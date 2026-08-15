/*
 * Har call pehle FastAPI ko try karti hai. Backend na chale to local content
 * par gir jaati hai, isliye demo kabhi khaali nahi dikhta.
 *
 * Backend zabardasti band karna ho: .env mein VITE_USE_API=false
 */

import * as C from "./content";

const USE_API = import.meta.env.VITE_USE_API !== "false";
const TIMEOUT = 2500;

let apiAlive = USE_API; // ek baar fail hua to dobara try nahi karte

async function hit(path, options) {
  if (!apiAlive) throw new Error("api off");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(path, { ...options, signal: ctrl.signal });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const err = new Error(body.detail || `HTTP ${res.status}`);
      err.status = res.status;
      err.fromServer = true;
      throw err;
    }
    return await res.json();
  } catch (e) {
    if (!e.fromServer) apiAlive = false;
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export async function getVenue() {
  try {
    return await hit("/api/venue");
  } catch {
    return { venue: C.VENUE, specs: C.SPECS };
  }
}

export async function getSpaces() {
  try {
    return await hit("/api/spaces");
  } catch {
    return C.SPACES;
  }
}

export async function getPackages() {
  try {
    return await hit("/api/packages");
  } catch {
    return { packages: C.PACKAGES, rows: C.COMPARISON_ROWS };
  }
}

export async function getGallery() {
  try {
    return await hit("/api/gallery");
  } catch {
    return { items: C.GALLERY, categories: C.GALLERY_CATS };
  }
}

export async function getTestimonials() {
  try {
    return await hit("/api/testimonials");
  } catch {
    return C.TESTIMONIALS;
  }
}

export async function getFaqs() {
  try {
    return await hit("/api/faqs");
  } catch {
    return C.FAQS;
  }
}

export async function getAvailability(year, month) {
  try {
    return await hit(`/api/availability?year=${year}&month=${month}`);
  } catch {
    return C.monthAvailability(year, month);
  }
}

export async function getEstimate(packageId, guests, menu) {
  try {
    return await hit("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ package_id: packageId, guests, menu }),
    });
  } catch {
    return C.estimate(packageId, guests, menu);
  }
}

export async function postEnquiry(payload) {
  try {
    return await hit("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // Server ne "booked" bola to woh asli error hai, usko upar bhejo.
    if (e.status === 409) throw e;
    // Backend hi nahi chal raha — demo ko rukna nahi chahiye.
    if (C.dayStatus(...payload.event_date.split("-").map(Number)) === "booked") {
      const err = new Error("booked");
      err.status = 409;
      throw err;
    }
    return { ok: true, id: Math.floor(Math.random() * 900) + 100, offline: true };
  }
}

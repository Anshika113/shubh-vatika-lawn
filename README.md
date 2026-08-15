# Shubh Vatika — Demo Site

Marriage Lawn **Theme 1 — "Shubh Din"**. React (Vite) frontend + FastAPI backend.
Demo build hai, isliye **DB connect nahi hai** — sara content in-memory data se aata hai.

---

## Chalane ka tarika

### 1. Frontend (itna hi kaafi hai demo dikhane ke liye)

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Backend band ho to bhi poori site chalti hai — `src/lib/content.js` API ka mirror hai.

### 2. Backend (optional — pitch mein "real API" dikhana ho to)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Vite ka proxy `/api` ko `127.0.0.1:8000` par bhej deta hai. Backend chalu hote hi
frontend apne aap API se data lene lagta hai.

API docs: http://localhost:8000/docs

### 3. Production build

```bash
cd frontend && npm run build      # frontend/dist ban jaata hai
```

`frontend/dist` bante hi `main.py` use khud serve karne lagta hai — yani
`uvicorn main:app --port 8000` par poori site ek hi port se chalti hai.
Sirf frontend deploy karna ho (Cloudflare Pages/Netlify) to `dist` upload kar dijiye.

---

## Folder structure

```
shubh-vatika/
├── backend/
│   ├── main.py                 FastAPI routes + dist serving
│   ├── requirements.txt
│   └── app/data.py             saara demo content (DB ki jagah)
└── frontend/
    ├── index.html              fonts + EventVenue schema
    └── src/
        ├── main.jsx, App.jsx
        ├── lib/
        │   ├── i18n.jsx        Hindi/English strings + LangProvider
        │   ├── content.js      backend data ka mirror (offline fallback)
        │   ├── api.js          API call → fail ho to content.js
        │   └── hooks.js        reveal / tilt / parallax / count-up
        ├── components/
        │   ├── Hero.jsx                 parallax + garland SVG
        │   ├── SpecsBar.jsx             hard numbers bar
        │   ├── AvailabilityCalendar.jsx ← SIGNATURE ELEMENT
        │   ├── PlateCalculator.jsx      per-plate estimate
        │   ├── EnquiryForm.jsx          5 fields + WhatsApp
        │   ├── Blocks.jsx               spaces / gallery / reviews / FAQ
        │   ├── Header.jsx, Footer.jsx, FloatingActions.jsx
        ├── pages/               Home, Spaces, Packages, Enquire
        └── styles/              global.css (tokens), components.css
```

---

## White screen wala issue — fix ho chuka hai

Footer par pahunch kar aur scroll karne se neeche safed patti, aur header par
upar scroll karne se upar safed patti — ye layout overflow nahi tha, **browser ka
rubber-band bounce** tha jo `html` ka default white background dikha deta hai.

Fix `frontend/src/styles/global.css` ke upar wale hisse mein hai, teen parton mein:

1. `overscroll-behavior: none` — `html` aur `body` dono par.
2. `html` par ek **fixed gradient** — upar ivory, neeche maroon. Jahan bounce phir
   bhi hota hai (purana iOS Safari), wahan white ki jagah brand colour dikhta hai.
3. `body { background: transparent }` — taki canvas `html` ka gradient hi le.

Ye teeno saath chahiye. Kisi ek ko hataoge to issue wapas aa jayega.

---

## 2D/3D effects kahan hain

| Jagah | Effect |
|---|---|
| Hero | photo layer ka parallax + garland ka ulta parallax (`useParallax`) |
| Calendar dates | hover par `rotateX` + lift, booked dates par striped texture |
| Space / package cards | pointer-follow tilt with perspective (`useTilt`) |
| Estimate bill | halka tilt + andar radial glow |
| Gallery | `rotateX` lift + image scale |
| Sections | scroll reveal (`useReveal`) |

Sab kuch `prefers-reduced-motion` respect karta hai — us setting par saare
transforms band ho jaate hain. Touch devices par tilt off rehta hai.

---

## Client ko dikhane se pehle badalni wali cheezein

1. **Naam** — `backend/app/data.py` aur `frontend/src/lib/content.js` mein `VENUE`.
2. **Phone/WhatsApp** — wahi dono files, `phone` aur `whatsapp`.
3. **Photos** — abhi picsum ke temporary placeholders hain. Client ke asli photos
   `public/` mein daal kar path badal dijiye (WebP mein convert karke).
4. **Availability** — abhi demo pattern hai. Asli build mein bookings table se aayega.
5. **Muhurat dates** — `data.py` ke `_MUHURAT_MMDD` mein panchang se bhar dijiye.
6. **Google reviews** — `ReviewsWidget` abhi placeholder hai, live GBP feed lagani hai.
7. **Address/NAP** — GBP se letter-to-letter match hona chahiye.

---

Design & Developed by **Anshika** — [8604438328](tel:+918604438328)

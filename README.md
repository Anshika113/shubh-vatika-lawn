# Shubh Vatika — Marriage Lawn Website

A modern, responsive and interactive website designed for **Shubh Vatika**, a marriage lawn and event venue.

The project combines a premium Indian wedding aesthetic with interactive UI elements, venue information, packages, availability, enquiry functionality and responsive design.
**Live Demo:** https://shubh-vatika-lawn.pages.dev

> **Project Type:** Event Venue / Marriage Lawn Website
> **Frontend:** React + Vite
> **Backend:** FastAPI
> **Status:** Demo / Client Presentation Build

---

## ✨ Features

* 🏛️ Premium marriage lawn landing page
* 🌸 Indian wedding-inspired visual theme
* 📱 Fully responsive design
* 🌐 Hindi / English language support
* 📅 Interactive availability calendar
* 💰 Plate-based estimate calculator
* 📝 Enquiry form
* 💬 WhatsApp enquiry integration
* 🖼️ Gallery section
* ⭐ Reviews section
* ❓ FAQ section
* 🎯 Venue spaces and packages
* ✨ Scroll reveal animations
* 🖱️ Interactive card tilt effects
* 🎨 Hero image parallax effect
* 📊 Event venue information
* ♿ `prefers-reduced-motion` support
* 📱 Touch-device optimized interactions

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript / JSX
* CSS
* React Hooks

### Backend

* Python
* FastAPI
* Uvicorn

### Frontend Architecture

The frontend includes reusable components for:

* Hero section
* Header / Footer
* Availability Calendar
* Plate Calculator
* Enquiry Form
* Venue Spaces
* Packages
* Gallery
* Reviews
* FAQ
* Floating Actions

---

## 📂 Project Structure

```text
shubh-vatika/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── app/
│       └── data.py
│
├── frontend/
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       │
│       ├── lib/
│       │   ├── i18n.jsx
│       │   ├── content.js
│       │   ├── api.js
│       │   └── hooks.js
│       │
│       ├── components/
│       │   ├── Hero.jsx
│       │   ├── SpecsBar.jsx
│       │   ├── AvailabilityCalendar.jsx
│       │   ├── PlateCalculator.jsx
│       │   ├── EnquiryForm.jsx
│       │   ├── Blocks.jsx
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   └── FloatingActions.jsx
│       │
│       ├── pages/
│       │   ├── Home
│       │   ├── Spaces
│       │   ├── Packages
│       │   └── Enquire
│       │
│       └── styles/
│           ├── global.css
│           └── components.css
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.x
* Git

---

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

The frontend can run independently using its local content fallback.

---

## 🐍 Backend Setup

The FastAPI backend is optional for the demo but can be used to demonstrate a real API architecture.

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv .venv
```

Activate it:

```bash
.venv\Scripts\activate
```

### macOS / Linux

```bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn main:app --reload --port 8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

## 🔄 Frontend + Backend

The Vite development configuration proxies `/api` requests to the FastAPI backend.

When the backend is running, the frontend can retrieve data through the API.

If the API is unavailable, the frontend uses its local content fallback.

This allows the demo to remain functional even when the backend is not running.

---

## 📦 Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

This generates:

```text
frontend/dist
```

The production build can be served through the FastAPI application.

Run:

```bash
uvicorn main:app --port 8000
```

The application can then be accessed through the backend server.

---

## 🎨 Interactive UI Effects

The website includes several interactive visual effects.

| Section               | Interaction              |
| --------------------- | ------------------------ |
| Hero                  | Image parallax           |
| Hero                  | Garland reverse parallax |
| Availability Calendar | 3D hover / lift          |
| Booked Dates          | Striped visual texture   |
| Space Cards           | Pointer-follow tilt      |
| Package Cards         | Perspective tilt         |
| Estimate Bill         | Subtle tilt + glow       |
| Gallery               | Image lift + scale       |
| Sections              | Scroll reveal            |

The interactions are designed to enhance the premium event-venue experience without compromising usability.

---

## ♿ Accessibility & Motion

The project respects the user's motion preference.

When:

```css
prefers-reduced-motion
```

is enabled, animated transforms are disabled.

Interactive tilt effects are also disabled on touch devices.

---

## 📱 Responsive Design

The website is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

The UI adapts layouts, spacing and interactive elements according to screen size.

---

## 📅 Availability System

The availability calendar is currently implemented as a **demo system**.

The current availability data is not connected to a production booking database.

For a production implementation, availability can be connected to a bookings database so that dates update dynamically based on confirmed reservations.

---

## 💰 Plate Calculator

The website includes a plate-based estimate calculator to help visitors get an approximate event cost based on the selected requirements.

This is intended as an enquiry and estimation feature rather than a payment system.

---

## 📞 Enquiry System

Visitors can submit their event requirements through the enquiry form.

The demo includes WhatsApp-based enquiry functionality to make it easier for potential customers to contact the venue.

---

## 🗄️ Current Data Architecture

This is currently a **demo build**.

The backend uses in-memory data rather than a production database.

The frontend also contains a local content mirror that works as an offline fallback.

For a production deployment, the project can be extended with:

* PostgreSQL / MySQL
* Booking management
* Admin dashboard
* Authentication
* Real-time availability
* Customer enquiry database
* Review integration
* Cloud image storage
* Production analytics

---

## ⚙️ Production Improvements

Before using this as a live client website, the following should be configured:

1. Replace demo venue information.
2. Add actual venue photographs.
3. Configure the real phone and WhatsApp number.
4. Connect availability to a booking database.
5. Add real Google Business Profile reviews.
6. Configure the actual venue address and NAP information.
7. Replace temporary placeholder images.
8. Add production environment variables.
9. Configure domain and hosting.
10. Add analytics and SEO metadata.

---

## 🔐 Environment Variables

Do **not** commit secrets or private API keys to GitHub.

Use environment variables for sensitive configuration.

Example:

```env
API_KEY=your_api_key
```

Add `.env` files to `.gitignore`.

---

## 🧪 Demo Limitations

This repository represents a **demo/client presentation build**.

The following are not production database integrations yet:

* Booking availability
* Customer database
* Live Google reviews
* Persistent enquiry storage

The application is intentionally designed so the frontend can still demonstrate the complete UI without requiring a database.

---

## 📸 Screenshots

Add project screenshots here after deployment.

Example:

```markdown
![Homepage](screenshots/homepage.png)
![Availability](screenshots/availability.png)
![Packages](screenshots/packages.png)
```

---

## 👩‍💻 Developer

**Anshika**

Designed and developed as a modern marriage lawn / event venue web experience using React, Vite and FastAPI.

---

## 📄 License

This project is intended for demonstration and portfolio purposes.

© 2026 Anshika. All rights reserved.

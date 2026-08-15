import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import Home from "./pages/Home";
import Spaces from "./pages/Spaces";
import Packages from "./pages/Packages";
import Enquire from "./pages/Enquire";
import { useLang } from "./lib/i18n";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function Privacy() {
  const { lang } = useLang();
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>{lang === "hi" ? "गोपनीयता नीति" : "Privacy policy"}</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          {lang === "hi"
            ? "पूछताछ फ़ॉर्म में दी गई जानकारी सिर्फ़ आपकी बुकिंग के सिलसिले में संपर्क करने के लिए इस्तेमाल होती है। हम आपका नंबर किसी तीसरे पक्ष को न बेचते हैं, न साझा करते हैं। जानकारी हटवाने के लिए हमें फ़ोन कर दीजिए।"
            : "Details you give in the enquiry form are used only to contact you about your booking. We do not sell or share your number with third parties. Phone us if you want your details removed."}
        </p>
      </div>
    </section>
  );
}

function NotFound() {
  const { lang } = useLang();
  return (
    <section className="section">
      <div className="wrap">
        <h1>{lang === "hi" ? "यह पृष्ठ नहीं मिला" : "Page not found"}</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          {lang === "hi" ? "मुख्य पृष्ठ पर लौट जाइए।" : "Head back to the home page."}
        </p>
        <a className="btn" href="/" style={{ marginTop: 18 }}>
          {lang === "hi" ? "मुख्य पृष्ठ" : "Home"}
        </a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <ScrollTop />
      <main id="main" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* Hindi default — is audience ke liye yahi sahi hai. */
const DEFAULT_LANG = "hi";

export const STRINGS = {
  nav: {
    home: { hi: "मुख्य पृष्ठ", en: "Home" },
    spaces: { hi: "हमारे स्थान", en: "Spaces" },
    packages: { hi: "पैकेज", en: "Packages" },
    enquire: { hi: "पूछताछ", en: "Enquire" },
  },
  brandSub: { hi: "लखनऊ", en: "Lucknow" },

  cta: {
    checkDate: { hi: "अपनी तारीख देखें", en: "Check your date" },
    call: { hi: "कॉल करें", en: "Call" },
    whatsapp: { hi: "व्हाट्सएप", en: "WhatsApp" },
    visit: { hi: "साइट विज़िट बुक करें", en: "Book a site visit" },
    seePackages: { hi: "पैकेज देखें", en: "See packages" },
    enquireThis: { hi: "इसके लिए पूछताछ करें", en: "Enquire about this" },
    send: { hi: "पूछताछ भेजें", en: "Send enquiry" },
    sending: { hi: "भेजा जा रहा है…", en: "Sending…" },
  },

  hero: {
    cap: { hi: "गोमती नगर विस्तार, लखनऊ", en: "Gomti Nagar Extension, Lucknow" },
    title: { hi: "शुभ वाटिका मैरिज लॉन", en: "Shubh Vatika Marriage Lawn" },
    line: {
      hi: "लॉन, एसी बैंक्वेट और 12 कमरे — एक ही पते पर।",
      en: "Lawn, AC banquet and 12 rooms — one address.",
    },
    cap2: { hi: "800 मेहमान तक", en: "Up to 800 guests" },
  },

  cal: {
    eyebrow: { hi: "तारीख की उपलब्धता", en: "Date availability" },
    title: { hi: "अपनी तारीख यहीं देख लीजिए", en: "Check your date right here" },
    lede: {
      hi: "शादी की बुकिंग 5–6 महीने पहले होती है। किस दिन लॉन खाली है, यह जानने के लिए फ़ोन करने की ज़रूरत नहीं। तारीख पर क्लिक कीजिए, पूछताछ फ़ॉर्म उसी तारीख के साथ खुल जाएगा।",
      en: "Weddings get booked 5–6 months ahead. You don't need to phone to find out which dates are open. Click a date and the enquiry form opens with it filled in.",
    },
    available: { hi: "उपलब्ध", en: "Available" },
    tentative: { hi: "अस्थायी होल्ड", en: "Tentative hold" },
    booked: { hi: "बुक हो चुका", en: "Booked" },
    muhurat: { hi: "शुभ मुहूर्त", en: "Auspicious muhurat" },
    picked: { hi: "चुनी गई तारीख", en: "Selected date" },
    prev: { hi: "पिछला महीना", en: "Previous month" },
    next: { hi: "अगला महीना", en: "Next month" },
    loading: { hi: "कैलेंडर लोड हो रहा है…", en: "Loading calendar…" },
    tentativeNote: {
      hi: "अस्थायी होल्ड वाली तारीख अभी भी मिल सकती है — पूछताछ भेजिए, हम 24 घंटे में बता देंगे।",
      en: "A tentative date may still be available — send an enquiry and we'll confirm within 24 hours.",
    },
  },

  calc: {
    eyebrow: { hi: "प्रति प्लेट अनुमान", en: "Per-plate estimate" },
    title: { hi: "खर्च का अंदाज़ा अभी लगाइए", en: "Work out the cost now" },
    lede: {
      hi: "मेहमानों की संख्या, खाना और पैकेज चुनिए। जो नीचे दिखेगा वही रेट है — साइट विज़िट पर बदलेगा नहीं।",
      en: "Pick guest count, menu and package. What you see below is the rate — it does not change at the site visit.",
    },
    guests: { hi: "मेहमानों की संख्या", en: "Number of guests" },
    menu: { hi: "खाना", en: "Menu" },
    veg: { hi: "शुद्ध शाकाहारी", en: "Pure veg" },
    nonveg: { hi: "मांसाहारी सहित", en: "With non-veg" },
    pkg: { hi: "पैकेज", en: "Package" },
    plateRate: { hi: "प्रति प्लेट", en: "Per plate" },
    catering: { hi: "कैटरिंग", en: "Catering" },
    rental: { hi: "लॉन किराया", en: "Venue rental" },
    total: { hi: "अनुमानित कुल", en: "Estimated total" },
    note: {
      hi: "इसमें जीएसटी शामिल नहीं है। सजावट में बदलाव पर रेट बदल सकता है — साइट विज़िट पर लिखित कोटेशन मिलेगा।",
      en: "GST not included. Decor changes can move the rate — you get a written quote at the site visit.",
    },
    below: { hi: "इस पैकेज में न्यूनतम {n} मेहमान चाहिए। कम मेहमान पर सिल्वर पैकेज सही रहेगा।", en: "This package needs a minimum of {n} guests. Below that, Silver fits better." },
  },

  specs: { eyebrow: { hi: "एक नज़र में", en: "At a glance" } },

  spaces: {
    eyebrow: { hi: "तीन स्थान", en: "Three spaces" },
    title: { hi: "लॉन, हॉल और सगाई हॉल", en: "Lawn, banquet and engagement hall" },
    lede: {
      hi: "तीनों की अलग एंट्री है। एक दिन में दो कार्यक्रम हों तो भी मेहमान आपस में नहीं टकराते।",
      en: "All three have their own entrances, so two functions on one day never collide.",
    },
    capacity: { hi: "क्षमता", en: "Capacity" },
    area: { hi: "क्षेत्रफल", en: "Area" },
    included: { hi: "इसमें शामिल", en: "What's included" },
  },

  pkgs: {
    eyebrow: { hi: "तीन पैकेज", en: "Three packages" },
    title: { hi: "क्या मिलेगा, क्या अलग से लगेगा", en: "What's included, what's extra" },
    lede: {
      hi: "नीचे साफ़ लिखा है कि किस पैकेज में क्या शामिल है और किस चीज़ का पैसा अलग लगेगा। इसी बात पर सबसे ज़्यादा झगड़े होते हैं, इसलिए पहले ही बता रहे हैं।",
      en: "Below is exactly what each package includes and what costs extra. This is where most venue disputes start, so we put it up front.",
    },
    included: { hi: "शामिल है", en: "Included" },
    extra: { hi: "अलग से", en: "Costs extra" },
    perPlateFrom: { hi: "प्रति प्लेट शुरू", en: "Per plate from" },
    rentalLabel: { hi: "लॉन किराया", en: "Venue rental" },
    compare: { hi: "तीनों की तुलना", en: "Compare all three" },
  },

  gal: {
    eyebrow: { hi: "यहाँ हुई शादियाँ", en: "Weddings held here" },
    title: { hi: "असली कार्यक्रम, असली तस्वीरें", en: "Real functions, real photos" },
    lede: { hi: "रस्म के हिसाब से छाँटिए।", en: "Filter by ceremony." },
  },

  tst: {
    eyebrow: { hi: "परिवारों की राय", en: "What families say" },
    title: { hi: "जिनकी शादी यहाँ हुई", en: "Families who booked us" },
  },

  faq: { eyebrow: { hi: "अक्सर पूछे जाने वाले सवाल", en: "Common questions" }, title: { hi: "बुकिंग से पहले यह जान लीजिए", en: "Before you book" } },

  form: {
    eyebrow: { hi: "पूछताछ", en: "Enquiry" },
    title: { hi: "साइट विज़िट का समय ले लीजिए", en: "Book a site visit" },
    lede: {
      hi: "पाँच जानकारी भरिए, हम 24 घंटे में फ़ोन करेंगे। या सीधे कॉल कर लीजिए — हम सुबह 9 से रात 9 तक उपलब्ध हैं।",
      en: "Fill five fields and we call within 24 hours. Or just phone us — we're available 9 AM to 9 PM.",
    },
    name: { hi: "आपका नाम", en: "Your name" },
    phone: { hi: "मोबाइल नंबर", en: "Mobile number" },
    date: { hi: "कार्यक्रम की तारीख", en: "Event date" },
    guests: { hi: "मेहमानों की संख्या", en: "Number of guests" },
    type: { hi: "कार्यक्रम", en: "Event type" },
    message: { hi: "कुछ और बताना हो (वैकल्पिक)", en: "Anything else (optional)" },
    or: { hi: "या", en: "or" },
    waBtn: { hi: "व्हाट्सएप पर भेजें", en: "Send on WhatsApp" },
    thanksTitle: { hi: "पूछताछ मिल गई", en: "Enquiry received" },
    thanksBody: {
      hi: "हम 24 घंटे के अंदर {phone} पर कॉल करेंगे। तब तक चाहें तो सीधे व्हाट्सएप कर लीजिए।",
      en: "We'll call {phone} within 24 hours. Until then, feel free to WhatsApp us directly.",
    },
    another: { hi: "एक और पूछताछ भेजें", en: "Send another enquiry" },
    errName: { hi: "नाम लिखिए", en: "Enter a name" },
    errPhone: { hi: "10 अंकों का मोबाइल नंबर लिखिए", en: "Enter a 10-digit mobile number" },
    errDate: { hi: "तारीख चुनिए", en: "Pick a date" },
    errGuests: { hi: "मेहमानों की संख्या लिखिए (कम से कम 25)", en: "Enter guest count (25 minimum)" },
    errBooked: { hi: "यह तारीख बुक हो चुकी है। कैलेंडर से दूसरी तारीख चुनिए।", en: "That date is booked. Pick another from the calendar." },
    errSend: { hi: "पूछताछ नहीं भेजी जा सकी। कृपया फ़ोन कर लीजिए।", en: "Could not send the enquiry. Please phone us instead." },
    events: {
      wedding: { hi: "विवाह", en: "Wedding" },
      reception: { hi: "रिसेप्शन", en: "Reception" },
      engagement: { hi: "सगाई", en: "Engagement" },
      haldi: { hi: "हल्दी / मेहंदी", en: "Haldi / Mehndi" },
      other: { hi: "अन्य", en: "Other" },
    },
  },

  reviews: {
    eyebrow: { hi: "गूगल रिव्यू", en: "Google reviews" },
    line: { hi: "218 रिव्यू, गूगल पर", en: "218 reviews on Google" },
    widget: {
      hi: "डेमो प्लेसहोल्डर — लाइव होने पर यहाँ आपकी Google Business Profile की असली रिव्यू फ़ीड लगेगी।",
      en: "Demo placeholder — the live site plugs in your real Google Business Profile review feed here.",
    },
  },

  photoNote: {
    hi: "तस्वीरें अस्थायी हैं — लाइव साइट पर आपके अपने फ़ोटो लगेंगे।",
    en: "Photos are temporary — your own photos go on the live site.",
  },

  ftr: {
    address: { hi: "पता", en: "Address" },
    hours: { hi: "खुलने का समय", en: "Hours" },
    reach: { hi: "कैसे पहुँचें", en: "Getting here" },
    directions: { hi: "रास्ता देखें", en: "Get directions" },
    privacy: { hi: "गोपनीयता नीति", en: "Privacy policy" },
    rights: { hi: "सर्वाधिकार सुरक्षित", en: "All rights reserved" },
    credit: { hi: "डिज़ाइन और डेवलपमेंट —", en: "Design & Developed by" },
  },

  waPrefill: {
    generic: { hi: "नमस्ते, मैंने आपकी वेबसाइट देखी। शुभ वाटिका के बारे में जानकारी चाहिए।", en: "Hi, I saw your website. I'd like details about Shubh Vatika." },
    withDate: { hi: "नमस्ते, मुझे {date} की उपलब्धता देखनी है — शुभ वाटिका मैरिज लॉन।", en: "Hi, I want to check availability for {date} — Shubh Vatika Marriage Lawn." },
  },

  months: {
    hi: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  dows: {
    hi: ["सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
};

const LangCtx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    const saved = window.sessionStorage?.getItem("sv-lang");
    return saved === "en" || saved === "hi" ? saved : DEFAULT_LANG;
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.sessionStorage?.setItem("sv-lang", lang);
    } catch {
      /* private mode — ignore */
    }
  }, [lang]);

  const value = useMemo(() => {
    /* t("hero.title") -> string in current language */
    const t = (path, vars) => {
      const node = path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), STRINGS);
      let out = node && typeof node === "object" ? node[lang] ?? node.en ?? path : path;
      if (vars && typeof out === "string") {
        for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, v);
      }
      return out;
    };
    /* pick({hi, en}) -> value in current language, for API content */
    const pick = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.en : obj);
    return { lang, setLang, t, pick };
  }, [lang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}

export function formatINR(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}

export function formatDate(iso, lang) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${STRINGS.months[lang][m - 1]} ${y}`;
}

/*
 * Frontend content mirror.
 *
 * Backend chalu ho to data /api se aata hai. Backend band ho (jaise Cloudflare
 * Pages par sirf frontend deploy karne par) to yeh file use hoti hai, aur site
 * bilkul waise hi chalti hai. Isliye pitch ke waqt kuch bhi toot nahi sakta.
 *
 * backend/app/data.py se yeh file match honi chahiye.
 */

export const VENUE = {
  name: { hi: "शुभ वाटिका मैरिज लॉन", en: "Shubh Vatika Marriage Lawn" },
  phone: "+919876543210",
  phone_display: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "booking@shubhvatika.example",
  address: {
    hi: "प्लॉट 14, किसान पथ, गोमती नगर विस्तार, लखनऊ, उत्तर प्रदेश 226010",
    en: "Plot 14, Kisan Path, Gomti Nagar Extension, Lucknow, Uttar Pradesh 226010",
  },
  hours: { hi: "रोज़ सुबह 9:00 – रात 9:00 (साइट विज़िट)", en: "Daily 9:00 AM – 9:00 PM (site visits)" },
  maps_query: "Gomti+Nagar+Extension+Lucknow",
  distances: [
    { hi: "चारबाग रेलवे स्टेशन — 14 किमी / 30 मिनट", en: "Charbagh Railway Station — 14 km / 30 min" },
    { hi: "लखनऊ एयरपोर्ट — 22 किमी / 45 मिनट", en: "Lucknow Airport — 22 km / 45 min" },
    { hi: "हज़रतगंज — 9 किमी / 20 मिनट", en: "Hazratganj — 9 km / 20 min" },
  ],
};

export const SPECS = [
  { key: "area", label: { hi: "लॉन क्षेत्रफल", en: "Lawn area" }, value: "18,000", unit: { hi: "वर्ग फुट", en: "sq ft" } },
  { key: "seating", label: { hi: "बैठने की क्षमता", en: "Seating capacity" }, value: "800", unit: { hi: "मेहमान", en: "guests" } },
  { key: "parking", label: { hi: "पार्किंग", en: "Parking" }, value: "150", unit: { hi: "कारें", en: "cars" } },
  { key: "ac", label: { hi: "एसी बैंक्वेट", en: "AC banquet" }, value: "350", unit: { hi: "सीट, फुल एसी", en: "seats, fully AC" } },
  { key: "rooms", label: { hi: "कमरे", en: "Rooms" }, value: "12", unit: { hi: "एसी कमरे", en: "AC rooms" } },
  { key: "kitchen", label: { hi: "किचन", en: "Kitchen" }, value: "In-house", unit: { hi: "शुद्ध शाकाहारी विकल्प", en: "pure-veg option" } },
];

const shot = (seed, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const SPACES = [
  {
    id: "lawn",
    name: { hi: "खुला लॉन", en: "Open Lawn" },
    capacity: { hi: "500–800 मेहमान", en: "500–800 guests" },
    area: { hi: "18,000 वर्ग फुट", en: "18,000 sq ft" },
    blurb: {
      hi: "बारात, फेरे और रिसेप्शन के लिए। स्टेज तीन तरफ से दिखता है, पीछे से कैटरिंग की अलग एंट्री।",
      en: "For baraat, pheras and reception. Stage is visible from three sides; catering enters from a separate gate.",
    },
    includes: {
      hi: ["स्थायी स्टेज 40x20 फुट", "जनरेटर बैकअप 125 KVA", "अलग बारात गेट", "फूलों का मंडप स्ट्रक्चर", "साउंड परमिट रात 10 बजे तक"],
      en: ["Permanent 40x20 ft stage", "125 KVA generator backup", "Separate baraat gate", "Mandap structure included", "Sound permitted till 10 PM"],
    },
    photos: [shot("sv-lawn-1"), shot("sv-lawn-2"), shot("sv-lawn-3"), shot("sv-lawn-4")],
  },
  {
    id: "banquet",
    name: { hi: "एसी बैंक्वेट हॉल", en: "AC Banquet Hall" },
    capacity: { hi: "200–350 मेहमान", en: "200–350 guests" },
    area: { hi: "6,000 वर्ग फुट", en: "6,000 sq ft" },
    blurb: {
      hi: "गर्मी और बारिश दोनों में सुरक्षित। लॉन बुकिंग के साथ बिना अतिरिक्त किराए के बैकअप हॉल मिलता है।",
      en: "Safe in both heat and rain. Comes free as a backup hall with any lawn booking.",
    },
    includes: {
      hi: ["सेंट्रल एसी, 12 टन", "पिलर-रहित हॉल", "अलग ब्राइडल रूम", "प्रोजेक्टर और स्क्रीन", "लॉन बुकिंग के साथ बैकअप मुफ़्त"],
      en: ["Central AC, 12 tonnes", "Pillar-free floor", "Separate bridal room", "Projector and screen", "Free backup with lawn booking"],
    },
    photos: [shot("sv-banquet-1"), shot("sv-banquet-2"), shot("sv-banquet-3"), shot("sv-banquet-4")],
  },
  {
    id: "engagement",
    name: { hi: "सगाई हॉल", en: "Engagement Hall" },
    capacity: { hi: "80–150 मेहमान", en: "80–150 guests" },
    area: { hi: "2,200 वर्ग फुट", en: "2,200 sq ft" },
    blurb: {
      hi: "सगाई, हल्दी, मेहंदी और तिलक जैसे छोटे कार्यक्रमों के लिए। अलग एंट्री, अलग पार्किंग।",
      en: "For engagement, haldi, mehndi and tilak. Separate entry and separate parking.",
    },
    includes: {
      hi: ["अलग प्रवेश द्वार", "30 कार पार्किंग", "छोटा पैंट्री एरिया", "एसी + लाइटिंग सेटअप", "आधे दिन की बुकिंग उपलब्ध"],
      en: ["Own entrance", "30-car parking", "Small pantry area", "AC + lighting setup", "Half-day booking available"],
    },
    photos: [shot("sv-eng-1"), shot("sv-eng-2"), shot("sv-eng-3"), shot("sv-eng-4")],
  },
];

export const PACKAGES = [
  {
    id: "silver",
    name: { hi: "सिल्वर", en: "Silver" },
    rental: 85000,
    plate_veg: 750,
    plate_nonveg: 950,
    min_guests: 200,
    note: { hi: "छोटे फंक्शन के लिए", en: "For smaller functions" },
    included: {
      hi: ["लॉन या हॉल, 8 घंटे", "बेसिक स्टेज सजावट", "12 राउंड टेबल + कुर्सियाँ", "जनरेटर बैकअप", "पार्किंग स्टाफ 2"],
      en: ["Lawn or hall, 8 hours", "Basic stage decor", "12 round tables + chairs", "Generator backup", "2 parking staff"],
    },
    extra: {
      hi: ["डीजे और साउंड", "कमरे", "फूलों की सजावट", "वेलकम ड्रिंक काउंटर"],
      en: ["DJ and sound", "Rooms", "Floral decor", "Welcome drink counter"],
    },
  },
  {
    id: "gold",
    name: { hi: "गोल्ड", en: "Gold" },
    rental: 125000,
    plate_veg: 1050,
    plate_nonveg: 1350,
    min_guests: 300,
    popular: true,
    note: { hi: "सबसे ज़्यादा बुक होने वाला", en: "Most booked" },
    included: {
      hi: ["लॉन + बैकअप हॉल, 12 घंटे", "फूलों का मंडप + स्टेज सजावट", "डीजे और साउंड सिस्टम", "4 एसी कमरे", "वेलकम ड्रिंक + 2 लाइव काउंटर", "पार्किंग स्टाफ 5"],
      en: ["Lawn + backup hall, 12 hours", "Floral mandap + stage decor", "DJ and sound system", "4 AC rooms", "Welcome drink + 2 live counters", "5 parking staff"],
    },
    extra: {
      hi: ["आतिशबाज़ी", "अतिरिक्त कमरे (₹2,500/कमरा)", "घोड़ी और बग्घी"],
      en: ["Fireworks", "Extra rooms (₹2,500/room)", "Ghodi and baggi"],
    },
  },
  {
    id: "platinum",
    name: { hi: "प्लैटिनम", en: "Platinum" },
    rental: 175000,
    plate_veg: 1450,
    plate_nonveg: 1850,
    min_guests: 400,
    note: { hi: "पूरा परिसर, पूरा दिन", en: "Whole property, full day" },
    included: {
      hi: ["पूरा परिसर, 24 घंटे", "थीम सजावट + लाइटिंग", "डीजे + लाइव बैंड 2 घंटे", "सभी 12 कमरे", "5 लाइव काउंटर + पान/चाट", "वैलेट पार्किंग", "समर्पित इवेंट मैनेजर"],
      en: ["Whole property, 24 hours", "Theme decor + lighting", "DJ + 2 hours live band", "All 12 rooms", "5 live counters + paan/chaat", "Valet parking", "Dedicated event manager"],
    },
    extra: { hi: ["आतिशबाज़ी", "फोटोग्राफी टीम"], en: ["Fireworks", "Photography team"] },
  },
];

export const COMPARISON_ROWS = [
  { key: "rental", label: { hi: "लॉन किराया", en: "Venue rental" }, values: { silver: { hi: "₹85,000", en: "₹85,000" }, gold: { hi: "₹1,25,000", en: "₹1,25,000" }, platinum: { hi: "₹1,75,000", en: "₹1,75,000" } } },
  { key: "hours", label: { hi: "समय", en: "Hours" }, values: { silver: { hi: "8 घंटे", en: "8 hours" }, gold: { hi: "12 घंटे", en: "12 hours" }, platinum: { hi: "24 घंटे", en: "24 hours" } } },
  { key: "plate_veg", label: { hi: "प्रति प्लेट — शाकाहारी", en: "Per plate — veg" }, values: { silver: { hi: "₹750", en: "₹750" }, gold: { hi: "₹1,050", en: "₹1,050" }, platinum: { hi: "₹1,450", en: "₹1,450" } } },
  { key: "plate_nonveg", label: { hi: "प्रति प्लेट — मांसाहारी", en: "Per plate — non-veg" }, values: { silver: { hi: "₹950", en: "₹950" }, gold: { hi: "₹1,350", en: "₹1,350" }, platinum: { hi: "₹1,850", en: "₹1,850" } } },
  { key: "min", label: { hi: "न्यूनतम मेहमान", en: "Minimum guests" }, values: { silver: { hi: "200", en: "200" }, gold: { hi: "300", en: "300" }, platinum: { hi: "400", en: "400" } } },
  { key: "decor", label: { hi: "सजावट", en: "Decor" }, values: { silver: { hi: "बेसिक स्टेज", en: "Basic stage" }, gold: { hi: "फूलों का मंडप + स्टेज", en: "Floral mandap + stage" }, platinum: { hi: "थीम सजावट + लाइटिंग", en: "Theme decor + lighting" } } },
  { key: "dj", label: { hi: "डीजे / साउंड", en: "DJ / sound" }, values: { silver: { hi: "नहीं", en: "No" }, gold: { hi: "शामिल", en: "Included" }, platinum: { hi: "डीजे + लाइव बैंड", en: "DJ + live band" } } },
  { key: "rooms", label: { hi: "कमरे", en: "Rooms" }, values: { silver: { hi: "नहीं", en: "No" }, gold: { hi: "4 एसी कमरे", en: "4 AC rooms" }, platinum: { hi: "सभी 12 कमरे", en: "All 12 rooms" } } },
  { key: "counters", label: { hi: "लाइव काउंटर", en: "Live counters" }, values: { silver: { hi: "नहीं", en: "No" }, gold: { hi: "2", en: "2" }, platinum: { hi: "5 + पान/चाट", en: "5 + paan/chaat" } } },
  { key: "parking", label: { hi: "पार्किंग", en: "Parking" }, values: { silver: { hi: "2 स्टाफ", en: "2 staff" }, gold: { hi: "5 स्टाफ", en: "5 staff" }, platinum: { hi: "वैलेट", en: "Valet" } } },
  { key: "manager", label: { hi: "इवेंट मैनेजर", en: "Event manager" }, values: { silver: { hi: "नहीं", en: "No" }, gold: { hi: "साझा", en: "Shared" }, platinum: { hi: "समर्पित", en: "Dedicated" } } },
];

export const GALLERY = [
  { id: 1, cat: "haldi", src: shot("sv-haldi-1", 900, 1200), alt: { hi: "हल्दी की रस्म", en: "Haldi ceremony" } },
  { id: 2, cat: "haldi", src: shot("sv-haldi-2"), alt: { hi: "हल्दी सजावट", en: "Haldi decor" } },
  { id: 3, cat: "haldi", src: shot("sv-haldi-3"), alt: { hi: "हल्दी में परिवार", en: "Family at haldi" } },
  { id: 4, cat: "sangeet", src: shot("sv-sangeet-1"), alt: { hi: "संगीत की रात", en: "Sangeet night" } },
  { id: 5, cat: "sangeet", src: shot("sv-sangeet-2", 900, 1200), alt: { hi: "संगीत स्टेज", en: "Sangeet stage" } },
  { id: 6, cat: "sangeet", src: shot("sv-sangeet-3"), alt: { hi: "डीजे सेटअप", en: "DJ setup" } },
  { id: 7, cat: "wedding", src: shot("sv-wed-1"), alt: { hi: "फेरे", en: "Pheras" } },
  { id: 8, cat: "wedding", src: shot("sv-wed-2", 900, 1200), alt: { hi: "मंडप", en: "Mandap" } },
  { id: 9, cat: "wedding", src: shot("sv-wed-3"), alt: { hi: "बारात", en: "Baraat" } },
  { id: 10, cat: "reception", src: shot("sv-rec-1"), alt: { hi: "रिसेप्शन स्टेज", en: "Reception stage" } },
  { id: 11, cat: "reception", src: shot("sv-rec-2", 900, 1200), alt: { hi: "रात की लाइटिंग", en: "Night lighting" } },
  { id: 12, cat: "reception", src: shot("sv-rec-3"), alt: { hi: "डिनर काउंटर", en: "Dinner counters" } },
];

export const GALLERY_CATS = [
  { id: "all", label: { hi: "सभी", en: "All" } },
  { id: "haldi", label: { hi: "हल्दी", en: "Haldi" } },
  { id: "sangeet", label: { hi: "संगीत", en: "Sangeet" } },
  { id: "wedding", label: { hi: "विवाह", en: "Wedding" } },
  { id: "reception", label: { hi: "रिसेप्शन", en: "Reception" } },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: { hi: "राजेश अग्रवाल", en: "Rajesh Agarwal" },
    meta: { hi: "बेटी की शादी • 22 फरवरी 2026 • 620 मेहमान", en: "Daughter's wedding • 22 Feb 2026 • 620 guests" },
    text: {
      hi: "जो रेट पहले दिन बताया, वही बिल आया। कोई छुपा हुआ चार्ज नहीं। पार्किंग में 140 गाड़ियाँ आराम से लगीं, सड़क पर एक भी नहीं खड़ी करनी पड़ी।",
      en: "The rate quoted on day one was the rate on the bill. No hidden charges. 140 cars parked inside — not one had to go on the road.",
    },
  },
  {
    id: 2,
    name: { hi: "सुनीता मिश्रा", en: "Sunita Mishra" },
    meta: { hi: "बेटे की शादी • 9 दिसंबर 2025 • 450 मेहमान", en: "Son's wedding • 9 Dec 2025 • 450 guests" },
    text: {
      hi: "दिसंबर में बारिश आ गई थी। आधे घंटे में पूरा खाना एसी हॉल में शिफ्ट हो गया, किसी मेहमान को पता भी नहीं चला।",
      en: "It rained in December. In half an hour the whole dinner moved into the AC hall — guests didn't even notice.",
    },
  },
  {
    id: 3,
    name: { hi: "मोहम्मद इरफ़ान", en: "Mohammad Irfan" },
    meta: { hi: "वलीमा • 14 नवंबर 2025 • 380 मेहमान", en: "Walima • 14 Nov 2025 • 380 guests" },
    text: {
      hi: "शाकाहारी और मांसाहारी किचन अलग रखे गए, हमने खुद जाकर देखा। यही बात हमारे लिए सबसे ज़रूरी थी।",
      en: "Veg and non-veg kitchens were kept separate — we checked ourselves. That mattered most to us.",
    },
  },
  {
    id: 4,
    name: { hi: "प्रीति सिंह", en: "Preeti Singh" },
    meta: { hi: "सगाई • 3 मार्च 2026 • 130 मेहमान", en: "Engagement • 3 Mar 2026 • 130 guests" },
    text: {
      hi: "छोटे फंक्शन के लिए अलग हॉल और अलग गेट है, इसलिए लॉन में चल रही दूसरी शादी से कोई दिक्कत नहीं हुई।",
      en: "The small hall has its own gate, so the wedding running on the lawn never interfered with us.",
    },
  },
];

export const FAQS = [
  { q: { hi: "बुकिंग के लिए कितना एडवांस देना होता है?", en: "How much advance is needed to book?" }, a: { hi: "तारीख होल्ड करने के लिए 25%। बाकी रकम कार्यक्रम से 7 दिन पहले। रसीद उसी दिन मिलती है।", en: "25% to hold the date. The balance 7 days before the event. Receipt issued the same day." } },
  { q: { hi: "क्या बाहर का कैटरर ला सकते हैं?", en: "Can we bring an outside caterer?" }, a: { hi: "हाँ, ₹300 प्रति प्लेट रॉयल्टी पर। किचन और गैस हमारा रहेगा।", en: "Yes, at ₹300 per plate royalty. Kitchen and gas stay ours." } },
  { q: { hi: "तारीख बदलनी पड़े तो?", en: "What if we need to change the date?" }, a: { hi: "कार्यक्रम से 60 दिन पहले तक एक बार तारीख बदल सकते हैं, बिना किसी शुल्क के — उपलब्धता के अनुसार।", en: "One free date change up to 60 days before the event, subject to availability." } },
  { q: { hi: "साउंड कितने बजे तक चल सकता है?", en: "Till what time is sound allowed?" }, a: { hi: "खुले लॉन में रात 10 बजे तक, एसी हॉल में रात 12 बजे तक — प्रशासन के नियम के अनुसार।", en: "Till 10 PM on the open lawn, till 12 AM in the AC hall, as per local rules." } },
];

/* ---- availability (backend/app/data.py ka JS mirror) ---- */

const BOOKED = new Set([3, 11, 12, 19, 27, 34, 41, 42, 55, 63, 70, 84, 96, 110, 121, 133, 148, 160]);
const TENTATIVE = new Set([7, 22, 31, 48, 59, 77, 90, 105, 128, 141, 155]);

const MUHURAT = new Set([
  "8-19", "8-23", "8-27",
  "9-3", "9-7", "9-14", "9-21", "9-25",
  "10-2", "10-8",
  "11-21", "11-22", "11-25", "11-30",
  "12-4", "12-5", "12-6", "12-11", "12-12",
  "1-16", "1-17", "1-22", "1-26",
  "2-2", "2-6", "2-13", "2-18", "2-20",
  "3-1", "3-5", "3-11",
  "4-14", "4-15", "4-20", "4-26",
  "5-3", "5-8", "5-15", "5-21",
  "6-4", "6-10", "6-18",
  "7-2", "7-9",
  "10-24", "10-28",
]);

const ANCHOR = Date.UTC(2026, 7, 1);
const DAY_MS = 86400000;

function todayUTC() {
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
}

export function dayStatus(y, m, d) {
  const ts = Date.UTC(y, m - 1, d);
  if (ts < todayUTC()) return "past";
  const offset = Math.round((ts - ANCHOR) / DAY_MS);
  const mod = ((offset % 173) + 173) % 173;
  const mod91 = ((offset % 91) + 91) % 91;
  if (BOOKED.has(mod) || BOOKED.has(mod91)) return "booked";
  if (TENTATIVE.has(mod)) return "tentative";
  return "available";
}

export function isMuhurat(m, d) {
  return MUHURAT.has(`${m}-${d}`);
}

export function monthAvailability(year, month) {
  const days = [];
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let d = 1; d <= last; d++) {
    const jsDow = new Date(Date.UTC(year, month - 1, d)).getUTCDay(); // 0 = Sunday
    days.push({
      date: `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      day: d,
      weekday: (jsDow + 6) % 7, // 0 = Monday
      status: dayStatus(year, month, d),
      muhurat: isMuhurat(month, d),
    });
  }
  return { year, month, days };
}

export function estimate(packageId, guests, menu) {
  const pkg = PACKAGES.find((p) => p.id === packageId) || PACKAGES[1];
  const plate = menu === "nonveg" ? pkg.plate_nonveg : pkg.plate_veg;
  const catering = plate * guests;
  return {
    package: pkg.id,
    plate_rate: plate,
    guests,
    catering,
    rental: pkg.rental,
    total: catering + pkg.rental,
    below_minimum: guests < pkg.min_guests,
    min_guests: pkg.min_guests,
  };
}

// This new structure is built around "intents"
export const chatIntents = {
  // --- CORE INTENTS (UPDATED FOR HGP) ---
  'hours': {
    message: "We're open Monday–Friday from 10:00 AM to 6:30 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays.",
    keywords: ['hour', 'hours', 'close', 'time', 'when', 'late'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'location': {
    message: "Health Guard Pharmacy is located at 33-13 Junction Blvd, Jackson Heights, NY 11372.",
    keywords: ['location', 'where', 'address', 'directions', 'find you', 'map', 'jackson heights'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'delivery': {
    message: "Yes, we offer delivery to all five boroughs of New York City (Brooklyn, Queens, Manhattan, the Bronx, and Staten Island).\n\nWe do not currently deliver outside of this area, like to California.",
    keywords: ['delivery', 'deliver', 'shipping', 'mail', 'california', 'queens', 'brooklyn', 'manhattan'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'other_location': {
    message: "Yes, our sister pharmacy is Atlantic Pharmacy, located at 1706B Atlantic Ave in Brooklyn. We are the Jackson Heights location.",
    keywords: ['another location', 'other location', 'second', 'atlantic pharmacy', 'sister', 'more locations', 'brooklyn'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'check_hours': {
    message: "", // This is dynamically generated
    keywords: ['open', 'open now', 'are you open', 'closing'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },

  // --- NEW INTENTS (FROM YOUR WEBSITE) ---
  'contact': {
    message: "You can call us at (718) 507-6800 or email us at healthguardrx@gmail.com.",
    keywords: ['phone', 'number', 'cell', 'cellphone', 'email', 'contact', 'call', 'fax'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'languages': {
    message: "Yes, our multilingual staff is here to help! We speak English, Spanish, Mandarin, and Cantonese.",
    keywords: ['language', 'languages', 'speak', 'spanish', 'mandarin', 'cantonese', 'multilingual'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'services_list': {
    message: "We offer prescriptions, delivery, Notary Public, OmniCard recharging, fax/print ($1/page), lottery, and a 10-cent photocopy machine.",
    keywords: ['service', 'services', 'what', 'offer', 'do you do', 'all services'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'transit_cards': {
    message: "We recharge OmniCards for convenient NYC transit access. We do not sell the older MetroCards.",
    keywords: ['metrocard', 'metrocards', 'omni', 'omnicard', 'omnicards', 'bus', 'train', 'subway', 'transit'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'photocopy': {
    message: "Yes, we have a self-serve photocopy machine. It costs 10 cents per page.",
    keywords: ['photocopy', 'copy', 'copying', 'how much copy', 'cost of copy'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'fax_print': {
    message: "We offer full-service fax and printing. Both start at $1.00 per page.",
    keywords: ['fax', 'print', 'printing', 'how much fax', 'how much print', 'cost of fax'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'lottery': {
    message: "Yes, we sell official lottery tickets and scratch-offs!",
    keywords: ['lottery', 'scratch-off', 'lotto', 'play'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'mission_values': {
    message: "We were founded in September 2010. Our mission is to combine clinical excellence with genuine community service. Our values are Precision, Accessibility, and Community.",
    keywords: ['mission', 'about', 'values', 'who are you', 'est', 'founded', 'since', 'vision'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },

  // --- SAFETY INTENTS (UPDATED FOR HGP) ---
  'medical_advice': {
    message: "I am only a bot and cannot give any medical advice. \n\nFor all health-related questions (like what to take for a cough), please email our pharmacists directly at healthguardrx@gmail.com or call (718) 507-6800.",
    keywords: [
      'cough', 'headache', 'fever', 'sick', 'nausea', 'medicine', 'drug',
      'what should i take', 'can i take', 'is it safe', 'side effect',
      'tylenol', 'ibuprofen', 'advil', 'medication', 'pill', 'dose'
    ],
    options: [
      { text: "Thanks, I'll contact them", next: 'end' },
      { text: "Ask a different question", next: 'init' },
    ],
  },
  'complex_pharmacy': {
    message: "For complex questions about prescriptions, refills, or insurance, it's best to speak with our pharmacy staff. \n\nPlease email us at healthguardrx@gmail.com or call (718) 507-6800.",
    keywords: ['complex', 'prescription', 'rx', 'refill', 'insurance', 'dr', 'doctor'],
    options: [
      { text: "Thanks, I'll do that", next: 'end' },
      { text: "Ask a different question", next: 'init' },
    ],
  },
  'end': {
    message: "Great! Have a wonderful day.",
    keywords: ['thanks', 'thank you', 'ok', 'bye', 'cool', 'sounds good'],
    options: [],
  },
};

// --- Main Menu Options (3 as requested) ---
export const initialOptions = [
  { text: "Are you open right now?", next: 'check_hours' },
  { text: "What's your phone number?", next: 'contact' },
  { text: "Where are you located?", next: 'location' },
];

// --- Welcome Message (UPDATED FOR HGP) ---
export const initMessage = "Hi there! I'm the Health Guard Pharmacy bot. You can type a question or use one of the options below.";

// This is the fallback message
export const unknownMessage = "Sorry, I'm just a bot and didn't understand that. Please try rephrasing, or use one of the main topics below.";
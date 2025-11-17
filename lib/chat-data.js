// This new structure is built around "intents"
export const chatIntents = {
  'hours': {
    message: "We're open Monday–Friday from 10:00 AM to 6:30 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays.",
    keywords: ['hour', 'hours', 'close', 'time', 'when', 'late'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'location': {
    message: "You can find us at 1706B Atlantic Ave, Brooklyn, NY 11213.",
    keywords: ['location', 'where', 'address', 'directions', 'find you', 'map'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'services': {
    message: "We offer prescriptions, delivery, notary services, and more. You can see our full list on our Hours & Services page.",
    // I removed 'fax', 'print', 'omni' to avoid conflicts
    keywords: ['service', 'services', 'what', 'offer', 'do you do', 'notary'], 
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'delivery': {
    message: "We offer free delivery to all five boroughs of New York City (Brooklyn, Queens, Manhattan, the Bronx, and Staten Island).\n\nWe do not currently deliver outside of this area, including to California.",
    keywords: ['delivery', 'deliver', 'shipping', 'mail', 'california', 'queens', 'brooklyn', 'manhattan'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  
  // --- NEW INTENTS YOU REQUESTED ---
  'other_location': {
    message: "Yes, our sister pharmacy is Health Guard Pharmacy. You can find more details on their own website.",
    keywords: ['another location', 'other location', 'second', 'health guard', 'sister', 'more locations'],
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

  // --- SAFETY INTENTS ---
  'medical_advice': {
    message: "I am only a bot and cannot give any medical advice. \n\nFor all health-related questions (like what to take for a cough, or about your medication), please email our pharmacists directly at AtlanticRx1@gmail.com or call us.",
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
    message: "For complex questions about prescriptions, refills, or insurance, it's best to speak with our pharmacy staff directly. \n\nPlease email us at AtlanticRx1@gmail.com.",
    keywords: ['complex', 'prescription', 'rx', 'refill', 'insurance', 'dr', 'doctor'],
    options: [
      { text: "Thanks, I'll do that", next: 'end' },
      { text: "Ask a different question", next: 'init' },
    ],
  },
  'check_hours': {
    message: "", // This will be dynamically generated
    keywords: ['open', 'open now', 'are you open', 'closing'],
    options: [
      { text: "Ask another question", next: 'init' },
    ],
  },
  'end': {
    message: "Great! Have a wonderful day.",
    keywords: ['thanks', 'thank you', 'ok', 'bye', 'cool', 'sounds good'],
    options: [],
  },
};

// --- UPDATED: Main Menu Options (Now only 3) ---
export const initialOptions = [
  { text: "Are you open right now?", next: 'check_hours' },
  { text: "Do you have another location?", next: 'other_location' },
  { text: "Where do you deliver?", next: 'delivery' },
];

// This is the welcome message
export const initMessage = "Hi there! I'm a bot and can help with general questions. You can type a question or use one of the options below.";

// This is the fallback message
export const unknownMessage = "Sorry, I'm just a bot and didn't understand that. Please try rephrasing, or use one of the main topics below.";
"use client" // This component needs to be a client component

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { 
  chatIntents, 
  initMessage, 
  unknownMessage, 
  initialOptions 
} from "@/lib/chat-data"

// --- TYPES ---
type Message = {
  sender: 'bot' | 'user'
  text: string
}
type Option = {
  text: string
  next: string
}
type Intent = {
  message: string
  keywords: string[]
  options: Option[]
}
type ChatIntents = {
  [key: string]: Intent
}

// --- NEW HELPER FUNCTION: Gets pharmacy's open status ---
const getOpenStatus = (): string => {
  // Pharmacy Hours (24-hour format)
  const hours = {
    0: null, // Sun: Closed
    1: { open: 10, close: 18.5 }, // Mon: 10:00 - 18:30
    2: { open: 10, close: 18.5 }, // Tue: 10:00 - 18:30
    3: { open: 10, close: 18.5 }, // Wed: 10:00 - 18:30
    4: { open: 10, close: 18.5 }, // Thu: 10:00 - 18:30
    5: { open: 10, close: 18.5 }, // Fri: 10:00 - 18:30
    6: { open: 10, close: 16 }, // Sat: 10:00 - 16:00
  }
  
  try {
    // Get current time in New York (Pharmacy's Timezone)
    const nyTimeStr = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    const now = new Date(nyTimeStr)
    const day = now.getDay() // 0 = Sunday, 1 = Monday, ...
    const currentHour = now.getHours() + now.getMinutes() / 60
    
    const dayHours = hours[day as keyof typeof hours]
    
    if (dayHours === null) {
      return "Sorry, we're closed today (Sunday). We open Monday at 10:00 AM."
    }
    
    if (currentHour < dayHours.open) {
      return `Sorry, we're currently closed. We open today at ${dayHours.open}:00 AM.`
    }
    
    if (currentHour >= dayHours.close) {
      const nextDay = (day + 1) % 7
      const nextOpen = nextDay === 0 ? "Monday at 10:00 AM" : "tomorrow at 10:00 AM"
      return `Sorry, we're closed for the day. We open ${nextOpen}.`
    }
    
    // If we're here, we are open!
    const closeTime = dayHours.close === 18.5 ? "6:30 PM" : `${dayHours.close}:00 PM`
    return `Yes, we're open now! We close today at ${closeTime}.`
    
  } catch (e) {
    console.error("Error getting time:", e)
    // Fallback if time logic fails
    return "Our hours are Mon-Fri (10AM-6:30PM) and Sat (10AM-4PM)."
  }
}


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: initMessage },
  ])
  const [currentOptions, setCurrentOptions] = useState<Option[]>(initialOptions)
  const [input, setInput] = useState("")
  
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Scroll to the bottom of the chat on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // --- (Smarter) Function to parse typed input ---
  const parseInput = (text: string): string => {
    const normalizedInput = text.toLowerCase().trim()
    if (!normalizedInput) return 'unknown'

    // We check 'medical_advice' and 'complex' first as they are the most sensitive
    // This is inside the parseInput function in components/Chatbot.tsx
    
    // We check 'medical_advice' and 'complex' first as they are the most sensitive
    const priorityOrder: string[] = [
      'medical_advice', 
      'complex_pharmacy',
      'check_hours',
      'delivery',
      // --- ADD YOUR NEW INTENTS HERE ---
      'other_location',
      'transit_cards',
      'photocopy',
      'fax_print',
      // --- END OF NEW INTENTS ---
      'hours', 
      'location', 
      'services', 
      'end'
    ];
    
    for (const key of priorityOrder) {
      const intent = (chatIntents as ChatIntents)[key];
      if (intent.keywords.some(keyword => normalizedInput.includes(keyword))) {
        return key; // Returns 'hours', 'location', etc.
      }
    }
    
    return 'unknown';
  }

  // --- (Upgraded) Function to process any bot response ---
  const triggerBotResponse = (stepKey: string) => {
    let responseText: string
    let responseOptions: Option[]

    if (stepKey === 'init') {
      responseText = initMessage
      responseOptions = initialOptions
    } else if (stepKey === 'unknown') {
      responseText = unknownMessage
      responseOptions = initialOptions
    } else if (stepKey === 'check_hours') {
      // --- THIS IS THE DYNAMIC PART ---
      responseText = getOpenStatus() // Call our new function!
      responseOptions = (chatIntents as ChatIntents)[stepKey].options
    } else {
      const intent = (chatIntents as ChatIntents)[stepKey];
      if (intent) {
        responseText = intent.message
        responseOptions = intent.options
      } else {
        // Fallback for 'end' or other non-intent keys
        responseText = (chatIntents as ChatIntents)['end'].message
        responseOptions = (chatIntents as ChatIntents)['end'].options
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: responseText }])
      setCurrentOptions(responseOptions)
    }, 500)
  }

  // --- Handles button clicks ---
  const handleOptionClick = (option: Option) => {
    setMessages((prev) => [...prev, { sender: 'user', text: option.text }])
    triggerBotResponse(option.next)
  }

  // --- Handles the form submit for typed questions ---
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }])
    const nextStepKey = parseInput(userMessage)
    triggerBotResponse(nextStepKey)
    setInput("") // Clear the input field
  }

  // Reset chat to initial state
  const handleRestart = () => {
    setMessages([{ sender: 'bot', text: initMessage }])
    setCurrentOptions(initialOptions)
  }

  // --- (No changes to JSX rendering below) ---
  return (
    <>
      {/* --- Chat Window --- */}
      <div
        className={`fixed bottom-24 right-4 sm:right-8 w-80 sm:w-96 h-[500px] bg-card border border-border shadow-xl rounded-lg flex flex-col transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-muted/50 border-b border-border flex-shrink-0">
          <h3 className="font-semibold text-foreground">Atlantic Pharmacy Bot</h3>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Options / Buttons */}
        <div className="p-4 border-t border-border space-y-2 flex-shrink-0">
          {currentOptions.length > 0 ? (
            currentOptions.map((opt) => (
              <button
                key={opt.next}
                onClick={() => handleOptionClick(opt)}
                className="w-full text-left p-3 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm text-foreground transition-colors"
              >
                {opt.text}
              </button>
            ))
          ) : (
            <button
              onClick={handleRestart}
              className="w-full p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Start Over
            </button>
          )}
        </div>

        {/* Text Input Form */}
        <form onSubmit={handleFormSubmit} className="p-4 border-t border-border flex items-center gap-2 flex-shrink-0">
          <input
            type="text"
    
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 w-full bg-muted border border-border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            autoComplete="off"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* --- Chat Bubble --- */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:right-8 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all active:scale-95"
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
    </>
  )
}
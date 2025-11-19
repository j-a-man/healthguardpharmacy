"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Check, Eye, Car, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// --- HELPER FUNCTIONS ---

// 1. Get the next 7 valid days (Skipping Sundays)
const getAvailableDates = () => {
  const dates = []
  const d = new Date()
  
  // Loop until we have 7 valid days
  while (dates.length < 7) {
    const dayOfWeek = d.getDay() // 0 = Sun, 6 = Sat
    
    // If it's not Sunday (0), add it
    if (dayOfWeek !== 0) {
      // Store as YYYY-MM-DD string
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      dates.push(`${year}-${month}-${day}`)
    }
    
    // Move to next day
    d.setDate(d.getDate() + 1)
  }
  return dates
}

// 2. Get Time Slots based on Day of Week
const getTimeSlotsForDate = (dateString: string) => {
  if (!dateString) return []

  // Create date object using "T00:00:00" to prevent timezone shifts
  const date = new Date(dateString + "T00:00:00")
  const dayOfWeek = date.getDay()

  // MONDAY - FRIDAY (10:00 AM - 6:30 PM)
  // Last booking taken at 6:00 PM for a 30 min slot
  const weekDaySlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ]

  // SATURDAY (10:00 AM - 4:00 PM)
  // Last booking taken at 3:00 PM (or 3:30 PM)
  const saturdaySlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM"
  ]

  if (dayOfWeek === 6) return saturdaySlots // Saturday
  if (dayOfWeek === 0) return [] // Sunday (Closed - shouldn't happen via UI but good safety)
  return weekDaySlots // Mon-Fri
}

export function BookingSection() {
  const [service, setService] = useState<"Eye Exam" | "DMV Vision Test">("Eye Exam")
  
  // Initialize dates
  const availableDates = getAvailableDates()
  const [selectedDate, setSelectedDate] = useState(availableDates[0])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  
  // Booking Data
  const [bookedSlots, setBookedSlots] = useState<{date: string, time: string}[]>([])
  
  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Load existing bookings from API on mount
  useEffect(() => {
    fetch('/api/booking')
        .then(res => res.json())
        .then(data => setBookedSlots(data.bookedSlots || []))
        .catch(err => console.error("Failed to load slots", err))
  }, [])

  // Check if a specific slot is taken in the "database"
  const isSlotTaken = (date: string, time: string) => {
    return bookedSlots.some(slot => slot.date === date && slot.time === time)
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTime) return
    setIsSubmitting(true)

    try {
        const res = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                service,
                date: selectedDate,
                time: selectedTime
            })
        })

        if (res.ok) {
            setIsSuccess(true)
            // Optimistically update local state
            setBookedSlots([...bookedSlots, { date: selectedDate, time: selectedTime }])
        } else {
            const errorData = await res.json()
            alert(errorData.message || "Sorry, that slot was just taken!")
        }
    } catch (error) {
        alert("Something went wrong. Please try again.")
    } finally {
        setIsSubmitting(false)
    }
  }

  // Get slots for the currently selected date
  const currentSlots = getTimeSlotsForDate(selectedDate)

  return (
    <section className="py-24 px-6 lg:px-12 bg-background relative overflow-hidden" id="booking">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Appointments</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-foreground">
                Book a Service
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Skip the line. Schedule your DMV Vision Test or Eye Exam today.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Selection Logic */}
            <div className="space-y-8">
                
                {/* 1. Select Service */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">1. Select Service</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => setService("Eye Exam")}
                            className={cn(
                                "p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3",
                                service === "Eye Exam" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                            )}
                        >
                            <Eye className="h-8 w-8" />
                            <span className="font-semibold">Eye Exam</span>
                        </button>
                        <button 
                            onClick={() => setService("DMV Vision Test")}
                            className={cn(
                                "p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3",
                                service === "DMV Vision Test" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                            )}
                        >
                            <Car className="h-8 w-8" />
                            <span className="font-semibold">DMV Test</span>
                        </button>
                    </div>
                </div>

                {/* 2. Select Date */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">2. Select Date</h4>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {availableDates.map((date) => {
                            // Force local time interpretation for display
                            const dObj = new Date(date + "T00:00:00")
                            const isSelected = selectedDate === date
                            
                            return (
                                <button
                                    key={date}
                                    onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                    className={cn(
                                        "flex flex-col items-center min-w-[80px] p-3 rounded-xl border transition-all",
                                        isSelected 
                                            ? "bg-foreground text-background border-foreground shadow-lg scale-105" 
                                            : "border-border hover:border-primary bg-card"
                                    )}
                                >
                                    <span className="text-xs uppercase font-bold opacity-70">
                                        {dObj.toLocaleDateString('en-US', { weekday: 'short' })}
                                    </span>
                                    <span className="text-lg font-bold">
                                        {dObj.getDate()}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                 {/* 3. Select Time */}
                 <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">3. Select Time</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {currentSlots.map((time) => {
                            const taken = isSlotTaken(selectedDate, time)
                            return (
                                <button
                                    key={time}
                                    disabled={taken}
                                    onClick={() => setSelectedTime(time)}
                                    className={cn(
                                        "py-2 px-1 rounded-lg text-sm font-medium transition-all border",
                                        taken 
                                            ? "bg-muted text-muted-foreground border-transparent cursor-not-allowed decoration-slate-500 line-through opacity-50" 
                                            : selectedTime === time 
                                                ? "bg-primary text-primary-foreground border-primary shadow-md" 
                                                : "border-border hover:border-primary hover:text-primary bg-card"
                                    )}
                                >
                                    {time}
                                </button>
                            )
                        })}
                    </div>
                    {currentSlots.length === 0 && (
                        <p className="text-sm text-muted-foreground">No available slots for this day.</p>
                    )}
                </div>

            </div>

            {/* RIGHT COLUMN: Form & Confirmation */}
            <div className="bg-card border border-border shadow-xl rounded-3xl p-8 md:p-10 sticky top-24">
                
                {isSuccess ? (
                     <div className="text-center space-y-6 py-12 animate-in zoom-in duration-500">
                        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <Check className="h-10 w-10" />
                        </div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-3xl">Booking Confirmed!</h3>
                        <p className="text-muted-foreground">
                            A confirmation email has been sent to <strong>{formData.email}</strong>.
                            <br/>See you on {new Date(selectedDate + "T00:00:00").toLocaleDateString()} at {selectedTime}.
                        </p>
                        <Button 
                            onClick={() => { 
                                setIsSuccess(false); 
                                setSelectedTime(null); 
                                setFormData({name:"", email:"", phone:""}); 
                            }} 
                            variant="outline" 
                            className="mt-4 w-full"
                        >
                            Book Another Appointment
                        </Button>
                     </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 mb-6">
                            <h4 className="font-[family-name:var(--font-playfair)] text-2xl">Complete Booking</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(selectedDate + "T00:00:00").toLocaleDateString()}</span>
                                <span className="mx-1">•</span>
                                <Clock className="h-4 w-4" />
                                <span>{selectedTime || "Select a time"}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                                <Input 
                                    required 
                                    placeholder="John Doe" 
                                    className="h-12 rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                                <Input 
                                    required 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="h-12 rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                                <Input 
                                    required 
                                    type="tel" 
                                    placeholder="(555) 123-4567" 
                                    className="h-12 rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary"
                                    value={formData.phone}
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            size="lg" 
                            disabled={!selectedTime || isSubmitting} 
                            className="w-full h-14 text-lg rounded-xl font-medium shadow-lg hover:shadow-xl transition-all mt-4"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" /> Processing...
                                </span>
                            ) : "Confirm Appointment"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            You will receive a confirmation email immediately.
                        </p>
                    </form>
                )}
            </div>

        </div>
      </div>
    </section>
  )
}
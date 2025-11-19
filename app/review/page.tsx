"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ArrowLeft, Send, Loader2 } from "lucide-react"

// !!! IMPORTANT: Replace this with your actual Google Maps Review Link !!!
const GOOGLE_REVIEW_URL = "https://www.google.com/maps/place/Health+Guard+Pharmacy/@40.7528,-73.8836,17z/"

export default function ReviewPage() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Connects to the API
  const sendEmailToPharmacy = async (starRating: number, message: string) => {
    try {
      console.log("Attempting to send email...");
      // 'keepalive: true' is CRITICAL. It tells the browser to finish this request
      // even if the user is redirected to Google Maps immediately.
      await fetch('/api/contact', {
        method: 'POST',
        keepalive: true, 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: starRating, message: message }),
      })
      console.log("Email request sent to background");
      return true
    } catch (error) {
      console.error("Background email failed", error)
      return false
    }
  }

  const handleStarClick = async (star: number) => {
    setRating(star)
    setSubmitted(false)

    // LOGIC: If 4 or 5 stars...
    if (star >= 4) {
        setIsSubmitting(true) // Show loading spinner
        
        // 1. Send email and WAIT for it to register
        await sendEmailToPharmacy(star, "High rating received! User is being redirected to Google Maps.")
        
        // 2. Redirect
        window.location.href = GOOGLE_REVIEW_URL
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Send the detailed feedback email
    await sendEmailToPharmacy(rating, feedback)
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/20 px-6 py-12">
      <div className="max-w-lg w-full space-y-8 bg-background border border-border p-8 md:p-12 rounded-xl shadow-sm text-center relative">
        
        {/* Header */}
        <div className="space-y-4">
            {/* UPDATED BACK BUTTON: Rounded, Outline, Playfair Font */}
            <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="absolute top-6 left-6 md:top-8 md:left-8 rounded-full px-4 border-muted-foreground/20 hover:border-primary/50 hover:bg-background transition-all shadow-sm"
            >
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-[family-name:var(--font-playfair)]">
                    <ArrowLeft className="h-3 w-3" /> Back
                </Link>
            </Button>

          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium mt-8">
            How did we do?
          </h1>
          <p className="text-muted-foreground">
            Your feedback helps us serve our community better.
          </p>
        </div>

        {/* Star Interactive Input */}
        <div className="flex justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={isSubmitting}
              className="transition-transform hover:scale-110 focus:outline-none disabled:opacity-50 disabled:hover:scale-100"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              <Star
                className={`h-10 w-10 transition-colors duration-200 ${
                  star <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/20"
                }`}
              />
            </button>
          ))}
        </div>

        {/* STATE 0: Loading / Redirecting (Triggered by 4-5 stars) */}
        {rating >= 4 && isSubmitting && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-4">
                <div className="flex flex-col items-center justify-center gap-3 text-green-600">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <div className="text-lg font-medium">Thank you!</div>
                    <p className="text-sm text-muted-foreground">Redirecting to Google Reviews...</p>
                </div>
           </div>
        )}

        {/* STATE 1: Negative/Neutral (1-3 Stars) -> Internal Form */}
        {rating > 0 && rating <= 3 && !submitted && (
          <form onSubmit={handleFeedbackSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 text-left">
              <label htmlFor="feedback" className="text-sm font-medium">
                We're sorry we missed the mark. Please tell us how we can improve:
              </label>
              <Textarea
                id="feedback"
                placeholder="Type your message here..."
                className="min-h-[120px] resize-none"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                    <Send className="h-4 w-4" /> Send Feedback
                </>
              )}
            </Button>
          </form>
        )}

        {/* STATE 2: Submitted Internal Form */}
        {submitted && (
            <div className="py-8 space-y-4 animate-in zoom-in duration-300">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                    <Send className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium">Thank you!</h3>
                <p className="text-muted-foreground">Your feedback has been sent to our team.</p>
            </div>
        )}

      </div>
    </main>
  )
}
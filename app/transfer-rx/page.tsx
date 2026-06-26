"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, ArrowLeft, Loader2, ShieldCheck, Mail, Globe, Clock, CheckCircle } from "lucide-react"

export default function TransferRxPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    callTime: "",
    language: "No preference",
    comments: "",
    consent: false,
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (val.length <= 300) {
      setFormData((prev) => ({ ...prev, comments: val }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.consent) {
      setErrorMessage("Please accept the consent checkbox.")
      setStatus("error")
      return
    }
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/transfer-rx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        setStatus("success")
      } else {
        setErrorMessage(data.message || "Failed to submit request.")
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setErrorMessage("An error occurred. Please try again later.")
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen pt-20 overflow-x-hidden bg-background">
      
      {/* Back to Home Button */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <Button 
          variant="outline" 
          size="sm" 
          asChild 
          className="rounded-full px-4 border-muted-foreground/20 hover:border-primary/50 hover:bg-background transition-all shadow-sm"
        >
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-[family-name:var(--font-playfair)]">
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>
        </Button>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-10 px-6 lg:px-12 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto space-y-4 z-10">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-light tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            Transfer Your Prescription
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            Switching is quick and easy. Provide your callback details and we will take care of the rest.
          </p>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both">
          <div className="bg-muted/30 border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8">
            
            {status === "success" ? (
              <div className="text-center py-12 space-y-6 max-w-md mx-auto animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <CheckCircle className="h-10 w-10 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-foreground">Request Received</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We have successfully received your callback request. A pharmacist will contact you at <strong className="text-foreground">{formData.phone}</strong> during your requested window.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setStatus("idle")
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        callTime: "",
                        language: "No preference",
                        comments: "",
                        consent: false,
                      })
                    }}
                    className="rounded-full px-6 text-sm"
                  >
                    Transfer Another RX
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full px-6 text-sm"
                  >
                    <Link href="/">
                      Go to Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2 border-b pb-4 border-border/60">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">Callback Request Information</h2>
                  <p className="text-xs text-muted-foreground">Fill in the fields below to initiate your secure transfer process.</p>
                </div>

                {/* HIPAA Info Callout */}
                <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-xl text-xs leading-relaxed text-yellow-700 dark:text-yellow-500 flex items-start gap-3">
                  <span className="text-base mt-0.5">🔒</span>
                  <div>
                    <strong className="font-semibold block mb-0.5">HIPAA Privacy Notice</strong>
                    For your privacy and security under federal guidelines, please do not write medication names or health history in this form. Our licensed pharmacist will collect all necessary prescription details securely over the phone.
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <Label htmlFor="tx-name" className="text-xs font-semibold text-foreground">Full Name *</Label>
                    <Input
                      id="tx-name"
                      required
                      className="h-10 text-sm rounded-xl placeholder:text-muted-foreground/50 border-muted-foreground/20 focus-visible:ring-primary/50 focus-visible:ring-2"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={status === "loading"}
                    />
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="tx-phone" className="text-xs font-semibold text-foreground">Phone Number *</Label>
                      <Input
                        id="tx-phone"
                        required
                        type="tel"
                        className="h-10 text-sm rounded-xl placeholder:text-muted-foreground/50 border-muted-foreground/20 focus-visible:ring-primary/50 focus-visible:ring-2"
                        placeholder="(718) 555-1234"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={status === "loading"}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="tx-email" className="text-xs font-semibold text-foreground">Email Address (Optional)</Label>
                      <Input
                        id="tx-email"
                        type="email"
                        className="h-10 text-sm rounded-xl placeholder:text-muted-foreground/50 border-muted-foreground/20 focus-visible:ring-primary/50 focus-visible:ring-2"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  {/* Best time & Language Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="tx-calltime" className="text-xs font-semibold text-foreground">Best Time to Call *</Label>
                      <select
                        id="tx-calltime"
                        required
                        className="w-full h-10 rounded-xl border border-muted-foreground/20 dark:bg-muted bg-background px-3 text-sm focus-visible:ring-primary/50 focus-visible:ring-2 outline-none"
                        value={formData.callTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, callTime: e.target.value }))}
                        disabled={status === "loading"}
                      >
                        <option value="" disabled>Select a window…</option>
                        <option value="Morning">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="Evening">Evening (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="tx-language" className="text-xs font-semibold text-foreground">Preferred Language</Label>
                      <select
                        id="tx-language"
                        className="w-full h-10 rounded-xl border border-muted-foreground/20 dark:bg-muted bg-background px-3 text-sm focus-visible:ring-primary/50 focus-visible:ring-2 outline-none"
                        value={formData.language}
                        onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                        disabled={status === "loading"}
                      >
                        <option value="No preference">No preference</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Mandarin">Mandarin</option>
                        <option value="Cantonese">Cantonese</option>
                      </select>
                    </div>
                  </div>

                  {/* Comments Field */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="tx-comments" className="text-xs font-semibold text-foreground">Additional Details / Comments (Optional)</Label>
                      <span className="text-[10px] text-muted-foreground">{formData.comments.length}/300</span>
                    </div>
                    <Textarea
                      id="tx-comments"
                      className="text-sm rounded-xl min-h-20 placeholder:text-muted-foreground/50 border-muted-foreground/20 focus-visible:ring-primary/50 focus-visible:ring-2"
                      placeholder="e.g., Transferring from Walgreens. Do not include medication names."
                      value={formData.comments}
                      onChange={handleCommentChange}
                      disabled={status === "loading"}
                    />
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="tx-consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))}
                      disabled={status === "loading"}
                      className="mt-1"
                    />
                    <Label htmlFor="tx-consent" className="text-xs leading-normal font-normal text-muted-foreground select-none cursor-pointer">
                      I understand and agree that a pharmacist will call me at the provided phone number to securely collect my prescription and health insurance information.
                    </Label>
                  </div>
                </div>

                {status === "error" && (
                  <div className="text-xs text-destructive bg-destructive/10 p-3 rounded-xl border border-destructive/20 animate-in fade-in duration-300">
                    {errorMessage || "Failed to submit request. Please verify fields and try again."}
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    disabled={status === "loading" || !formData.consent}
                    className="w-full h-12 rounded-full font-[family-name:var(--font-playfair)] text-sm tracking-wider font-semibold hover:scale-[1.01] transition-transform shadow-md"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting Request...
                      </span>
                    ) : (
                      "Request Callback"
                    )}
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">
                      Prefer to speak immediately? Call us directly at <a href="tel:7185076800" className="font-semibold text-primary hover:underline">(718) 507-6800</a>
                    </p>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* --- INFO SUMMARY CARDS --- */}
      <section className="pb-24 px-6 lg:px-12 bg-secondary/10 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-background border border-border/50 p-6 rounded-2xl flex gap-4 items-start">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Secure & HIPAA Compliant</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Your data safety is our priority. We never ask for sensitive clinical lists over the web.</p>
              </div>
            </div>

            <div className="bg-background border border-border/50 p-6 rounded-2xl flex gap-4 items-start">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Globe className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Multilingual Service</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Our pharmacists can call you in English, Spanish, Mandarin, or Cantonese for your comfort.</p>
              </div>
            </div>

            <div className="bg-background border border-border/50 p-6 rounded-2xl flex gap-4 items-start">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Fast 1-Day Turnaround</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Callback requests are reviewed and fulfilled usually within one business day.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

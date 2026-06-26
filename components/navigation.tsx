"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/pharmacy", label: "THE PHARMACY" },
  { href: "/hours-services", label: "HOURS & SERVICES" },
  { href: "/about", label: "ABOUT US" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
  const [open, setOpen] = useState(false)

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
              <span className="text-primary-foreground font-bold text-lg">HGP</span>
            </div>
            <span className="hidden sm:inline text-sm font-medium tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
              HEALTH GUARD PHARMACY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium tracking-[0.15em] transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions (Theme Toggle + Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle (Visible on both Mobile and Desktop) */}
            <ModeToggle />

            {/* Transfer RX Popover (Visible on both Mobile and Desktop) */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs font-semibold tracking-wider border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-primary dark:text-primary dark:hover:bg-primary transition-all duration-300">
                  Transfer RX
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[310px] sm:w-[400px] p-5 max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl border bg-card text-card-foreground z-50">
                {status === "success" ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">Request Received</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We have received your callback request. A pharmacist will contact you at <strong className="text-foreground">{formData.phone}</strong>.
                    </p>
                    <Button onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        callTime: "",
                        language: "No preference",
                        comments: "",
                        consent: false,
                      });
                      setOpen(false);
                    }} className="mt-2 w-full text-xs">
                      Close Window
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="space-y-1.5 border-b pb-3">
                      <h2 className="text-base font-semibold tracking-tight">Transfer Your Prescription</h2>
                      <p className="text-[11px] text-muted-foreground">Switching to us is easy - we'll handle the rest.</p>
                    </div>

                    <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-2.5 rounded-r-md text-[10px] leading-relaxed text-yellow-600 dark:text-yellow-500">
                      For your privacy, please don't include medication names or health details below. We'll call you to securely take those over the phone - usually within one business day.
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="tx-name" className="text-[11px] font-semibold">Full Name *</Label>
                        <Input
                          id="tx-name"
                          required
                          className="h-8 text-xs placeholder:text-[11px]"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="tx-phone" className="text-[11px] font-semibold">Phone Number *</Label>
                        <Input
                          id="tx-phone"
                          required
                          type="tel"
                          className="h-8 text-xs placeholder:text-[11px]"
                          placeholder="(212) 555-1234"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="tx-email" className="text-[11px] font-semibold">Email</Label>
                        <Input
                          id="tx-email"
                          type="email"
                          className="h-8 text-xs placeholder:text-[11px]"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="tx-calltime" className="text-[11px] font-semibold">Best time to call *</Label>
                          <select
                            id="tx-calltime"
                            required
                            className="w-full h-8 rounded-md border border-input dark:bg-input/30 bg-transparent px-2 text-xs shadow-xs focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-hidden"
                            value={formData.callTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, callTime: e.target.value }))}
                          >
                            <option value="" disabled>Select a time…</option>
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="tx-language" className="text-[11px] font-semibold">Preferred language</Label>
                          <select
                            id="tx-language"
                            className="w-full h-8 rounded-md border border-input dark:bg-input/30 bg-transparent px-2 text-xs shadow-xs focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-hidden"
                            value={formData.language}
                            onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                          >
                            <option value="No preference">No preference</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Mandarin">Mandarin</option>
                            <option value="Cantonese">Cantonese</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="tx-comments" className="text-[11px] font-semibold">Anything else? (optional)</Label>
                          <span className="text-[9px] text-muted-foreground">{formData.comments.length}/300</span>
                        </div>
                        <Textarea
                          id="tx-comments"
                          className="text-xs min-h-12 py-1 placeholder:text-[11px]"
                          placeholder="e.g., switching from CVS, multiple prescriptions. Please don't include medication names or health details."
                          value={formData.comments}
                          onChange={handleCommentChange}
                        />
                      </div>

                      <div className="flex items-start gap-2 pt-1">
                        <Checkbox
                          id="tx-consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))}
                        />
                        <Label htmlFor="tx-consent" className="text-[10px] leading-tight font-normal text-muted-foreground select-none cursor-pointer">
                          I understand the pharmacy will call me to securely collect my prescription information.
                        </Label>
                      </div>
                    </div>

                    {status === "error" && (
                      <div className="text-[10px] text-destructive bg-destructive/10 p-2 rounded-md">
                        {errorMessage || "Failed to submit request. Please try again."}
                      </div>
                    )}

                    <div className="space-y-3 pt-1">
                      <Button
                        type="submit"
                        disabled={status === "loading" || !formData.consent}
                        className="w-full h-9 font-semibold text-xs tracking-wider"
                      >
                        {status === "loading" ? "Submitting..." : "Request Callback"}
                      </Button>

                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground">
                          Prefer to call now? <a href="tel:6463705978" className="font-semibold text-primary hover:underline">(646) 370-5978</a>
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </PopoverContent>
            </Popover>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-in slide-in-from-top-5">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block text-sm font-medium tracking-[0.15em] transition-colors hover:text-primary py-2",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
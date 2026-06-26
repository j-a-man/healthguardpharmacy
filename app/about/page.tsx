"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, ArrowRight, MapPin, Clock, Globe, Star, MessageSquare, Heart, Shield, Users, Send, Check, Loader2 } from "lucide-react"

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setErrorMessage(data.message || "Failed to send message.")
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setErrorMessage("An error occurred. Please try again later.")
      setStatus("error")
    }
  }

  const testimonials = [
    {
      quote:
        "They are awesome! Great service and fast! I’m never in there more than 5 minutes. Way better than CVS pharmacy and always have the meds I need. Staff is so polite and helpful. They deserve 10 stars!! ⭐️",
      name: "Josie Rodríguez",
      location: "Queens, NY",
      rating: 5,
    },
    {
      quote:
        "Excellent and fast service. Accepted my out-of-state insurance. I found them online through my insurance's portal and stopped by to get at-home rapid tests. The pharmacist was super kind and I was in-and-out within 5 minutes!",
      name: "D. Johnson",
      location: "Queens, NY",
      rating: 5,
    },
    {
      quote:
        "I was in need of a face mask and it was about to pour and rain, The polite woman was quick and extremely helpful -- thank you so much",
      name: "Vikas Patel",
      location: "Queens, NY",
      rating: 5,
    },
  ]

  return (
    <main className="min-h-screen pt-20 overflow-x-hidden bg-background">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
        <div className="max-w-4xl mx-auto space-y-6 z-10">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            Providing Medicine to Patients in Jackson Heights Since 2010
          </p>
        </div>
      </section>

      {/* --- MISSION STATEMENT --- */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both">
          <div className="bg-muted/30 border border-border/50 rounded-[3rem] p-12 md:p-20 text-center space-y-10">

            <div className="space-y-4">
              <p className="text-xs tracking-[0.3em] text-primary font-bold">EST. SEPTEMBER 2010</p>
              <div className="h-px bg-primary/20 max-w-[100px] mx-auto" />
            </div>

            <div className="space-y-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground leading-tight">
                Our Mission
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                <p>
                  Health Guard Pharmacy was founded in September 2010 with a singular vision: to provide pharmaceutical
                  care that combines clinical excellence with genuine community service. We believe that
                  modern healthcare demands both technical expertise and human connection.
                </p>
                <p>
                  Our commitment extends beyond dispensing medications. We serve as trusted healthcare partners in Queens
                  and deliver to all five boroughs of New York City, offering multilingual support and services that address
                  the diverse needs of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION (Cards) --- */}
      <section className="py-24 px-6 lg:px-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">Our Values</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground">
              What Guides Us
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "PRECISION",
                description: "Every prescription filled with meticulous attention to detail and pharmaceutical accuracy.",
                icon: Shield
              },
              {
                title: "ACCESSIBILITY",
                description: "Serving Queens with multilingual support and comprehensive delivery services.",
                icon: Globe
              },
              {
                title: "COMMUNITY",
                description: "Building lasting relationships through personalized care and trusted healthcare partnerships.",
                icon: Users
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group bg-background p-8 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center space-y-6"
              >
                <div className="h-14 w-14 mx-auto bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <value.icon className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm tracking-[0.2em] font-bold text-foreground">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground leading-tight">
                What Our Customers Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our community is at the heart of everything we do.
              </p>
            </div>

            {/* Testimonials Grid with subtle hover lift */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="text-center space-y-6 p-8 rounded-3xl border border-transparent hover:border-border/50 hover:bg-muted/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400 animate-in zoom-in duration-500"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg text-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  <div>
                    <p className="font-semibold tracking-wide text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-[family-name:var(--font-playfair)] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 gap-3"
                asChild
              >
                <Link href="/review">
                  <MessageSquare className="h-5 w-5" />
                  Leave us a Review
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT INFORMATION --- */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">Get In Touch</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground">
              Contact Us
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-12">

            {/* Phone Card */}
            <div className="bg-background border border-border p-8 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300 group">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <h4 className="text-xs tracking-[0.2em] font-bold text-muted-foreground">PHONE</h4>
              <p className="text-lg font-medium text-foreground">(718) 507-6800</p>
            </div>

            {/* Email Card */}
            <div className="bg-background border border-border p-8 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300 group">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <h4 className="text-xs tracking-[0.2em] font-bold text-muted-foreground">EMAIL</h4>
              <p className="text-lg font-medium text-foreground">healthguardrx@gmail.com</p>
            </div>

            {/* Address Card */}
            <div className="bg-background border border-border p-8 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300 group">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="h-5 w-5" />
              </div>
              <h4 className="text-xs tracking-[0.2em] font-bold text-muted-foreground">ADDRESS</h4>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                33-13 Junction Blvd
                <br />
                Jackson Heights, NY 11372
              </p>
            </div>

          </div>

          {/* --- CONTACT FORM --- */}
          <div className="mt-20 max-w-xl mx-auto bg-background border border-border/80 p-8 md:p-12 rounded-[2.5rem] shadow-sm space-y-6">
            <div className="text-center space-y-2 border-b pb-4 border-border/60">
              <h4 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">Send Us A Message</h4>
              <p className="text-xs text-muted-foreground">We typically respond to inquiries within 1 business day.</p>
            </div>

            {status === "success" ? (
              <div className="text-center py-8 space-y-4 animate-in zoom-in duration-300">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Message Sent!</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Thank you for reaching out. We have sent a confirmation email to your inbox and will get back to you shortly.
                </p>
                <Button 
                  onClick={() => setStatus("idle")} 
                  variant="outline" 
                  className="rounded-full px-5 text-xs mt-2"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name" className="text-xs font-semibold">Your Name *</Label>
                  <Input
                    id="contact-name"
                    required
                    className="h-10 text-xs rounded-xl"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={status === "loading"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email" className="text-xs font-semibold">Email Address *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      className="h-10 text-xs rounded-xl"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={status === "loading"}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone" className="text-xs font-semibold">Phone Number *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      required
                      className="h-10 text-xs rounded-xl"
                      placeholder="(718) 555-1234"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message" className="text-xs font-semibold">Message *</Label>
                  <Textarea
                    id="contact-message"
                    required
                    className="min-h-28 text-xs rounded-xl"
                    placeholder="Write your question or feedback here..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" && (
                  <div className="text-xs text-destructive bg-destructive/10 p-3 rounded-xl border border-destructive/20">
                    {errorMessage || "Failed to send message. Please try again."}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-11 rounded-full font-[family-name:var(--font-playfair)] text-xs tracking-wider font-semibold"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2 justify-center">
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      <Send className="h-3 w-3" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  )
}
import { Clock, FileText, Printer, CreditCard, Ticket, Globe } from "lucide-react"

export default function HoursServicesPage() {
  return (
    <main className="min-h-screen pt-20 overflow-x-hidden bg-background">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
        <div className="max-w-4xl mx-auto space-y-6 z-10">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            Hours & Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            Comprehensive care and convenience for your daily needs.
          </p>
        </div>
      </section>

      {/* --- HOURS OF OPERATION (Floating Card) --- */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both">
          <div className="bg-card/80 backdrop-blur-sm border border-border p-12 md:p-16 text-center space-y-10 rounded-[2.5rem] shadow-2xl hover:shadow-primary/10 transition-all duration-500">
            
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                 <Clock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Open 6 Days A Week</h2>
            </div>

            <div className="space-y-8 pt-4">
              <div className="space-y-2">
                <p className="text-sm tracking-[0.15em] text-muted-foreground font-medium">MONDAY – FRIDAY</p>
                <p className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light text-foreground">
                  10:00 AM – 6:30 PM
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-xs mx-auto" />

              <div className="space-y-2">
                <p className="text-sm tracking-[0.15em] text-muted-foreground font-medium">SATURDAY</p>
                <p className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light text-foreground">
                  10:00 AM – 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">Additional Services</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Complete Convenience
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: "NOTARY PUBLIC SERVICE",
                description:
                  "Professional notary public services available during most weekdays for all your document needs.",
              },
              {
                icon: Printer,
                title: "FAX & PRINT SERVICE",
                description:
                  "Full-service fax and printing capabilities ($1 per page). Double-sided black & white photocopy self-serve machine available.",
              },
              {
                icon: CreditCard,
                title: "OMNICARDS",
                description: "Recharge Omnicards for convenient NYC transit access.",
              },
              {
                icon: Ticket,
                title: "LOTTERY & SCRATCH-OFFS",
                description: "Official lottery ticket sales and redemption services available.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-background border border-border p-8 rounded-2xl hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center text-left"
              >
                <div className="h-14 w-14 rounded-full bg-muted shrink-0 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <service.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm tracking-[0.15em] font-bold text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LANGUAGE SUPPORT --- */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-primary text-primary-foreground p-12 md:p-20 space-y-8 rounded-[3rem] shadow-2xl hover:scale-[1.01] transition-transform duration-500">
            <div className="inline-block p-4 rounded-full bg-primary-foreground/10 mb-2">
                <Globe className="h-10 w-10 mx-auto animate-pulse" />
            </div>
            
            <div className="space-y-4">
                <h2 className="text-xs font-bold tracking-[0.3em] opacity-80">MULTILINGUAL SUPPORT</h2>
                <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-light leading-tight">
                We speak English, Spanish,<br className="hidden md:block"/> Mandarin & Cantonese
                </p>
            </div>

            <p className="text-base md:text-lg tracking-wide leading-relaxed max-w-3xl mx-auto opacity-90 font-light">
              Our multilingual staff is here to serve you in your preferred language, ensuring clear communication and
              personalized care.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
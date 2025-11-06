import { Clock, FileText, Printer, CreditCard, Ticket, Globe } from "lucide-react"

export default function HoursServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Page Header */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            Hours & Services
          </h1>
          <p className="text-lg text-muted-foreground tracking-[0.05em] leading-relaxed max-w-2xl mx-auto">
            Comprehensive care and convenience for your daily needs
          </p>
        </div>
      </section>

      {/* Hours of Operation */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border p-12 md:p-16 text-center space-y-8">
            <div className="space-y-4">
              <Clock className="h-8 w-8 text-primary mx-auto" />
              <h2 className="text-xs tracking-[0.25em] text-muted-foreground">HOURS OF OPERATION</h2>
            </div>

            <div className="space-y-6 pt-8">
              <div className="space-y-2">
                <p className="text-sm tracking-[0.15em] text-muted-foreground">MONDAY – FRIDAY</p>
                <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light text-foreground">
                  10:00 AM – 6:30 PM
                </p>
              </div>

              <div className="h-px bg-border max-w-xs mx-auto" />

              <div className="space-y-2">
                <p className="text-sm tracking-[0.15em] text-muted-foreground">SATURDAY</p>
                <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light text-foreground">
                  10:00 AM – 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.25em] text-muted-foreground mb-4">ADDITIONAL SERVICES</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Complete Convenience
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
                title: "PLAY LOTTERY AND SCRATCH-OFFS",
                description: "Official lottery ticket sales and redemption services available.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border p-8 space-y-4 hover:border-primary transition-colors"
              >
                <service.icon className="h-6 w-6 text-primary" />
                <h4 className="text-sm tracking-[0.15em] font-medium text-foreground">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Support */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary text-primary-foreground p-12 md:p-16 space-y-6">
            <Globe className="h-10 w-10 mx-auto" />
            <h2 className="text-xs tracking-[0.25em]">MULTILINGUAL SUPPORT</h2>
            <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light leading-tight">
              We speak Spanish, Mandarin & Cantonese
            </p>
            <p className="text-sm tracking-[0.05em] leading-relaxed max-w-2xl mx-auto opacity-90">
              Our multilingual staff is here to serve you in your preferred language, ensuring clear communication and
              personalized care.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

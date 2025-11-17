import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

// This is your new Footer component
export function Footer() {
  return (
    <footer className="bg-muted/30 py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-foreground">
              Atlantic Pharmacy
            </h3>
            <p className="text-sm text-muted-foreground">
              Your trusted healthcare partner in Brooklyn, since 2019.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm tracking-[0.15em] font-medium text-foreground">
              QUICK LINKS
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/hours-services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Hours & Services
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact (Using info from your About page) */}
          <div className="space-y-4">
            <h4 className="text-sm tracking-[0.15em] font-medium text-foreground">
              CONTACT US
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  1706B Atlantic Ave
                  <br />
                  Brooklyn, NY 11213
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">(718) 484-2260</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">AtlanticRx1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Atlantic Pharmacy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
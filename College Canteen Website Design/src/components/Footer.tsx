import { Clock, MapPin, Phone, Mail, Shield } from "lucide-react";

interface FooterProps {
  onAdminClick?: () => void;
}

export function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer className="border-t bg-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-3">About TASTIGO</h3>
            <p className="text-sm text-muted-foreground">
              Your favorite college canteen serving delicious meals daily. Fresh, affordable, and made with love!
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@tastigo.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>College Campus, Building B</span>
              </div>
            </div>
          </div>

          {/* Timings */}
          <div>
            <h3 className="mb-3">Timings</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <div>
                  <p>Monday - Friday</p>
                  <p>8:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <div>
                  <p>Saturday - Sunday</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Access */}
          <div>
            <h3 className="mb-3">For Staff</h3>
            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Shield className="h-4 w-4" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 TASTIGO College Canteen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

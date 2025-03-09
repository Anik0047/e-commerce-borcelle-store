import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-16 px-4 sm:px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            NORDIC
          </Link>
          <p className="text-sm text-muted-foreground">
            Elevating everyday essentials through minimalist design and
            exceptional quality.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm uppercase tracking-wider mb-4">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/collections"
                className="hover:text-primary transition-colors"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                href="/featured"
                className="hover:text-primary transition-colors"
              >
                Featured
              </Link>
            </li>
            <li>
              <Link
                href="/new-arrivals"
                className="hover:text-primary transition-colors"
              >
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sm uppercase tracking-wider mb-4">
            About
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/sustainability"
                className="hover:text-primary transition-colors"
              >
                Sustainability
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sm uppercase tracking-wider mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/shipping"
                className="hover:text-primary transition-colors"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/50">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} NORDIC. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

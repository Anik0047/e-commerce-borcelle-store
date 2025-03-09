import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/product-card";
import { FeaturedProduct } from "@/components/featured-product";
import { getFeaturedProducts, getNewProducts } from "@/lib/data";
import Link from "next/link";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Collections */}

      <div id="content" className="py-24 px-4 bg-secondary/30">
        <Collections />
      </div>

      <div>
        <ProductList />
      </div>

      {/* New Arrivals */}
      {/* <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                New Arrivals
              </h2>
              <p className="text-muted-foreground mt-2">
                The latest additions to our collection.
              </p>
            </div>
            <Button variant="link" asChild className="group">
              <Link href="/products" className="flex items-center">
                View All
                <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Commitment */}
      {/* <section className="py-24 px-4 sm:px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Quality Materials</h3>
              <p className="text-primary-foreground/80">
                We source only the finest materials to ensure our products stand
                the test of time.
              </p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Sustainable Practices</h3>
              <p className="text-primary-foreground/80">
                Every product is crafted with sustainability in mind, from
                materials to packaging.
              </p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Thoughtful Design</h3>
              <p className="text-primary-foreground/80">
                We believe in design that serves a purpose, creating products
                that enhance your everyday life.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Newsletter */}
      {/* <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Join Our Community
          </h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for exclusive offers, new product
            announcements, and design inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
            <Button type="submit" className="sm:flex-shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </section> */}

      {/* <Footer /> */}
    </div>
  );
}

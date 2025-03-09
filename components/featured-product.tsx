"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface FeaturedProductProps {
  product: ProductType;
  index: number;
  className?: string;
}

export function FeaturedProduct({
  product,
  index,
  className,
}: FeaturedProductProps) {
  const isOdd = index % 2 === 1;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center opacity-0",
        className
      )}
    >
      <div className={isOdd ? "md:order-2" : ""}>
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={product.media[0]}
            alt={product.title}
            className="w-full h-full object-cover hover-scale"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded">
          New Arrival
        </div>

        <h2 className="text-3xl font-semibold tracking-tight">
          {product.title}
        </h2>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-xl font-medium">${product.price.toFixed(2)}</p>

        <div className="flex flex-col xs:flex-row gap-3">
          <Button asChild size="lg" className="group">
            <Link href={`/products/${product._id}`}>
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={`/products/${product._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

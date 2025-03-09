"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById("content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 opacity-0"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1511296265581-c2450046447d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Minimalist design"
          className="w-full h-full object-cover animate-image-rotate"
        />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Beautifully Crafted. <br />
          Thoughtfully Designed.
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto">
          Discover our collection of minimalist products that blend form and
          function to elevate your everyday experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/products">Shop Collection</Link>
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-sm font-medium animate-pulse"
        aria-label="Scroll down"
      >
        <span className="mb-2">Discover</span>
        <ChevronDown className="h-5 w-5" />
      </button>
    </section>
  );
};

export default Hero;

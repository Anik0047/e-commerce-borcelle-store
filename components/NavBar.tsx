"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Heart,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const { user } = useUser();

  const cart = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-6",
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          NORDIC
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
          >
            Shop
          </Link>
          <Link
            href="/collections"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {showSearchInput ? (
            <div className="hidden md:flex relative animate-fade-in">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[220px] h-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0"
                onClick={toggleSearchInput}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={toggleSearchInput}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {user && (
            <>
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    0
                  </span>
                </Button>
              </Link>
              <Link href="/orders">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="Orders"
                >
                  <Package className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {cart.cartItems.length}
              </span>
            </Button>
          </Link>

          {/* User Avatar - indicates logged in state */}
          <div className="border-l pl-4 border-gray-200">
            {user ? (
              <UserButton />
            ) : (
              <Link href="/sign-in">
                <p className="font-bold">Login</p>
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <nav className="flex flex-col items-center justify-center h-full space-y-8 p-4">
            <Link
              href="/"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="relative w-full max-w-xs">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 border-t border-gray-100 pt-6 w-full justify-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

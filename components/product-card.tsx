"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductCardProps {
  product: ProductType;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { id, name, price, images, new: isNew } = product;

  return (
    <div
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-out",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary/30 rounded-lg">
          {images.length > 1 ? (
            <>
              <img
                src={images[0]}
                alt={name}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                  isHovered ? "opacity-0" : "opacity-100"
                )}
              />
              <img
                src={images[1]}
                alt={`${name} - alternate view`}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            </>
          ) : (
            <img
              src={images[0]}
              alt={name}
              className="w-full h-full object-cover hover-scale"
            />
          )}

          {isNew && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="font-medium line-clamp-1">{name}</h3>
          <p className="text-muted-foreground text-sm">${price.toFixed(2)}</p>
        </div>
      </Link>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3 transform transition-transform duration-300",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}
      >
        <Button className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductSlider } from "@/components/product-slider";
import { ProductCard } from "@/components/product-card";
import { getProductById, products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { useParams } from "next/navigation";

const Product = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Related products (simple implementation - just get 4 random products excluding current one)
  const relatedProducts = products
    .filter((p) => p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  useEffect(() => {
    // Simulating product data loading
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Reset selections when product changes
      if (product) {
        setSelectedColor(product.colors[0] || "");
        setSelectedSize(product.sizes[0] || "");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [product]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    toast.success(`${product?.name} added to cart`, {
      description: `${quantity} × $${product?.price.toFixed(2)}`,
    });
  };

  const addToWishlist = () => {
    toast("Added to wishlist", {
      description: product?.name,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold">Product Not Found</h1>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="text-sm text-muted-foreground">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-foreground transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="text-foreground font-medium truncate">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>

        {/* Product details */}
        <section className="product-wrapper py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product images */}
            <div className="relative">
              {isLoading ? (
                <div className="aspect-square bg-secondary animate-pulse rounded-lg"></div>
              ) : (
                <ProductSlider
                  images={product.images}
                  productName={product.name}
                  className="aspect-square bg-secondary/30 md:sticky md:top-24"
                />
              )}
            </div>

            {/* Product info */}
            <div className="space-y-8">
              {isLoading ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 bg-secondary animate-pulse rounded"></div>
                    <div className="h-5 w-1/4 bg-secondary animate-pulse rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-secondary animate-pulse rounded"></div>
                    <div className="h-4 w-full bg-secondary animate-pulse rounded"></div>
                    <div className="h-4 w-2/3 bg-secondary animate-pulse rounded"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                      {product.name}
                    </h1>
                    <p className="text-2xl font-medium mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="text-muted-foreground">{product.description}</p>

                  {/* Color options */}
                  {product.colors.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium">
                        Color:{" "}
                        <span className="text-muted-foreground">
                          {selectedColor}
                        </span>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={cn(
                              "h-10 px-4 rounded-md border text-sm transition-all",
                              selectedColor === color
                                ? "border-primary bg-primary/5"
                                : "border-input hover:border-primary/50"
                            )}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size options */}
                  {product.sizes.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium">
                        Size:{" "}
                        <span className="text-muted-foreground">
                          {selectedSize}
                        </span>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              "h-10 w-10 rounded-md border text-sm transition-all",
                              selectedSize === size
                                ? "border-primary bg-primary/5"
                                : "border-input hover:border-primary/50"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Quantity</h3>
                    <div className="flex items-center border border-input rounded-md w-32">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center text-lg hover:bg-secondary disabled:opacity-50 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(parseInt(e.target.value) || 1)
                        }
                        min="1"
                        className="w-12 h-10 text-center border-none focus:outline-none focus:ring-0 bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center text-lg hover:bg-secondary transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button size="lg" className="flex-1" onClick={addToCart}>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="lg" onClick={addToWishlist}>
                      <Heart className="mr-2 h-5 w-5" />
                      Wishlist
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Additional info */}
                  <div className="border-t border-border pt-8 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Category</span>
                      <span className="text-sm text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">SKU</span>
                      <span className="text-sm text-muted-foreground">
                        NORD-{product.id.padStart(6, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Shipping</span>
                      <span className="text-sm text-muted-foreground">
                        Free shipping on orders over $50
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section className="product-wrapper py-16 mt-8 border-t border-border">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Product;

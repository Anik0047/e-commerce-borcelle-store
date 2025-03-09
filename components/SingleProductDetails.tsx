"use client";
import { ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProductSlider } from "./product-slider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

// Define the type for User
type UserType = {
  wishlist: string[];
};

// Define the type for ProductDetails
type ProductDetailsType = {
  _id: string;
  title: string;
  price: number;
  description: string;
  media: string[];
  colors: string[];
  sizes: string[];
  category: string;
};

const SingleProductDetails = ({
  productDetails,
}: {
  productDetails: ProductDetailsType;
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { user } = useUser();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();

      if (data && data.wishlist) {
        setSignedInUser(data);
        setIsLiked(data.wishlist.includes(productDetails._id));
      }
      setIsLoading(false);
    } catch (err) {
      console.error("[users_GET]", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    toast.success(`${productDetails?.title} added to cart`, {
      description: `${quantity} × $${productDetails?.price.toFixed(2)}`,
    });
  };

  const addToWishlist = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: productDetails._id }),
        headers: { "Content-Type": "application/json" },
      });

      const updatedUser = await res.json();
      console.log("Updated User Data:", updatedUser); // Debugging log

      if (updatedUser?.wishlist) {
        setSignedInUser(updatedUser);
        const isItemInWishlist = updatedUser.wishlist.includes(productDetails._id);
        setIsLiked(isItemInWishlist);

        // Show different toast messages based on state
        toast(isItemInWishlist ? "Added to wishlist" : "Removed from wishlist", {
          description: productDetails?.title,
        });
      }
    } catch (error) {
      console.error("[wishlist_POST]", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col mt-10">
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
                {productDetails?.title || "No title available"}

              </li>
            </ol>
          </nav>
        </div>
        {/* Product Details */}
        <section className="product-wrapper py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              <ProductSlider images={productDetails?.media || []} productName={productDetails?.title} />
            </div>
            {/* Product info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  {productDetails?.title}

                </h1>
                <p className="text-2xl font-medium mt-2">
                  ${productDetails?.price?.toFixed(2) || "0.00"}
                </p>
              </div>

              <p className="text-muted-foreground">{productDetails?.description}</p>

              {/* Color options */}
              {productDetails.colors.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">
                    Color:{" "}
                    <span className="text-muted-foreground">
                      {selectedColor}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {productDetails.colors.map((color) => (
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
              {productDetails.sizes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">
                    Size:{" "}
                    <span className="text-muted-foreground">
                      {selectedSize}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {productDetails.sizes.map((size) => (
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
                  <Heart className="mr-2 h-5 w-5" fill={`${isLiked ? "black" : "white"}`} />
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
                    {productDetails.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">SKU</span>
                  <span className="text-sm text-muted-foreground">
                    NORD-{productDetails._id.padStart(6, "0")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Shipping</span>
                  <span className="text-sm text-muted-foreground">
                    Free shipping on orders over $50
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div >
  );
};

export default SingleProductDetails;

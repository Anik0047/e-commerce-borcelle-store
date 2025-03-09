import { getProducts } from "@/lib/actions/action";
import { FeaturedProduct } from "./featured-product";

const ProductList = async () => {
  const products = await getProducts(); // Select only the first two products

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular items, carefully curated for exceptional quality
            and design.
          </p>
        </div>

        <div className="space-y-24">
          {products.map((product: ProductType, index: number) => (
            <FeaturedProduct
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;

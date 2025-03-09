
import SingleProductDetails from "@/components/SingleProductDetails";
import { getProductDetails } from "@/lib/actions/action";
import { ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react";


const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);
  return <SingleProductDetails productDetails={productDetails} />;
};

export default ProductDetails;

import ProductDetails from "@/components/sections/singleProduct/ProductDetails";
import { fetchProductBySlug } from "@/lib/server-actions/customer-actions";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (product?.error) {
    console.log(product?.error);
    throw new Error(product?.error || "Failed to fetch product");
  }

  return (
    <section>
      <div className="sectionContainer">
        {product ? <ProductDetails product={product} /> : null}
      </div>
    </section>
  );
}

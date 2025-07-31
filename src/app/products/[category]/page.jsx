import ProductList from "@/components/sections/products/ProductList";
import SeeMoreButton from "@/components/shared/SeeMoreBtn";
import { fetchProductsByCategory } from "@/lib/server-actions/customer-actions";

export default async function Page({ params, searchParams }) {
  const { category } = await params;
  const sp = await searchParams;
  const page = Number(sp?.page || 1);
  const limit = 20;
  const start = (page - 1) * limit;

  const products = await fetchProductsByCategory(category, start, limit);

  const hasMore = products?.length === limit;

  return (
    <section>
      <div className="sectionContainer">
        <h2 className="sectionTitle">{category}</h2>
        <ProductList products={products} context={"category"} />
        {hasMore && (
          <SeeMoreButton urlPart={`/products/${category}?page=${page + 1}`} />
        )}
      </div>
    </section>
  );
}

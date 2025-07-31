import React from "react";
import ProductList from "./ProductList";
import { fetchProducts } from "@/lib/server-actions/customer-actions";

import SeeMoreButton from "@/components/shared/SeeMoreBtn";

const ProductsForHomePage = async ({ sp }) => {
  const page = Number(sp?.page || 1);
  const limit = 20;
  const start = (page - 1) * limit;

  const products = await fetchProducts(start, limit);

  const hasMore = products?.length === limit;

  return (
    <div>
      <h2 className="sectionTitle">Our Bestsellers</h2>
      <ProductList products={products} context="home" />

      {hasMore && <SeeMoreButton urlPart={`/?page=${page + 1}`} />}
    </div>
  );
};

export default ProductsForHomePage;

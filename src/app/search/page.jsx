import ProductList from "@/components/sections/products/ProductList";
import SeeMoreButton from "@/components/shared/SeeMoreBtn";
import { fetchProductsByQuery } from "@/lib/server-actions/customer-actions";
import React from "react";

const page = async ({ searchParams }) => {
  const sp = await searchParams;
  const page = Number(sp?.page || 1);
  const limit = 20;
  const start = (page - 1) * limit;
  const products = await fetchProductsByQuery(sp.q, start, limit);

  const hasMore = products?.length === limit;

  return (
    <section className="pt-[95px]">
      <div className="sectionContainer">
        <h2 className="sectionTitle">results for {`'${sp.q}'`}</h2>

        <ProductList products={products} context={"search"} />

        {hasMore && (
          <SeeMoreButton urlPart={`/search?q=${sp?.q}&page=${page + 1}`} />
        )}
      </div>
    </section>
  );
};

export default page;

import { fetchCategories } from "@/lib/server-actions/customer-actions";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const categories = await fetchCategories();

  if (categories?.error) {
    return (
      <h2 className="errorMessage">
        Failed to load categories. Please try again later.
      </h2>
    );
  }

  return (
    <div className="categories">
      <h2 className="sectionTitle">Product Categories</h2>
      <div className="categoryContainer">
        {categories?.map((cat) => (
          <Link
            className="categoryLink"
            key={cat?.slug}
            href={`/products/${cat?.slug}`}
          >
            <span>{cat?.pic}</span>
            <span>{cat?.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

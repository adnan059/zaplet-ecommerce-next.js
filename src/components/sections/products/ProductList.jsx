"use client";
import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

const ProductList = ({ products, context }) => {
  const [sortBy, setSortBy] = useState("");

  // Load sort preference from localStorage on initial render
  useEffect(() => {
    const savedSort = localStorage.getItem("selectedSort");
    if (savedSort) setSortBy(savedSort);
  }, []);

  // Persist sort preference to localStorage whenever it changes
  useEffect(() => {
    if (sortBy) {
      localStorage.setItem("selectedSort", sortBy);
    }
  }, [sortBy]);

  const sortedProducts = useMemo(() => {
    if (!products || products.length < 1) return [];

    const sorted = [...products];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.discount_price - b.discount_price);
      case "price-desc":
        return sorted.sort((a, b) => b.discount_price - a.discount_price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  if (products?.error) {
    return (
      <h2 className="errorMessage">
        Failed to load products. Please try again later.
      </h2>
    );
  }

  return (
    <div className="products">
      {context !== "home" && products.length > 1 && (
        <div className="productSorting">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="productSortingSelect"
          >
            <option value="">Sort By</option>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="productList">
        {sortedProducts.length < 1 ? (
          <h2 className="item-not-found">Items Not Found</h2>
        ) : (
          sortedProducts.map((product) => (
            <ProductCard key={product?.slug} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;

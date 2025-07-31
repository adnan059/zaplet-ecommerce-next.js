"use server";

import axios from "axios";
import { baseUrl } from "../constants";

// fetch categories
export const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/categories`);

    return data;
  } catch (error) {
    return {
      error: error?.message || "Failed to fetch categories",
    };
  }
};

// fetch products for home page
export const fetchProducts = async (start, limit) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/products?_start=${start}&_limit=${limit}`
    );

    return data.sort(() => 0.5 - Math.random());
  } catch (error) {
    return { error: error?.message || "Failed to fetch products" };
  }
};

// fetch products by category

export const fetchProductsByCategory = async (category, start, limit) => {
  try {
    const { data } = await axios.get(`${baseUrl}/products`);

    const products = data?.filter(
      (product) => product?.category?.slug === category
    );

    const paginated = products?.slice(start, start + limit);

    return paginated;
  } catch (error) {
    return { error: error?.message || "Failed to fetch products" };
  }
};

// fetch products by search query
export const fetchProductsByQuery = async (query, start, limit) => {
  console.log(query);
  const query_regex = new RegExp(query, "ig");
  try {
    const { data } = await axios.get(`${baseUrl}/products`);

    const products = data?.filter(
      (product) =>
        product?.name?.match(query_regex) ||
        product?.category?.name?.match(query_regex)
    );

    const paginated = products?.slice(start, start + limit);

    return paginated;
  } catch (error) {
    return { error: error?.message || "Failed to fetch products" };
  }
};

// fetch product by slug
export const fetchProductBySlug = async (slug) => {
  try {
    const { data } = await axios.get(`${baseUrl}/products?slug=${slug}`);

    return data[0];
  } catch (error) {
    return { error: "Failed to fetch product" };
  }
};

// confirm order
export const confirmOrder = async (orderData) => {
  try {
    // 1. Confirm the order first
    const { data: savedOrder } = await axios.post(
      `${baseUrl}/orders`,
      orderData
    );

    // 2. Fetch products to update stock
    const { data: products } = await axios.get(`${baseUrl}/products`);

    // 3. Loop through each ordered item and deduct stock
    for (const item of orderData.items) {
      const product = products.find(
        (p) => p.product_code === item.product_code
      );
      if (!product) continue;

      if (item.variant_code && product.variations?.length) {
        const variantIndex = product.variations.findIndex(
          (v) => v.variant_code === item.variant_code
        );
        if (variantIndex === -1) continue;

        const updatedVariant = {
          ...product.variations[variantIndex],
          stock: Math.max(
            product.variations[variantIndex].stock - item.quantity,
            0
          ),
        };

        const updatedVariations = [...product.variations];
        updatedVariations[variantIndex] = updatedVariant;

        await axios.patch(`${baseUrl}/products/${product.id}`, {
          variations: updatedVariations,
        });
      } else {
        await axios.patch(`${baseUrl}/products/${product.id}`, {
          stock: Math.max(product.stock - item.quantity, 0),
        });
      }
    }

    return savedOrder;
  } catch (error) {
    console.error("Order confirmation failed:", error);
    throw error;
  }
};

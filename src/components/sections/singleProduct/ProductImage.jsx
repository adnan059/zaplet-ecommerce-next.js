"use client";
import { useProductStore } from "@/store/useProductStore";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const fallbackUrl = "/images/fallback.png"; // must exist in /public/images/

const ProductImage = () => {
  const { selectedProduct, selectedVariant } = useProductStore();

  if (!selectedProduct) return null;

  const variantImage = selectedVariant?.image?.trim();
  const productImage = selectedProduct?.thumbnail?.trim();
  const imageAlt = selectedProduct?.name || "product image";

  return (
    <div className="productDetailsImage">
      <Zoom>
        <div className="productDetailsImageWrapper">
          {variantImage ? (
            <img
              src={variantImage}
              alt={imageAlt}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackUrl;
              }}
            />
          ) : productImage ? (
            <img
              src={productImage}
              alt={imageAlt}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackUrl;
              }}
            />
          ) : (
            <img src={fallbackUrl} alt="fallback image" />
          )}
        </div>
      </Zoom>
    </div>
  );
};

export default ProductImage;

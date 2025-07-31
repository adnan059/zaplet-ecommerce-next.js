"use client";
import { useProductStore } from "@/store/useProductStore";
import React, { useEffect } from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import SelectVariant from "./SelectVariant";
import QuantitySelector from "./QuantitySelector";
import { useOrderStore } from "@/store/useOrderStore";

const ProductDetails = ({ product }) => {
  const { selectedProduct, setSelectedProduct, clearSelectedProduct } =
    useProductStore();

  const { orderDetails } = useOrderStore();

  console.log(orderDetails);

  useEffect(() => {
    if (product && product.slug !== selectedProduct?.slug) {
      setSelectedProduct(product);
    }

    return () => clearSelectedProduct();
  }, [product]);

  return (
    <div className="productDetails">
      <ProductImage />
      <div className="productContent">
        <ProductInfo />
        <SelectVariant />
        <QuantitySelector />
      </div>
    </div>
  );
};

export default ProductDetails;

"use client";
import { formatProductPrice } from "@/lib/helperfunctions";
import { useProductStore } from "@/store/useProductStore";
import { Star } from "lucide-react";
import React from "react";

const ProductInfo = () => {
  const { selectedProduct, selectedVariant } = useProductStore();
  // console.log("SV====>", selectedVariant);
  // console.log("SP====>", selectedProduct);
  return (
    <div className="productDetailsInfo">
      <h2 className="productInfoName">{selectedProduct?.name}</h2>
      <div className="productInfoRating">
        <span>
          <Star />
        </span>
        <span>4.8</span>
      </div>

      <div className="productInfoBrandMerchant">
        {/* <div className="stock">
          <span>Total Product Stock: {selectedProduct?.stock || "..."}</span>{" "}
          <br />
          <span>Total Variant Stock: {selectedVariant?.stock || "..."}</span>
        </div> */}
        <div className="brand">
          <span>Brand:</span>
          <span> {selectedProduct?.brand?.name}</span>
        </div>
        <div className="merchant">
          <span>Sold By:</span>
          <span> {selectedProduct?.merchant?.name}</span>
        </div>
      </div>

      <div className="productInfoPrice">
        <span className="discountPrice">
          ৳{" "}
          {selectedVariant
            ? formatProductPrice(selectedVariant?.discount)
            : formatProductPrice(selectedProduct?.discount_price)}
        </span>

        <span className="regularPrice line-through">
          ৳{" "}
          {selectedVariant
            ? formatProductPrice(selectedVariant?.price)
            : formatProductPrice(selectedProduct?.regular_price)}
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;

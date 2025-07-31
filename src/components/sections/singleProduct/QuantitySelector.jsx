"use client";

import React, { useState, useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const QuantitySelector = () => {
  const { selectedProduct, selectedVariant } = useProductStore();
  const { addToCart, cartItems } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [maxQty, setMaxQty] = useState(null); // only null until valid stock resolved

  const isVariant = selectedProduct?.is_variant === true;
  const inputDisabled = isVariant && !selectedVariant;

  useEffect(() => {
    if (!selectedProduct) return;

    const rawStock = isVariant
      ? selectedVariant?.stock
      : selectedProduct?.stock;

    const safeStock =
      typeof rawStock === "number" && rawStock > 0 ? rawStock : null;

    setMaxQty(safeStock);
    setQuantity(1);
  }, [selectedProduct, selectedVariant]);

  const existingQty =
    cartItems.find((item) =>
      isVariant
        ? item.variant_code === selectedVariant?.variant_code
        : item.product_code === selectedProduct?.product_code &&
          !item.variant_code
    )?.quantity ?? 0;

  const remainingQty = typeof maxQty === "number" ? maxQty - existingQty : null;

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const value = parseInt(raw, 10);

    if (!raw) {
      setQuantity("");
      return;
    }

    if (
      !isNaN(value) &&
      value >= 1 &&
      (remainingQty === null || value <= remainingQty)
    ) {
      setQuantity(value);
    }
  };

  const handleInputBlur = () => {
    let clamped = parseInt(quantity, 10);
    if (isNaN(clamped) || clamped < 1) clamped = 1;
    if (remainingQty !== null && clamped > remainingQty) clamped = remainingQty;
    setQuantity(clamped);
  };

  const increment = () => {
    if (remainingQty === null) return;
    if (quantity < remainingQty) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    if (inputDisabled) {
      toast.error("Please select a variant before adding to cart.", {
        style: { background: "red", color: "white" },
      });
      return;
    }

    const cartItem = {
      product_name: selectedProduct?.name,
      product_code: selectedProduct?.product_code,
      variant_code: isVariant ? selectedVariant?.variant_code : null,
      quantity,
      unit_discount_price: isVariant
        ? selectedVariant?.discount
        : selectedProduct?.discount_price,
      unit_regular_price: isVariant
        ? selectedVariant?.price
        : selectedProduct?.regular_price,
      total_stock: maxQty,
      merchant: selectedProduct.merchant?.name,
      attributes: isVariant ? selectedVariant?.attributes : null,
      image: isVariant ? selectedVariant?.image : selectedProduct?.thumbnail,
    };

    addToCart(cartItem);
    toast.success(`${quantity} item(s) added to your cart.`, {
      style: { background: "green", color: "white" },
      duration: 1700,
    });
    setQuantity(1);
  };

  console.log("cartItems 🛒", cartItems);

  return (
    <div className="quantitySelector">
      <div>
        <label htmlFor="qty" className="quantitySelectorTitle">
          Quantity
        </label>

        <div className="quantitySelectorContainer">
          <button
            onClick={decrement}
            disabled={inputDisabled || quantity <= 1}
            className="quantitySelectorUpdateBtn"
          >
            –
          </button>
          <input
            id="qty"
            type="number"
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={inputDisabled}
            min={1}
            max={remainingQty ?? undefined}
            className="quantitySelectorInput"
          />
          <button
            onClick={increment}
            disabled={
              inputDisabled || remainingQty === null || quantity >= remainingQty
            }
            className="quantitySelectorUpdateBtn"
          >
            +
          </button>
        </div>

        {isVariant && !selectedVariant && (
          <p className="quantitySelectorVariantNotice">
            Please select a variant first.
          </p>
        )}

        {!inputDisabled &&
          remainingQty !== null &&
          (remainingQty <= 0 ? (
            <p className="quantitySelectorMaxLimitMsg">Max limit reached.</p>
          ) : (
            <p className="quantitySelectorStockUpdateMsg">
              {remainingQty} unit{remainingQty > 1 && "s"} left in stock
            </p>
          ))}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={
          inputDisabled ||
          quantity < 1 ||
          remainingQty === null ||
          remainingQty <= 0
        }
        className="quantitySelectorAddToCartBtn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default QuantitySelector;

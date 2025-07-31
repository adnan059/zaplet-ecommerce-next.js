"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import fallback from "../../../../public/images/fallback.png";
import { Store, Trash2 } from "lucide-react";
import { formatProductPrice } from "@/lib/helperfunctions";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const CartItem = ({ cartItem }) => {
  const [qty, setQty] = useState(cartItem.quantity);
  const { updateQuantity, toggleSelection, selectedIds, removeFromCart } =
    useCartStore();

  const id = cartItem.variant_code || cartItem.product_code;
  const maxStock = cartItem.total_stock;
  const isSelected = selectedIds.includes(id);

  useEffect(() => {
    setQty(cartItem.quantity);
  }, [cartItem]);

  const clampQty = (rawQty) => {
    const value = parseInt(rawQty, 10);
    if (isNaN(value) || value < 1) return 1;
    if (value > maxStock) {
      toast.error("You cannot order more than available stock.", {
        style: { background: "red", color: "white" },
      });
      return maxStock;
    }
    return value;
  };

  const handleQtyChange = (value) => {
    const clamped = clampQty(value);
    setQty(clamped);
    updateQuantity(id, clamped);
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    removeFromCart(id);
  };

  const renderCartItemAttributes = (attributes = {}) => {
    const capitalized = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return (
      <div className="cartItemAttributes flex justify-start items-center gap-[3px]">
        {Object.entries(attributes).map(([key, value]) => (
          <p key={key} className="text-[1.4rem]">
            <span>{capitalized(key)}:</span>
            <span> {value},</span>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="cartItem">
      <div className="cartItemTop">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelection(id)}
        />
        <h3>
          <Store size={18} />
          <span>{cartItem.merchant}</span>
        </h3>
      </div>

      <div className="cartItemBottom">
        <div className="cartItemImage">
          <Image
            src={cartItem.image || fallback}
            alt={cartItem.product_name || "product image"}
            width={100}
            height={100}
          />
        </div>

        <div className="cartItemInfoAndQty">
          <h3>{cartItem.product_name}</h3>
          {cartItem.attributes && renderCartItemAttributes(cartItem.attributes)}

          <div className="cartItemQtyAndDelete">
            <div className="cartItemQtySelector">
              <button
                className="cartItemQtySelectorButton"
                onClick={() => handleQtyChange(qty - 1)}
                disabled={qty <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => handleQtyChange(e.target.value)}
                name="quantity"
                id="quantity"
                min={1}
                max={maxStock}
              />
              <button
                className="cartItemQtySelectorButton"
                onClick={() => handleQtyChange(qty + 1)}
                disabled={qty >= maxStock}
              >
                +
              </button>
            </div>
            <button onClick={handleDelete}>
              <Trash2 color="red" />
            </button>
          </div>
        </div>

        <div className="cartItemPrice">
          <span className="cartItemDiscountPirce">
            ৳&nbsp;
            {formatProductPrice(qty * cartItem.unit_discount_price)}
          </span>
          <span className="cartItemRegularPirce">
            ৳&nbsp;
            {formatProductPrice(qty * cartItem.unit_regular_price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

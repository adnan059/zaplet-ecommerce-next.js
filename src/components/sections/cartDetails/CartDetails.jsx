"use client";
import { useCartStore } from "@/store/useCartStore";
import CartItem from "./CartItem";

const CartDetails = () => {
  const {
    cartItems,
    selectedIds,
    selectAll,
    clearSelection,
    clearSelectedItems,
  } = useCartStore();

  console.log(cartItems);

  const allSelected =
    cartItems.length > 0 && selectedIds.length === cartItems.length;

  const handleSelectAllToggle = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAll();
    }
  };

  const handleClear = () => {
    if (!confirm("Are you sure you want to delete these items?")) return;
    clearSelectedItems();
  };

  return (
    <div>
      <div className="cartTop">
        <h2>Cart ({cartItems?.length})</h2>
        <div className="cartTopSelection">
          <span>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAllToggle}
              id="selectAll"
            />
            <label htmlFor="selectAll">Select All</label>
          </span>
          <button onClick={handleClear} disabled={selectedIds.length === 0}>
            Clear Selected
          </button>
        </div>
      </div>

      <div className="cartContainer">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.product_code} cartItem={cartItem} />
        ))}
      </div>
    </div>
  );
};

export default CartDetails;

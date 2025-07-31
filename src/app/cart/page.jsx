"use client";

import CartDetails from "@/components/sections/cartDetails/CartDetails";
import CustomerForm from "@/components/sections/customerForm/CustomerForm";
import OrderSummary from "@/components/sections/orderSummary/OrderSummary";
import { useCartStore } from "@/store/useCartStore";

export default function Page() {
  const { cartItems } = useCartStore();
  return (
    <section>
      <div className="sectionContainer">
        {cartItems?.length > 0 ? (
          <div className="cart-form-order">
            <CartDetails />
            <CustomerForm />
            <OrderSummary />
          </div>
        ) : (
          <div className="emptyCart">
            <h2>Empty Cart List</h2>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCartStore } from "@/store/useCartStore";
import { useCustomerStore } from "@/store/useCustomerStore";
import { useOrderStore } from "@/store/useOrderStore";

import { formatProductPrice, generateOrderId } from "@/lib/helperfunctions";
import { confirmOrder } from "@/lib/server-actions/customer-actions";

const OrderSummary = () => {
  const router = useRouter();
  const { cartItems } = useCartStore();
  const { customerDetails, setCustomerDetails } = useCustomerStore();
  const {
    deliveryLocation,
    setDeliveryLocation,
    agreedToTerms,
    setAgreedToTerms,
    setOrderDetails,
  } = useOrderStore();

  const { subtotal, uniqueMerchants } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.unit_discount_price * item.quantity,
      0
    );
    const uniqueMerchants = [
      ...new Set(cartItems.map((item) => item.merchant)),
    ];
    return { subtotal, uniqueMerchants };
  }, [cartItems]);

  const deliveryFeePerMerchant = useMemo(() => {
    return deliveryLocation === "inside"
      ? 60
      : deliveryLocation === "outside"
      ? 120
      : 0;
  }, [deliveryLocation]);

  const totalDeliveryFee = deliveryFeePerMerchant * uniqueMerchants.length;
  const grandTotal = subtotal + totalDeliveryFee;

  const resetOrderForm = () => {
    setAgreedToTerms(false);
    setDeliveryLocation("");
    setCustomerDetails({
      fullName: "",
      phone: "",
      address: "",
      isSaved: false,
    });
  };

  const handleConfirmOrder = async () => {
    if (!customerDetails.isSaved) {
      toast.error("Please provide and save your address first.", {
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }
    if (!deliveryLocation) {
      toast.error("Please select a delivery option.", {
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }
    if (!agreedToTerms) {
      toast.error("You must agree to Terms & Conditions.", {
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    const orderData = {
      id: generateOrderId(customerDetails.phone),
      items: cartItems,
      customerDetails,
      payment_status: "pending",
      delivery_status: "pending",
      totalPrice: grandTotal,
      return_reason: null,
      createdAt: new Date().toISOString(),
    };

    try {
      await confirmOrder(orderData);
      setOrderDetails(orderData); // ✅ Persist receipt data
      toast.success("Order submitted!", {
        style: { backgroundColor: "green", color: "white" },
      });

      router.replace("/order-receipt"); // ✅ Redirect to receipt page

      resetOrderForm();
    } catch (error) {
      toast.error("Failed to submit order.", {
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>

      <div className="orderSummaryContainer">
        <div className="orderSubTotal">
          <span>Subtotal:</span>
          <span>৳ {formatProductPrice(subtotal)}</span>
        </div>

        <div className="orderLocation">
          <label htmlFor="deliveryLocation">Delivery Location:</label>
          <select
            id="deliveryLocation"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            className="orderDeliveryLocationSelection"
          >
            <option disabled value="">
              -- Select Delivery Option --
            </option>
            <option value="inside">Inside Dhaka (৳60/merchant)</option>
            <option value="outside">Outside Dhaka (৳120/merchant)</option>
          </select>
        </div>

        <div className="orderDeliveryFee">
          <span>Delivery Fee:</span>
          <span>৳ {formatProductPrice(totalDeliveryFee)}</span>
        </div>

        <div className="orderGrandTotal">
          <span>Grand Total:</span>
          <span>৳ {formatProductPrice(grandTotal)}</span>
        </div>

        <div className="termsAndCondition">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            id="terms"
          />
          <label htmlFor="terms">
            I agree to the <a href="#">Terms & Conditions</a>
          </label>
        </div>

        <button
          onClick={handleConfirmOrder}
          className={`orderConfirmButton ${
            customerDetails.isSaved && deliveryLocation && agreedToTerms
              ? "active"
              : ""
          }`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;

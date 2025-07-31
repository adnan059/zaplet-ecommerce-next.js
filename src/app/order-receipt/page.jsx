"use client";

import { useOrderStore } from "@/store/useOrderStore";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import OrderReceiptPDF from "@/components/shared/OrderReceiptPDF";

const OrderReceiptPage = () => {
  const { orderDetails, clearOrderDetails } = useOrderStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleDownload = async () => {
    const blob = await pdf(<OrderReceiptPDF order={orderDetails} />).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `zaplet-receipt-${orderDetails.id}.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    clearOrderDetails(); // 🧹 Clear order from store
  };

  return (
    <section>
      <div className="sectionContainer pt-[95px] min-h-[60vh]">
        <div className="orderReceiptPage text-center space-y-6">
          <h2>🎉 Congratulations!</h2>
          <p>Your order has been placed successfully.</p>
          <p>
            Order ID: <strong>{orderDetails?.id}</strong>
          </p>

          <button
            onClick={handleDownload}
            className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📥 Download Your Receipt
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderReceiptPage;

"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatProductPrice } from "@/lib/helperfunctions";
import { updateOrderStatus } from "@/lib/server-actions/admin-actions";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderDialogContent = ({ order }) => {
  const [dialogOrder, setDialogOrder] = useState(order);
  const [isLoading, setIsLoading] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [returnReason, setReturnReason] = useState(null);

  useEffect(() => {
    setDialogOrder(order);
  }, [order]);

  useEffect(() => {
    setPaymentStatus(dialogOrder?.payment_status);
    setDeliveryStatus(dialogOrder?.delivery_status);
    setReturnReason(dialogOrder?.return_reason);
  }, [dialogOrder]);

  const updateStatus = async (id, field, value) => {
    setIsLoading(true);
    try {
      const result = await updateOrderStatus(id, { [field]: value });

      if (result?.error) {
        toast.error(result.error || "Failed to update status", {
          style: { backgroundColor: "red", color: "white" },
        });
        return;
      }

      setDialogOrder(result);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to update status", {
        style: { backgroundColor: "red", color: "white" },
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"dasboardOrderDialogTitle"}>
            Order Details
          </DialogTitle>
        </DialogHeader>
        {dialogOrder && (
          <div className="dasboardOrderDialogBody">
            <div>
              <strong>Order ID:</strong> {dialogOrder.id}
            </div>
            <div>
              <strong>Customer:</strong> {dialogOrder.customerDetails.fullName}
            </div>
            <div>
              <strong>Phone:</strong> {dialogOrder.customerDetails.phone}
            </div>
            <div>
              <strong>Address:</strong> {dialogOrder.customerDetails.address}
            </div>
            <div>
              <strong>Items:</strong>
            </div>
            <ul className="dashboardOrderItemList">
              {dialogOrder.items.map((item, idx) => (
                <li key={idx}>
                  {item.product_name} [
                  {item?.variant_code ? item?.variant_code : item?.product_code}
                  ] ({item.quantity} pcs)
                </li>
              ))}
            </ul>

            <div className="dashboardOrderStatus">
              <strong>Payment Status:</strong>
              <div>
                <select
                  value={paymentStatus}
                  name="payment"
                  id="payment"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </select>
                <button
                  disabled={isLoading}
                  onClick={() =>
                    updateStatus(
                      dialogOrder?.id,
                      "payment_status",
                      paymentStatus
                    )
                  }
                >
                  Update
                </button>
              </div>
            </div>

            <div className="dashboardOrderStatus">
              <strong>Delivery Status:</strong>
              <div>
                <select
                  value={deliveryStatus}
                  name="delivery"
                  id="delivery"
                  onChange={(e) => setDeliveryStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="complete">Complete</option>
                </select>
                <button
                  disabled={isLoading}
                  onClick={() =>
                    updateStatus(
                      dialogOrder?.id,
                      "delivery_status",
                      deliveryStatus
                    )
                  }
                >
                  Update
                </button>
              </div>
            </div>

            {deliveryStatus === "cancelled" && (
              <div className="dashboardOrderReturn">
                <strong>Return Reason:</strong>
                <textarea
                  value={returnReason === null ? "" : returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  name="returnReason"
                  id="returnReason"
                  required
                  placeholder="Write the reason"
                ></textarea>
                <button
                  disabled={isLoading}
                  onClick={() =>
                    updateStatus(dialogOrder?.id, "return_reason", returnReason)
                  }
                >
                  Save
                </button>
              </div>
            )}

            <div>
              <strong>Order Date:</strong>{" "}
              {new Date(dialogOrder?.createdAt).toLocaleString()}
            </div>

            <div>
              <strong>Total:</strong> ৳{" "}
              {formatProductPrice(dialogOrder.totalPrice)}
            </div>
          </div>
        )}
      </DialogContent>
    </>
  );
};

export default OrderDialogContent;

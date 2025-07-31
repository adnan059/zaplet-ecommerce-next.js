import { fetchOrders } from "@/lib/server-actions/admin-actions";
import React from "react";
import OrderTable from "./OrderTable";

const DashboardOrders = async () => {
  const orders = await fetchOrders();

  if (orders?.error) {
    throw new Error(orders?.error);
  }

  return (
    <div>
      <h2 className="dashboardTabContentHeader">All Orders</h2>
      <OrderTable orders={orders} />
    </div>
  );
};

export default DashboardOrders;

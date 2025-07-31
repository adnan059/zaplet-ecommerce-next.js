"use server";

import axios from "axios";
import { baseUrl } from "../constants";
import { revalidatePath } from "next/cache";

export const fetchOrders = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/orders`);
    return data;
  } catch (error) {
    return { error: error?.message || "Failed to fetch errors" };
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${baseUrl}/orders/${id}`);
    revalidatePath("/dashboard");
    return { message: "Order deleted successfully" };
  } catch (error) {
    return { error: error?.message || "failed to delete" };
  }
};

export const updateOrderStatus = async (id, updateData) => {
  try {
    const { data } = await axios.patch(`${baseUrl}/orders/${id}`, updateData);

    revalidatePath("/dashboard");
    return data;
  } catch (error) {
    return { error: error?.message || "failed to update status" };
  }
};

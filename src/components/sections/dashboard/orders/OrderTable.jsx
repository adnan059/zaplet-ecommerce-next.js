"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Dialog } from "@/components/ui/dialog";

import { formatProductPrice } from "@/lib/helperfunctions";
import OrderDialogContent from "./OrderDialogContent";
import { toast } from "sonner";
import { deleteOrder } from "@/lib/server-actions/admin-actions";
import { Eye, Trash2 } from "lucide-react";

const OrderTable = ({ orders }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");
  const [pageSizeInput, setPageSizeInput] = useState("10");
  const [dialogOrder, setDialogOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Order ID",
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: "payment_status",
        header: "Payment",
        enableSorting: false,
      },
      {
        accessorKey: "delivery_status",
        header: "Delivery",
        enableSorting: false,
      },
      {
        accessorKey: "totalPrice",
        header: "Total Price",
        enableSorting: true,
        cell: (info) => `৳ ${formatProductPrice(info.getValue())}`,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        enableSorting: true,
        cell: (info) => new Date(info.getValue()).toLocaleString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => setDialogOrder(row.original)}>
              <Eye />
            </button>
            <button
              disabled={isLoading}
              onClick={() => handleDelete(row?.original?.id)}
            >
              <Trash2 />
            </button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return orders.filter((order) => {
      const paymentMatch = paymentFilter
        ? order.payment_status === paymentFilter
        : true;
      const deliveryMatch = deliveryFilter
        ? order.delivery_status === deliveryFilter
        : true;
      const searchMatch = globalFilter
        ? order.id.toLowerCase().includes(globalFilter.toLowerCase())
        : true;
      return paymentMatch && deliveryMatch && searchMatch;
    });
  }, [orders, globalFilter, paymentFilter, deliveryFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    initialState: {
      pagination: { pageSize: parseInt(pageSizeInput, 10) || 10 },
    },
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: false,
  });

  const handlePageSizeChange = (value) => {
    const size = parseInt(value, 10);
    if (!isNaN(size) && size > 0) {
      setPageSizeInput(value);
    } else {
      setPageSizeInput("");
    }
  };

  useEffect(() => {
    const size = parseInt(pageSizeInput, 10);
    if (!isNaN(size) && size > 0) {
      table.setPageSize(size);
    }
  }, [pageSizeInput, table]);

  const handleDelete = async (id) => {
    if (!confirm("This action will delete the order item. Are you sure?"))
      return;

    setIsLoading(true);
    try {
      const result = await deleteOrder(id);
      if (result?.error) {
        toast.error(result?.error || "Failed to delete the order", {
          style: { backgroundColor: "red", color: "white" },
        });
      }
      toast.success("Order deleted successfully", {
        style: { backgroundColor: "green", color: "white" },
      });
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.message || "Failed to delete the order", {
        style: { backgroundColor: "red", color: "white" },
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboardOrderTableContainer">
      {/* Filters */}
      <div className="dashboardOrderTableFilters">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="">Payment Status</option>
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
        </select>

        <select
          value={deliveryFilter}
          onChange={(e) => setDeliveryFilter(e.target.value)}
        >
          <option value="">Delivery Status</option>
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="dashboardOrderTableWrapper">
        <table className="dashboardOrderTable">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`${
                      header.column.getCanSort() ? "cursor-pointer" : ""
                    }`}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <span className="ml-1">
                        {header.column.getIsSorted() === "asc"
                          ? "▲"
                          : header.column.getIsSorted() === "desc"
                          ? "▼"
                          : ""}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="dashboardOrderTablePagination">
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>

        <div className="dashboardOrderTablePaginationInput">
          <label htmlFor="pageSize">Items per page:</label>
          <input
            id="pageSize"
            type="number"
            min={1}
            value={pageSizeInput}
            onChange={(e) => handlePageSizeChange(e.target.value)}
          />
        </div>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>

      {/* Dialog for Order Details */}
      <Dialog open={!!dialogOrder} onOpenChange={() => setDialogOrder(null)}>
        <OrderDialogContent order={dialogOrder} />
      </Dialog>
    </div>
  );
};

export default OrderTable;

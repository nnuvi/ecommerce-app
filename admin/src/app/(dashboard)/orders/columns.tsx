"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { OrderType } from "@packages/types";

export const columns: ColumnDef<OrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Order ID
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="max-w-45 truncate font-medium">
        {row.original._id}
      </div>
    ),
  },

  // User ID
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => (
      <div className="max-w-45 truncate text-muted-foreground">
        {row.original.userId}
      </div>
    ),
  },

  // Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div
          className={cn(
            "w-max rounded-md px-2 py-1 text-xs font-medium capitalize",
            status === "success" && "bg-green-500/20 text-green-700",
            status === "failed" && "bg-red-500/20 text-red-700"
          )}
        >
          {status}
        </div>
      );
    },
  },

  // Amount
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      // amount is stored in cents, so divide by 100
      const amount = row.original.amount / 100;

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-right font-medium">
          {formatted}
        </div>
      );
    },
  },

  // Number of Products
  {
    id: "productsCount",
    header: "Items",
    cell: ({ row }) => (
      <div>{row.original.products?.length ?? 0}</div>
    ),
  },

  // Created At
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;

      if (!createdAt) return <span>-</span>;

      return (
        <span>
          {new Date(createdAt).toLocaleDateString("en-US")}
        </span>
      );
    },
  },

  // Actions
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(order._id)
              }
            >
              Copy Order ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/users/${order.userId}`}>
                View Customer
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/orders/${order._id}`}>
                View Order Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

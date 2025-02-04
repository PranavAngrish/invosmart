"use client"

import React from "react"
import { Checkbox } from "./ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
  {
    accessorKey: "payeeName",
    header: "Payee name",
  },
  {
    accessorKey: "billDate",
    header: "Bill date",
  },
  {
    accessorKey: "billDueDate",
    header: "Bill due date",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice number",
  },
  {
    accessorKey: "billAmount",
    header: "Bill amount",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("billAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return formatted
    },
  },
  {
    accessorKey: "codingStatus",
    header: "Coding status",
  },
  {
    accessorKey: "approvalProgress",
    header: "Approval progress",
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Button>
    ),
  },
]


"use client"

import React from "react"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { bills } from "../assets/data"
import Header from "../components/Header"

export default function BillsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto py-6 space-y-6">
       
        <div className="bg-white rounded-md shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-700">Bill List</h1>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                Actions
              </Button>
              <Button variant="outline" size="sm">
                Help
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Button variant="outline" size="sm" className="mb-4">
              Add filters
            </Button>
            <DataTable columns={columns} data={bills} />
          </div>
        </div>
      </div>
    </main>
  )
}


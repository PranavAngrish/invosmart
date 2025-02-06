"use client"

import React,{useState,useEffect} from "react"
import { Button } from "../components/ui/button"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { bills } from "../assets/data"
import { useLocation } from "react-router-dom"

export default function PendingApprovalPage() {

    const [billDetails, setBillDetails] = useState([]);

    useEffect(() => {
        // Load invoices from local storage
        const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
        console.log("hey",storedInvoices);
        setBillDetails(Array.isArray(storedInvoices) ? storedInvoices : []);;
    }, []);

    // const data = Array.isArray(billDetails) ? billDetails : [billDetails];

  return (

      <div className="container mx-auto py-2 space-y-2">
       
        <div className="bg-white rounded-md shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-700">Bill List</h1>
            <div className="flex gap-4">
              {/* <Button variant="outline" size="sm">
                Actions
              </Button>
              <Button variant="outline" size="sm">
                Help
              </Button> */}
            </div>
          </div>

          <div className="p-4">
            <Button variant="outline" size="sm" className="mb-4 cursor-pointer hover:bg-gray-100">
              Add filters
            </Button>
            <DataTable columns={columns} data={billDetails.filter(item => item && item.payeeName)} />
          </div>
        </div>
      </div>
    
  )
}


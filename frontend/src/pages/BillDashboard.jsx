"use client"

import React,{ useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Settings, Plus, ArrowRight } from "lucide-react"
import {Link, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Upload } from "lucide-react"

import { ChevronDown } from "lucide-react"
import FileUploadPopUp from "../components/FileUploadPopUp"

export default function BillDashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate()
  const [bills, setBills] = useState([
    {
      payerEntity: "EverSky",
      payeeId: "1005",
      payeeName: "Progress Inc.",
      creationDate: "Dec 03, 2020",
      invoiceDate: "Aug 30, 2019",
      dueDate: "Sep 30, 2020",
      invoiceNumber: "UI0018",
      amount: "USD 500.00",
    },
    {
      payerEntity: "EverSky",
      payeeId: "1104",
      payeeName: "Waters Inc.",
      creationDate: "Dec 03, 2020",
      invoiceDate: "Aug 30, 2019",
      dueDate: "Sep 30, 2020",
      invoiceNumber: "ABC019",
      amount: "USD 1,650.00",
    },
    {
      payerEntity: "hello",
      payeeId: "1104",
      payeeName: "Waters Inc.",
      creationDate: "Dec 03, 2020",
      invoiceDate: "Aug 30, 2019",
      dueDate: "Sep 30, 2020",
      invoiceNumber: "ABC019",
      amount: "USD 1,650.00",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

   const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleFileSubmit = () => {
    if (selectedFile) {
      console.log("Uploaded File:", selectedFile.name)
      setIsModalOpen(false)
      setSelectedFile(null)
    } else {
      alert("Please select a file to upload.")
    }
  }


  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleRowClick = (bill) => {
    // Navigate to invoice page with bill details as state
    navigate("/invoice", { state: { billDetails: bill } })
  }

  const filteredBills = bills.filter((bill) =>
    Object.values(bill).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Navigation */}
      <nav className="bg-blue-600 text-white p-4 items-center">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Link to={"/"}>
              <h1 className="text-3xl font-bold">Invosmart</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-white cursor-pointer text-xl rounded-xl border-white hover:bg-white/10"
                >
                  Login <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <Link to='/signin'>
              <DropdownMenuContent>
                <DropdownMenuItem className="hover:bg-gray-300">Requisition Team</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-300">Procurement Team</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-300">Management Team</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-300">Receiving Team</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-300">Accounts Payable Team</DropdownMenuItem>
              </DropdownMenuContent>
                </Link>
            </DropdownMenu>
            
          </div>
        </div>

      </nav>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl">Bill list</h2>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Add bill
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-4 flex justify-between items-center">
            <Button variant="outline" className="flex items-center gap-2 cursor-pointer hover:bg-gray-100">
              Add filters
            </Button>
            <Input
              placeholder="Search by invoice #, refcode or payee details"
              className="max-w-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  {/* <input type="checkbox" /> */}
                </TableHead>
                <TableHead>Payer entity</TableHead>
                <TableHead>Payee ID</TableHead>
                <TableHead>Payee name</TableHead>
                <TableHead>Creation date</TableHead>
                <TableHead>Invoice date</TableHead>
                <TableHead>Bill due date</TableHead>
                <TableHead>Invoice number</TableHead>
                <TableHead>Bill amount</TableHead>
                <TableHead className="w-12">
                  <Settings className="h-4 w-4" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(bill)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ cursor: "pointer" }}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>{bill.payerEntity}</TableCell>
                  <TableCell>{bill.payeeId}</TableCell>
                  <TableCell>{bill.payeeName}</TableCell>
                  <TableCell>{bill.creationDate}</TableCell>
                  <TableCell>{bill.invoiceDate}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>{bill.invoiceNumber}</TableCell>
                  <TableCell>{bill.amount}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <div className="p-4 border-t text-sm text-gray-500">{filteredBills.length} items | 1 page</div>
        </div>
      </main>

     <FileUploadPopUp setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} handleFile={handleFileChange}/>

    </div>
  )
}


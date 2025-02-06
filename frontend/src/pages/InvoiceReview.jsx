"use client"
import React,{ useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { CalendarIcon, ChevronLeft, ChevronRight, HelpCircle, Plus, X } from "lucide-react"
import Invoice from "../assets/invoice.jpg"
import Header from "../components/Header"
import { Link, useLocation } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function InvoiceReview() {
  const location = useLocation()
  const { billDetails } = location.state || {}

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedApprovers, setSelectedApprovers] = useState([])

  const handleApproverSelect = (role, email) => {
    setSelectedApprovers([...selectedApprovers, { role, email }])
    setIsDropdownOpen(false)
  }

  const removeApprover = (index) => {
    setSelectedApprovers(selectedApprovers.filter((_, i) => i !== index))
  }

  if (!billDetails) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl mb-4">No invoice details found</h2>
          <Link to="/">
            <Button variant="outline" className="cursor-pointer hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Bills
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = () => {
    // Add your submit logic here
    console.log("Submitting invoice...")
  }

  const handleSave = () => {
    // Add your save logic here
    console.log("Saving invoice...")
  }

  const handleDiscard = () => {
    // Add your discard logic here
    console.log("Discarding changes...")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-sm text-gray-500">1 of 25</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Invoice review</h1>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Pending review</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4 mr-1" />
              Help
            </Button>
            <Button variant="outline" size="sm">
              Actions
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Invoice Preview */}
          <div className="lg:col-span-3 bg-white rounded-lg border p-6">
            <div className="relative w-full" style={{ height: "800px" }}>
              <img
                src={Invoice || "/placeholder.svg"}
                alt="Invoice Template"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Input Fields for Line Items */}
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 text-white">
                    <TableHead>Item</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Line Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input defaultValue="Brake Cables" className="w-full" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="Front and rear brake cables" className="w-full" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="100.00" className="w-full text-right" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="1" className="w-full text-right" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="100.00" className="w-full text-right" readOnly />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Input defaultValue="Pedal Arms" className="w-full" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="New set of pedal arms" className="w-full" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="15.00" className="w-full text-right" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="2" className="w-full text-right" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="30.00" className="w-full text-right" readOnly />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Input defaultValue="Labor" className="w-full" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="Labor" className="w-full" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="5.00" className="w-full text-right" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="3" className="w-full text-right" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="15.00" className="w-full text-right" readOnly />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Form Section */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              {/* Supplier & Approver */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Supplier & approver</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Payee name</Label>
                    <div className="flex gap-2">
                      <Input value={billDetails?.payeeName} />
                      <Button size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">General</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Invoice number</Label>
                    <Input value={billDetails?.invoiceNumber} readOnly />
                  </div>
                  <div>
                    <Label>Invoice date</Label>
                    <div className="flex gap-2">
                      <Input value={billDetails?.invoiceDate} readOnly />
                      <Button size="icon" variant="outline">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Invoice due date</Label>
                    <div className="flex gap-2">
                      <Input value={billDetails?.dueDate} readOnly />
                      <Button size="icon" variant="outline">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      className="h-24"
                      placeholder="Enter invoice description"
                      value="Invoice of East Repair Inc."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="capture" />
                    <label htmlFor="capture">Capture bill lines</label>
                  </div>
                </div>
              </div>

              {/* Bill Approval */}

              {/* Bill Approval */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Bill approval</h3>
                <div className="bg-blue-50 p-3 mb-4 text-sm text-blue-700 rounded">Recommended approval sequence.</div>
                <div className="space-y-4">
                  <div className="relative">
                    <Label>Bill approver(s)</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          value="Add bill approver"
                          readOnly
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="cursor-pointer"
                        />
                        {isDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleApproverSelect("AP Manager", "apmgr@onspot.com")}
                            >
                              <div className="font-medium">AP Manager</div>
                              <div className="text-sm text-gray-600">apmgr@onspot.com</div>
                            </div>
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleApproverSelect("CFO", "cfo@onspot.com")}
                            >
                              <div className="font-medium">CFO</div>
                              <div className="text-sm text-gray-600">cfo@onspot.com</div>
                            </div>
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleApproverSelect("Senior AP Analyst", "sranalyst@onspot.com")}
                            >
                              <div className="font-medium">Senior AP Analyst</div>
                              <div className="text-sm text-gray-600">sranalyst@onspot.com</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <Button size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {selectedApprovers.map((approver, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-700 p-1 rounded">{index + 1}</span>
                        <div>
                          <div className="font-medium">{approver.role}</div>
                          <div className="text-sm text-gray-600">{approver.email}</div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => removeApprover(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 p-1 rounded">1</span>
                      <span>Controller</span>
                    </div>
                    <Button size="icon" variant="ghost">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Total Amount and Delivery Costs */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Costs</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Net amount</Label>
                    <Input value="145.00" readOnly />
                  </div>
                  <div>
                    <Label>Delivery costs</Label>
                    <Input placeholder="Enter delivery costs" value="9.06" />
                  </div>
                  <div>
                    <Label>Total amount</Label>
                    <Input placeholder="Enter delivery costs" value="9.06" />
                  </div>
                </div>
              </div>
              {/* Add the action buttons at the bottom */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 justify-end">
                  <Button
                    onClick={handleDiscard}
                    variant="outline"
                    className="min-w-[100px] bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  >
                    Discard
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    className="min-w-[100px] bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  >
                    Save
                  </Button>
                  <Button onClick={handleSubmit} className="min-w-[100px] bg-[#82b91e] hover:bg-[#74a41a] cursor-pointer text-white">
                    Submit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


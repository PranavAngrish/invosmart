"use client"

import React,{ useState, useMemo } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Search } from "lucide-react" // Import search icon

export default function PayeeManagement() {
  const [isOpen, setIsOpen] = useState(false)
  const [payees, setPayees] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    type: "individual",
    payeeId: "",
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    preferredEntity: "eversky",
    payeeLanguage: "english",
    autoFill: false,
    inviteToPortal: false,
    taxFormManual: false,
  })

  // Filter payees based on search query
  const filteredPayees = useMemo(() => {
    if (!searchQuery) return payees

    return payees.filter((payee) => {
      const searchFields = [payee.payeeId, payee.firstName, payee.lastName, payee.email, payee.companyName].map(
        (field) => field.toLowerCase(),
      )

      const query = searchQuery.toLowerCase()

      return searchFields.some((field) => field.includes(query))
    })
  }, [payees, searchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPayees([...payees, formData])
    setIsOpen(false)
    setFormData({
      type: "individual",
      payeeId: "",
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      preferredEntity: "eversky",
      payeeLanguage: "english",
      autoFill: false,
      inviteToPortal: false,
      taxFormManual: false,
    })
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by payee ID, alias, name or company name"
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button onClick={() => setIsOpen(true)}>Add payee</Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add new payee</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Payee type</Label>
              <RadioGroup
                defaultValue="individual"
                onValueChange={(value) => handleInputChange("type", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Individual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Company</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payeeId">Payee ID</Label>
                <Input
                  id="payeeId"
                  value={formData.payeeId}
                  onChange={(e) => handleInputChange("payeeId", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred entity</Label>
                <Select
                  value={formData.preferredEntity}
                  onValueChange={(value) => handleInputChange("preferredEntity", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eversky">EverSky (Default)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Payee language</Label>
                <Select
                  value={formData.payeeLanguage}
                  onValueChange={(value) => handleInputChange("payeeLanguage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoFill"
                  checked={formData.autoFill}
                  onCheckedChange={(checked) => handleInputChange("autoFill", checked)}
                />
                <Label htmlFor="autoFill">Auto fill</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inviteToPortal"
                  checked={formData.inviteToPortal}
                  onCheckedChange={(checked) => handleInputChange("inviteToPortal", checked)}
                />
                <Label htmlFor="inviteToPortal">Invite to suppliers portal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxFormManual"
                  checked={formData.taxFormManual}
                  onCheckedChange={(checked) => handleInputChange("taxFormManual", checked)}
                />
                <Label htmlFor="taxFormManual">Tax form received manually</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Add
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Payee ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Company</th>
              <th className="text-left p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayees.length > 0 ? (
              filteredPayees.map((payee, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{payee.payeeId}</td>
                  <td className="p-3">
                    {payee.firstName} {payee.lastName}
                  </td>
                  <td className="p-3">{payee.email}</td>
                  <td className="p-3">{payee.companyName}</td>
                  <td className="p-3 capitalize">{payee.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  {searchQuery ? "No payees found matching your search" : "No payees added yet"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


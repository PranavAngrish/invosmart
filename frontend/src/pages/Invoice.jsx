"use client"

import React,{ useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { TabsContent } from "../components/ui/tabs"
import PendingAPActionPage from "./PendingAPActionPage"
import PendingApprovalPage from "./PendingApprovalPage"
import PendingReviewPage from "./PendingReviewPage"
import PendingPaymentPage from "./PendingPaymentPage"
import AllBills from "./AllBills"

export default function InvoiceReview() {
  
  const [activeTab, setActiveTab] = useState("pending-review")

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
           <header className="bg-blue-600 text-white">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-6 p-4">
            <a href="#" className="hover:text-gray-300">
              Payments
            </a>
            <a href="#" className="text-black">
              Bills
            </a>
            <a href="#" className="hover:text-gray-300">
              Payees
            </a>
            <a href="#" className="hover:text-gray-300">
              Reports
            </a>
          </nav>
        </div>
      </header>

      <div className="flex justify-between items-center">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-white border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="pending-review"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${activeTab === "pending-review" ? "text-black" : "text-gray-500"}`}>
                Pending review
              </TabsTrigger>
              <TabsTrigger
                value="pending-my-approval"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${activeTab === "pending-my-approval" ? "text-black" : "text-gray-500"}`}>
                Pending my approval
              </TabsTrigger>
              <TabsTrigger
                value="pending-ap-action"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${activeTab === "pending-ap-action" ? "text-black" : "text-gray-500"}`}>
                Pending AP action
              </TabsTrigger>
              <TabsTrigger
                value="pending-payment"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${activeTab === "pending-payment" ? "text-black" : "text-gray-500"}`}>
                Pending payment
              </TabsTrigger>
              <TabsTrigger
                value="all-bills"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${activeTab === "all-bills" ? "text-black" : "text-gray-500"}`}>
                All bills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending-my-approval">
          <Card>
            <CardContent className="p-6">
              <PendingApprovalPage />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-review">
          <Card>
            <CardContent className="p-6">
              <PendingReviewPage />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-ap-action">
          <Card>
            <CardContent className="p-6">
              <PendingAPActionPage />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-payment">
          <Card>
            <CardContent className="p-6">
              <PendingPaymentPage />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-bills">
          <Card>
            <CardContent className="p-6">
              <AllBills />
            </CardContent>
          </Card>
        </TabsContent>
          </Tabs>

          
      </div>
    </div>
  )
}


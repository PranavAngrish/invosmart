import React,{useState} from 'react'
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'


const Header = () => {

    const [selectedTab, setSelectedTab] = useState("pending-review")
    const navigate = useNavigate()

    const handleTabChange = (value) => {
    setSelectedTab(value);
    console.log("Selected Tab:", value);

    if(value === "pending-review"){
      navigate("/invoice")
    } else if(value === "pending-my-approval"){
        navigate("/pending");
    }
  };    

  return (
    <div>
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-6 p-4">
            <a href="#" className="hover:text-gray-300">
              Payments
            </a>
            <a href="#" className="text-red-500">
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
          <Tabs defaultValue={selectedTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full justify-start bg-white border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="pending-review"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${selectedTab === "pending-review" ? "text-red-500" : "text-gray-500"}`}>
                Pending review
              </TabsTrigger>
              <TabsTrigger
                value="pending-my-approval"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 text-red-500 data-[state=active]:bg-transparent"
              ${selectedTab === "pending-my-approval" ? "text-red-500" : "text-gray-500"}`}>
                Pending my approval
              </TabsTrigger>
              <TabsTrigger
                value="pending-ap-action"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${selectedTab === "pending-ap-action" ? "text-red-500" : "text-gray-500"}`}>
                Pending AP action
              </TabsTrigger>
              <TabsTrigger
                value="pending-payment"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${selectedTab === "pending-payment" ? "text-red-500" : "text-gray-500"}`}>
                Pending payment
              </TabsTrigger>
              <TabsTrigger
                value="all-bills"
                className={`rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
              ${selectedTab === "all-bills" ? "text-red-500" : "text-gray-500"}`}>
                All bills
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative min-w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search by refcode or payee details" className="pl-8" />
          </div>
        </div>

    </div>
  )
}

export default Header

// import { Card } from "./ui/card"
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
// import { Button } from "./ui/button"
// import { Checkbox } from "./ui/checkbox"
// import { CalendarIcon, Plus, X } from "lucide-react"

// export default function InvoiceDetails() {
//   return (
//     <div className="space-y-6">
//       {/* Supplier & approver */}
//       <Card className="p-4">
//         <h2 className="mb-4 text-lg font-medium">Supplier & approver</h2>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <Label>Payee name</Label>
//             <div className="flex w-3/4 items-center gap-2">
//               <Input defaultValue="Progress Inc." />
//               <Button size="icon" variant="outline">
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Card>

//       {/* General */}
//       <Card className="p-4">
//         <h2 className="mb-4 text-lg font-medium">General</h2>
//         <div className="space-y-4">
//           <div className="grid gap-4">
//             <div className="flex items-center justify-between">
//               <Label>Invoice number</Label>
//               <Input className="w-3/4" defaultValue="101" />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Invoice date</Label>
//               <div className="relative w-3/4">
//                 <Input defaultValue="01/03/2019" />
//                 <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Invoice due date</Label>
//               <div className="relative w-3/4">
//                 <Input defaultValue="02/03/2019" />
//                 <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <Label>Description</Label>
//               <Input className="w-3/4" />
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="capture" />
//             <Label htmlFor="capture">Capture bill lines</Label>
//           </div>
//         </div>
//       </Card>

//       {/* Bill approval */}
//       <Card className="p-4">
//         <h2 className="mb-4 text-lg font-medium">Bill approval</h2>
//         <div className="mb-4 rounded bg-blue-50 p-2 text-sm text-blue-600">Recommended approval sequence.</div>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <Label>Bill approver(s)</Label>
//             <div className="flex w-3/4 items-center gap-2">
//               <Input defaultValue="Add bill approver" />
//               <Button size="icon" variant="outline">
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//           <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2">
//             <span className="text-sm">Controller</span>
//             <Button size="icon" variant="ghost">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Amount Details */}
//       <Card className="p-4">
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <Label>Net amount</Label>
//             <Input className="w-3/4" defaultValue="650" />
//           </div>
//           <div className="flex items-center justify-between">
//             <Label>Delivery costs</Label>
//             <Input className="w-3/4" />
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }


import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Upload } from "lucide-react"


const FileUploadPopUp = ({isModalOpen,setIsModalOpen,handleFileChange}) => {

  return (
    <div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Invoice</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 cursor-pointer">
            <Input className="cursor-pointer hover:bg-gray-100" type="file" accept=".pdf" onChange={handleFileChange} />
          </div>
          <DialogFooter>
            <Button variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="outline" className="flex items-center gap-2 cursor-pointer hover:bg-gray-100" onClick={() => setIsModalOpen(false)}>
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            
      
    </div>
      
  )
}

export default FileUploadPopUp

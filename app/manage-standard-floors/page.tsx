"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Plus, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

interface StandardFloor {
  id: string
  name: string
  area: number
}

export default function ManageStandardFloors() {
  const router = useRouter()
  const [standardFloors, setStandardFloors] = useState<StandardFloor[]>([
    { id: "1", name: "标准层A", area: 1000 },
    { id: "2", name: "标准层B", area: 1200 },
  ])

  const handleBack = () => {
    router.back()
  }

  const handleAddStandardFloor = () => {
    router.push("/add-standard-floor")
  }

  const handleEditStandardFloor = (id: string) => {
    router.push(`/edit-standard-floor?id=${id}`)
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">管理标准层</h1>
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-3">
          {standardFloors.map((floor) => (
            <div key={floor.id} className="bg-white rounded-lg p-3 flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium">{floor.name}</h3>
                <p className="text-sm text-gray-500">面积: {floor.area} 平方米</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleEditStandardFloor(floor.id)}>
                <Edit className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button onClick={handleAddStandardFloor} className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]">
          <Plus className="mr-2 h-4 w-4" /> 添加标准层
        </Button>
      </footer>
    </div>
  )
}


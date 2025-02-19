"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface FacilityType {
  id: string
  name: string
}

interface FacilityGroup {
  id: string
  name: string
  types: FacilityType[]
  isExpanded: boolean
}

export default function AddFacilityType() {
  const router = useRouter()
  const [facilityGroups, setFacilityGroups] = useState<FacilityGroup[]>([
    {
      id: "1",
      name: "土建",
      isExpanded: false,
      types: [
        { id: "1-1", name: "地面" },
        { id: "1-2", name: "墙面" },
        { id: "1-3", name: "天花" },
        { id: "1-4", name: "窗户" },
      ],
    },
    {
      id: "2",
      name: "消防",
      isExpanded: false,
      types: [
        { id: "2-1", name: "安全出口指示牌" },
        { id: "2-2", name: "消火栓" },
        { id: "2-3", name: "灭火柜" },
        { id: "2-4", name: "消防沙箱" },
      ],
    },
    {
      id: "3",
      name: "电梯",
      isExpanded: false,
      types: [
        { id: "3-1", name: "电梯轿厢门" },
        { id: "3-2", name: "电梯层门" },
        { id: "3-3", name: "电梯按键" },
        { id: "3-4", name: "电梯轿厢按键" },
        { id: "3-5", name: "电梯轿厢壁" },
      ],
    },
  ])

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleBack = () => {
    router.back()
  }

  const toggleGroup = (groupId: string) => {
    setFacilityGroups(
      facilityGroups.map((group) => (group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group)),
    )
  }

  const toggleTypeSelection = (typeId: string) => {
    setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]))
  }

  const handleSubmit = () => {
    // 这里可以处理选中的设施设备类型
    console.log("Selected types:", selectedTypes)
    router.back()
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">添加设施设备类型</h1>
        <div className="w-5" /> {/* Spacer for centering */}
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-2">
          {facilityGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-3 cursor-pointer"
                onClick={() => toggleGroup(group.id)}
              >
                <span className="font-medium">{group.name}</span>
                {group.isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {group.isExpanded && (
                <div className="pl-6 pr-3 pb-3 space-y-2">
                  {group.types.map((type) => (
                    <div key={type.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={type.id}
                        checked={selectedTypes.includes(type.id)}
                        onChange={() => toggleTypeSelection(type.id)}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor={type.id} className="text-sm text-gray-700">
                        {type.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button onClick={handleSubmit} className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]">
          确定
        </Button>
      </footer>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, X, ArrowRight } from "lucide-react"

export function BuildingEditModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [standardFloor, setStandardFloor] = useState("")
  const [selectedFloors, setSelectedFloors] = useState<string[]>([])
  const [locations, setLocations] = useState<{ name: string; count: number }[]>([
    { name: "洗手间", count: 0 },
    { name: "电梯前室", count: 0 },
    { name: "走廊", count: 0 },
    { name: "消防楼梯间", count: 0 },
  ])

  const floors = Array.from({ length: 20 }, (_, i) => `${i + 1}层`)

  const handleFloorSelect = (floor: string) => {
    setSelectedFloors((prev) => (prev.includes(floor) ? prev.filter((f) => f !== floor) : [...prev, floor]))
  }

  const addLocation = () => {
    setLocations([...locations, { name: "", count: 0 }])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto h-screen sm:h-auto p-0 gap-0">
        <DialogHeader className="px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-700" />
          </button>
          <DialogTitle className="text-[17px] font-normal">编辑楼栋</DialogTitle>
          <div className="w-5" /> {/* Spacer for centering */}
        </DialogHeader>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Standard Floor Selection */}
            <div className="space-y-3">
              <Label className="text-[17px] font-normal">标准层</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="flex-grow justify-between h-10 bg-white border-gray-200">
                  <span className="text-gray-700">{standardFloor || "选择标准层"}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 bg-white border-gray-200">
                  <Plus className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* Floor Selection */}
            <div className="space-y-3">
              <Label className="text-[17px] font-normal">应用楼层</Label>
              <div className="grid grid-cols-5 gap-2">
                {floors.map((floor) => (
                  <button
                    key={floor}
                    onClick={() => handleFloorSelect(floor)}
                    className={`px-3 py-2 text-sm border rounded-md transition-colors whitespace-nowrap
                      ${
                        selectedFloors.includes(floor)
                          ? "border-[#4086F4] bg-[#4086F4]/5 text-[#4086F4]"
                          : "border-gray-200 text-gray-700 bg-white"
                      }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Configuration */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Label className="text-[17px] font-normal">点位配置</Label>
                <Button variant="outline" size="sm" onClick={addLocation} className="bg-white border-gray-200">
                  <Plus className="h-4 w-4 mr-1" /> 添加
                </Button>
              </div>
              <div className="space-y-3">
                {locations.map((location, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={location.name}
                      onChange={(e) => {
                        const newLocations = [...locations]
                        newLocations[index].name = e.target.value
                        setLocations(newLocations)
                      }}
                      className="flex-grow bg-white border-gray-200"
                      placeholder="点位名称"
                    />
                    <div className="flex items-center w-24">
                      <Input
                        type="number"
                        value={location.count}
                        onChange={(e) => {
                          const newLocations = [...locations]
                          newLocations[index].count = Math.max(0, Number.parseInt(e.target.value) || 0)
                          setLocations(newLocations)
                        }}
                        className="w-16 text-right pr-1 bg-white border-gray-200"
                        min={0}
                      />
                      <span className="ml-1 text-xs text-gray-400">个</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={addLocation} className="bg-white border-gray-200">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-100">
          <Button onClick={onClose} className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]">
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


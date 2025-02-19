"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface LocationType {
  name: string
  count: number
  facilities?: { name: string; id: string }[]
  isExpanded?: boolean
}

export default function ConfigureFloorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const buildingName = searchParams.get("building")
  const floorName = searchParams.get("floor")

  const [locations, setLocations] = useState<LocationType[]>([
    {
      name: "洗手间",
      count: 2,
      facilities: [
        { name: "洗手台", id: "1" },
        { name: "马桶", id: "2" },
      ],
      isExpanded: false,
    },
    {
      name: "电梯前室",
      count: 1,
      facilities: [
        { name: "电梯门", id: "3" },
        { name: "指示牌", id: "4" },
      ],
      isExpanded: false,
    },
  ])

  const handleBack = () => {
    router.back()
  }

  const addLocation = () => {
    router.push("/add-location")
  }

  const toggleLocationExpand = (index: number) => {
    setLocations(locations.map((loc, i) => (i === index ? { ...loc, isExpanded: !loc.isExpanded } : loc)))
  }

  const handleSubmit = () => {
    console.log("Floor configuration saved:", { buildingName, floorName, locations })
    router.back()
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">配置楼层</h1>
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-[17px] font-normal mb-2">楼层信息</h2>
            <p className="text-gray-600">楼栋：{buildingName}</p>
            <p className="text-gray-600">楼层：{floorName}</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[17px] font-normal">点位配置</h2>
              <Button variant="outline" size="sm" onClick={addLocation} className="bg-white border-gray-200">
                <Plus className="h-4 w-4 mr-1" /> 添加
              </Button>
            </div>
            <div className="space-y-2">
              {locations.map((location, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => toggleLocationExpand(index)}
                  >
                    <div className="flex items-center space-x-2">
                      {location.isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-gray-700">{location.name}</span>
                      <span className="text-sm text-gray-400">设施设备类型数量：{location.count}</span>
                    </div>
                  </div>
                  {location.isExpanded && location.facilities && (
                    <div className="pl-8 pr-3 pb-3 space-y-2">
                      {location.facilities.map((facility) => (
                        <div key={facility.id} className="flex items-center justify-between">
                          <span className="text-gray-600">{facility.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button onClick={handleSubmit} className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]">
          保存
        </Button>
      </footer>
    </div>
  )
}


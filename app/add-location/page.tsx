"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface LocationType {
  name: string
  facilities: string[]
  isExpanded?: boolean
  isSelected?: boolean
}

const initialLocations: LocationType[] = [
  {
    name: "人行道路",
    facilities: ["地面", "休闲座椅", "公告栏", "广告"],
    isExpanded: false,
    isSelected: false,
  },
  {
    name: "车行道路",
    facilities: ["地面", "地面标识", "围墙"],
    isExpanded: false,
    isSelected: false,
  },
  {
    name: "垃圾点",
    facilities: ["洗手盆", "水龙头", "垃圾桶", "雨棚", "地面"],
    isExpanded: false,
    isSelected: false,
  },
]

export default function AddLocation() {
  const router = useRouter()
  const [locations, setLocations] = useState<LocationType[]>(initialLocations)

  const handleBack = () => {
    router.back()
  }

  const toggleExpand = (index: number) => {
    setLocations(locations.map((loc, i) => (i === index ? { ...loc, isExpanded: !loc.isExpanded } : loc)))
  }

  const toggleLocationSelect = (index: number) => {
    setLocations(
      locations.map((loc, i) =>
        i === index
          ? {
              ...loc,
              isSelected: !loc.isSelected,
              facilities: loc.facilities.map((f) => ({ ...f, isSelected: false })),
            }
          : loc,
      ),
    )
  }

  const toggleFacilitySelect = (locationIndex: number, facilityIndex: number) => {
    if (!locations[locationIndex].isSelected) return

    setLocations(
      locations.map((loc, i) =>
        i === locationIndex
          ? {
              ...loc,
              facilities: loc.facilities.map((f, j) => (j === facilityIndex ? f : f)),
            }
          : loc,
      ),
    )
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">添加点位</h1>
        <div className="w-5" /> {/* Spacer for centering */}
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-2">
          {locations.map((location, locationIndex) => (
            <div key={locationIndex} className="bg-white rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-3 cursor-pointer"
                onClick={() => toggleExpand(locationIndex)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={location.isSelected}
                    onChange={(e) => {
                      e.stopPropagation()
                      toggleLocationSelect(locationIndex)
                    }}
                    className="mr-2 h-4 w-4"
                  />
                  <span>{location.name}</span>
                </div>
                {location.isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {location.isExpanded && (
                <div className="pl-8 pr-3 pb-3 space-y-2">
                  {location.facilities.map((facility, facilityIndex) => (
                    <div key={facilityIndex} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => toggleFacilitySelect(locationIndex, facilityIndex)}
                        disabled={!location.isSelected}
                        className="mr-2 h-4 w-4"
                      />
                      <span className={location.isSelected ? "text-gray-900" : "text-gray-400"}>{facility}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]">确定</Button>
      </footer>
    </div>
  )
}


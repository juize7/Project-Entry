"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Plus, X, ChevronDown, ChevronRight, Copy, PlusCircle, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface LocationType {
  name: string
  count: number
  facilities?: { name: string; id: string }[]
  isExpanded?: boolean
}

interface Building {
  id: string
  name: string
  isExpanded: boolean
  floors: { id: string; name: string }[]
}

export default function AddStandardFloor() {
  const router = useRouter()
  const [floorName, setFloorName] = useState("")
  const [floorArea, setFloorArea] = useState("")
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
    {
      name: "走廊",
      count: 1,
      facilities: [
        { name: "地面", id: "5" },
        { name: "墙面", id: "6" },
        { name: "天花板", id: "7" },
      ],
      isExpanded: false,
    },
    {
      name: "消防楼梯间",
      count: 1,
      facilities: [
        { name: "楼梯", id: "8" },
        { name: "扶手", id: "9" },
        { name: "防火门", id: "10" },
      ],
      isExpanded: false,
    },
  ])
  const [editingLocationIndex, setEditingLocationIndex] = useState<number | null>(null)
  const [facilityTypes, setFacilityTypes] = useState<string[]>(["地面", "天面", "照明灯", "防火门"])
  const [isAddLocationDialogOpen, setIsAddLocationDialogOpen] = useState(false)
  const [newLocationName, setNewLocationName] = useState("")
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: "1",
      name: "A栋",
      isExpanded: false,
      floors: [
        { id: "1-1", name: "1层" },
        { id: "1-2", name: "2层" },
        { id: "1-3", name: "3层" },
      ],
    },
    {
      id: "2",
      name: "B栋",
      isExpanded: false,
      floors: [
        { id: "2-1", name: "1层" },
        { id: "2-2", name: "2层" },
      ],
    },
  ])
  const [selectedFloors, setSelectedFloors] = useState<string[]>([])

  const handleBack = () => {
    router.back()
  }

  const addLocation = () => {
    router.push("/add-location")
  }

  const openAddLocationDialog = () => {
    setIsAddLocationDialogOpen(true)
  }

  const closeAddLocationDialog = () => {
    setIsAddLocationDialogOpen(false)
    setNewLocationName("")
  }

  const handleAddNewLocation = () => {
    if (newLocationName.trim()) {
      setLocations([...locations, { name: newLocationName.trim(), count: 0, facilities: [], isExpanded: false }])
      closeAddLocationDialog()
    }
  }

  const toggleLocationExpand = (index: number) => {
    setLocations(locations.map((loc, i) => (i === index ? { ...loc, isExpanded: !loc.isExpanded } : loc)))
  }

  const editLocation = (index: number) => {
    setEditingLocationIndex(index)
  }

  const saveLocationName = (index: number, newName: string) => {
    setLocations(locations.map((loc, i) => (i === index ? { ...loc, name: newName } : loc)))
    setEditingLocationIndex(null)
  }

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index))
  }

  const copyLocation = (index: number) => {
    const locationToCopy = locations[index]
    const newLocation = { ...locationToCopy, name: `${locationToCopy.name} 副本` }
    setLocations([...locations.slice(0, index + 1), newLocation, ...locations.slice(index + 1)])
  }

  const addSubLocation = (index: number) => {
    router.push("/add-facility-type")
  }

  const removeFacility = (locationIndex: number, facilityId: string) => {
    setLocations(
      locations.map((location, index) => {
        if (index === locationIndex) {
          return {
            ...location,
            facilities: location.facilities?.filter((facility) => facility.id !== facilityId),
          }
        }
        return location
      }),
    )
  }

  const addFacilityType = () => {
    router.push("/add-facility-type")
  }

  const removeFacilityType = (index: number) => {
    setFacilityTypes(facilityTypes.filter((_, i) => i !== index))
  }

  const toggleBuildingExpand = (buildingId: string) => {
    setBuildings(
      buildings.map((building) =>
        building.id === buildingId ? { ...building, isExpanded: !building.isExpanded } : building,
      ),
    )
  }

  const toggleFloorSelection = (floorId: string) => {
    setSelectedFloors((prevSelected) =>
      prevSelected.includes(floorId) ? prevSelected.filter((id) => id !== floorId) : [...prevSelected, floorId],
    )
  }

  const handleSubmit = () => {
    console.log("标准层添加:", { floorName, floorArea, locations, facilityTypes, selectedFloors })
    router.back()
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">添加标准层</h1>
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="floorName" className="text-sm font-medium">
              标准层名称
            </label>
            <Input
              id="floorName"
              value={floorName}
              onChange={(e) => setFloorName(e.target.value)}
              className="bg-white border-gray-200"
              placeholder="输入标准层名称"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="floorArea" className="text-sm font-medium">
              面积（平方米）
            </label>
            <Input
              id="floorArea"
              type="number"
              value={floorArea}
              onChange={(e) => setFloorArea(e.target.value)}
              className="bg-white border-gray-200"
              placeholder="输入面积"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-normal">点位配置</h2>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={addLocation} className="bg-white border-gray-200">
                  <Plus className="h-4 w-4 mr-1" /> 选择
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openAddLocationDialog}
                  className="bg-white border-gray-200"
                >
                  <Plus className="h-4 w-4 mr-1" /> 添加
                </Button>
              </div>
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          editLocation(index)
                        }}
                      >
                        <Edit className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyLocation(index)
                        }}
                      >
                        <Copy className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          addSubLocation(index)
                        }}
                      >
                        <PlusCircle className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeLocation(index)
                        }}
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                  {location.isExpanded && location.facilities && (
                    <div className="pl-8 pr-3 pb-3 space-y-2">
                      {location.facilities.map((facility) => (
                        <div key={facility.id} className="flex items-center justify-between">
                          <span className="text-gray-600">{facility.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFacility(index, facility.id)
                            }}
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* 新增：设施设备类型配置 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-normal">设施设备类型配置</h2>
              <Button variant="outline" size="sm" onClick={addFacilityType} className="bg-white border-gray-200">
                <Plus className="h-4 w-4 mr-1" /> 添加
              </Button>
            </div>
            <div className="space-y-2">
              {facilityTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                  <span>{type}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeFacilityType(index)} className="h-6 w-6 p-0">
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 bg-white rounded-lg p-6">
            <h2 className="text-[17px] font-normal">应用楼层</h2>
            <div className="space-y-2">
              {buildings.map((building) => (
                <div key={building.id} className="space-y-2">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleBuildingExpand(building.id)}
                  >
                    <span className="font-medium">{building.name}</span>
                    {building.isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {building.isExpanded && (
                    <div className="pl-4 space-y-2">
                      {building.floors.map((floor) => (
                        <div key={floor.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={floor.id}
                            checked={selectedFloors.includes(floor.id)}
                            onChange={() => toggleFloorSelection(floor.id)}
                            className="mr-2"
                          />
                          <label htmlFor={floor.id}>{floor.name}</label>
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
      <Dialog open={isAddLocationDialogOpen} onOpenChange={setIsAddLocationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>添加点位</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                点位名称
              </label>
              <Input
                id="name"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddNewLocation}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


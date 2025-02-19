"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ChevronLeft, Plus, X, ChevronDown, ChevronRight, Copy, PlusCircle, Edit, Trash2, Upload } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface MediaFile {
  file: File
  preview: string
}

interface LocationType {
  name: string
  count: number
  facilities?: { name: string; id: string }[]
  isExpanded?: boolean
}

interface StandardFloor {
  id: string
  name: string
}

interface Floor {
  id: string
  name: string
}

interface Building {
  id: string
  name: string
  isExpanded: boolean
  floors: Floor[]
}

export default function EditBuilding() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const buildingName = searchParams.get("name") || "A栋"

  // 编辑楼栋部分的状态
  const [editBuildingName, setEditBuildingName] = useState(buildingName)
  const [buildingArea, setBuildingArea] = useState("10000")
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 配置楼栋部分的状态
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
  const [selectedStandardFloor, setSelectedStandardFloor] = useState<string>("")
  const [standardFloors, setStandardFloors] = useState<StandardFloor[]>([
    { id: "1", name: "标准层A" },
    { id: "2", name: "标准层B" },
  ])
  const [editingLocationIndex, setEditingLocationIndex] = useState<number | null>(null)
  const [facilityTypes, setFacilityTypes] = useState<string[]>(["地面", "天面", "照明灯", "防火门"])
  const [isAddLocationDialogOpen, setIsAddLocationDialogOpen] = useState(false)
  const [newLocationName, setNewLocationName] = useState("")
  const [selectedFloors, setSelectedFloors] = useState<string[]>([])
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

  const handleBack = () => {
    router.back()
  }

  // 编辑楼栋部分的函数
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      setMediaFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setMediaFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  // 配置楼栋部分的函数
  const handleStandardFloorSelect = (value: string) => {
    setSelectedStandardFloor(value)
    // 这里可以添加获取选定标准层的点位和设施设备类型的逻辑
  }

  const handleAddStandardFloor = () => {
    router.push("/add-standard-floor")
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
    const updatedLocations = [...locations]
    updatedLocations[index] = {
      ...updatedLocations[index],
      facilities: [...(updatedLocations[index].facilities || []), { name: "新设施", id: Date.now().toString() }],
    }
    setLocations(updatedLocations)
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

  const toggleFloorSelection = (floorId: string) => {
    setSelectedFloors((prevSelected) =>
      prevSelected.includes(floorId) ? prevSelected.filter((id) => id !== floorId) : [...prevSelected, floorId],
    )
  }

  const toggleBuildingExpand = (buildingId: string) => {
    setBuildings(
      buildings.map((building) =>
        building.id === buildingId ? { ...building, isExpanded: !building.isExpanded } : building,
      ),
    )
  }

  const handleSubmit = () => {
    console.log("楼栋编辑和配置:", {
      editBuildingName,
      buildingArea,
      mediaFiles,
      selectedStandardFloor,
      locations,
      facilityTypes,
      selectedFloors,
      buildings,
    })
    router.back()
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">编辑楼栋</h1>
        <div className="w-5" />
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-6">
          {/* 编辑楼栋部分 */}
          <section className="bg-white rounded-lg p-4 space-y-4">
            <div>
              <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700 mb-1">
                楼栋名称
              </label>
              <Input
                id="buildingName"
                value={editBuildingName}
                onChange={(e) => setEditBuildingName(e.target.value)}
                className="bg-white border-gray-200"
              />
            </div>
            <div>
              <label htmlFor="buildingArea" className="block text-sm font-medium text-gray-700 mb-1">
                建筑面积（平方米）
              </label>
              <Input
                id="buildingArea"
                type="number"
                value={buildingArea}
                onChange={(e) => setBuildingArea(e.target.value)}
                className="bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">照片/视频</label>
              <div className="flex flex-wrap gap-2">
                {mediaFiles.map((media, index) => (
                  <div key={index} className="relative w-20 h-20">
                    {media.file.type.startsWith("image/") ? (
                      <img
                        src={media.preview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <video src={media.preview} className="w-full h-full object-cover rounded" />
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-20 h-20 bg-white border-dashed border-2 border-gray-300"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-6 w-6 text-gray-400" />
                </Button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                multiple
                className="hidden"
              />
            </div>
          </section>

          {/* 配置楼栋部分 */}
          <section className="bg-white rounded-lg p-4 space-y-6">
            <h2 className="text-lg font-semibold">配置楼栋</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="standardFloor" className="block text-sm font-medium text-gray-700 mb-1">
                  选择标准层
                </label>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={handleStandardFloorSelect} value={selectedStandardFloor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择标准层" />
                    </SelectTrigger>
                    <SelectContent>
                      {standardFloors.map((floor) => (
                        <SelectItem key={floor.id} value={floor.id}>
                          {floor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleAddStandardFloor}>
                    <Plus className="h-4 w-4 mr-1" /> 新建
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">点位配置</h3>
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">设施设备类型配置</h3>
                  <Button variant="outline" size="sm" onClick={addFacilityType} className="bg-white border-gray-200">
                    <Plus className="h-4 w-4 mr-1" /> 添加
                  </Button>
                </div>
                <div className="space-y-2">
                  {facilityTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span>{type}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFacilityType(index)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">应用楼层</h3>
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
          </section>
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


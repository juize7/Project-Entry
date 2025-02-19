"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  ChevronLeft,
  Trash2,
  ArrowUpDown,
  PlusCircle,
  Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"

const handleDeleteFacilityType = (
  buildingName: string,
  floorName: string,
  locationName: string,
  facilityName: string,
) => {
  console.log(`Deleting facility type: ${facilityName} from ${buildingName} - ${floorName} - ${locationName}`)
  // Here you would implement the actual deletion logic
}

export default function ProjectDetail() {
  const router = useRouter()

  useEffect(() => {
    console.log("Router object:", router)
  }, [router])

  const handleEditProject = () => {
    console.log("编辑项目")
    router.push("/add-project")
  }

  const handleAddBuilding = () => {
    router.push("/add-building")
  }

  const handleEditBuilding = (buildingName: string) => {
    router.push(`/edit-building?name=${encodeURIComponent(buildingName)}`)
  }

  const handleEditFloor = (buildingName: string, floorName: string) => {
    router.push(`/edit-floor?building=${encodeURIComponent(buildingName)}&floor=${encodeURIComponent(floorName)}`)
  }

  const handleEditLocation = (buildingName: string, floorName: string, locationName: string) => {
    router.push(
      `/edit-location?building=${encodeURIComponent(buildingName)}&floor=${encodeURIComponent(floorName)}&location=${encodeURIComponent(locationName)}`,
    )
  }

  const handleManageStandardFloors = () => {
    router.push("/manage-standard-floors")
  }

  const handleAddSurrounding = () => {
    router.push("/add-surrounding")
  }

  const handleEditSurrounding = (surroundingName: string) => {
    router.push(`/edit-surrounding?name=${encodeURIComponent(surroundingName)}`)
  }

  const handleAddUndergroundParking = () => {
    router.push("/add-underground-parking")
  }

  const handleEditUndergroundParking = (parkingName: string) => {
    router.push(`/edit-underground-parking?name=${encodeURIComponent(parkingName)}`)
  }

  const handleDelete = (itemName: string) => {
    console.log(`删除 ${itemName}`)
    // 这里可以添加删除项目的逻辑
  }

  const handleConfigureStandardFloors = () => {
    router.push("/configure-standard-floors")
  }

  const handleSortStandardFloors = () => {
    console.log("排序标准层")
    // 这里可以添加排序标准层的逻辑
  }

  const handleAddToBuilding = (buildingName: string) => {
    router.push(`/add-floor?building=${encodeURIComponent(buildingName)}`)
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={() => router.push("/")} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">项目录入</h1>
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-3">
          {/* 项目选择模块 */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">项目</h2>
            </div>
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">XXX大厦</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleEditProject}>
                  <Edit className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </section>

          {/* 楼栋数据模块 */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">楼栋</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleSortStandardFloors}>
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleConfigureStandardFloors}>
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleManageStandardFloors}>
                  标准层
                </Button>
              </div>
            </div>
            <div className="px-4 pb-3">
              <div className="border border-gray-100 rounded-lg p-3 mb-3">
                <TreeItem
                  label="A栋"
                  childCount={0}
                  defaultExpanded
                  onEdit={() => handleEditBuilding("A栋")}
                  onDelete={() => handleDelete("A栋")}
                  onAdd={() => handleAddToBuilding("A栋")}
                  isBuilding={true}
                  buildingName={"A栋"}
                >
                  <TreeItem
                    label="天面"
                    childCount={0}
                    onEdit={() => handleEditFloor("A栋", "天面")}
                    onDelete={() => handleDelete("天面")}
                    isFloor={true}
                    buildingName={"A栋"}
                  />
                  <TreeItem
                    label="3层"
                    childCount={0}
                    onEdit={() => handleEditFloor("A栋", "3层")}
                    onDelete={() => handleDelete("3层")}
                    isFloor={true}
                    buildingName={"A栋"}
                  />
                  <TreeItem
                    label="2层"
                    childCount={0}
                    onEdit={() => handleEditFloor("A栋", "2层")}
                    onDelete={() => handleDelete("2层")}
                    isFloor={true}
                    buildingName={"A栋"}
                  />
                  <TreeItem
                    label="1层"
                    childCount={4}
                    defaultExpanded
                    onEdit={() => handleEditFloor("A栋", "1层")}
                    onDelete={() => handleDelete("1层")}
                    isFloor={true}
                    buildingName="A栋"
                  >
                    <TreeItem
                      label="架空层"
                      childCount={3}
                      defaultExpanded
                      onEdit={() => handleEditLocation("A栋", "1层", "架空层")}
                      onDelete={() => handleDelete("架空层")}
                      buildingName="A栋"
                      floorName="1层"
                    >
                      <FacilityItem label="地面" buildingName="A栋" floorName="1层" locationName="架空层" />
                      <FacilityItem label="墙面" buildingName="A栋" floorName="1层" locationName="架空层" />
                      <FacilityItem label="天花板" buildingName="A栋" floorName="1层" locationName="架空层" />
                    </TreeItem>
                    <TreeItem
                      label="大堂"
                      childCount={0}
                      onEdit={() => handleEditLocation("A栋", "1层", "大堂")}
                      onDelete={() => handleDelete("大堂")}
                      buildingName="A栋"
                      floorName="1层"
                    />
                    <TreeItem
                      label="电梯前室"
                      childCount={0}
                      onEdit={() => handleEditLocation("A栋", "1层", "电梯前室")}
                      onDelete={() => handleDelete("电梯前室")}
                      buildingName="A栋"
                      floorName="1层"
                    />
                    <TreeItem
                      label="电梯轿厢"
                      childCount={0}
                      onEdit={() => handleEditLocation("A栋", "1层", "电梯轿厢")}
                      onDelete={() => handleDelete("电梯轿厢")}
                      buildingName="A栋"
                      floorName="1层"
                    />
                  </TreeItem>
                  <TreeItem
                    label="B1"
                    childCount={0}
                    onEdit={() => handleEditFloor("A栋", "B1")}
                    onDelete={() => handleDelete("B1")}
                    isFloor={true}
                    buildingName={"A栋"}
                  />
                  <TreeItem
                    label="B2"
                    childCount={0}
                    onEdit={() => handleEditFloor("A栋", "B2")}
                    onDelete={() => handleDelete("B2")}
                    isFloor={true}
                    buildingName={"A栋"}
                  />
                </TreeItem>
                <TreeItem
                  label="B栋"
                  childCount={0}
                  onEdit={() => handleEditBuilding("B栋")}
                  onDelete={() => handleDelete("B栋")}
                  onAdd={() => handleAddToBuilding("B栋")}
                  isBuilding={true}
                  buildingName={"B栋"}
                />
                <TreeItem
                  label="C栋"
                  childCount={0}
                  onEdit={() => handleEditBuilding("C栋")}
                  onDelete={() => handleDelete("C栋")}
                  onAdd={() => handleAddToBuilding("C栋")}
                  isBuilding={true}
                  buildingName={"C栋"}
                />
              </div>
              <Button variant="outline" className="w-full h-10 bg-white border-gray-200" onClick={handleAddBuilding}>
                <Plus className="mr-2 h-4 w-4" /> 添加
              </Button>
            </div>
          </section>

          {/* 外围区域数据模块 */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">外围</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  标准层
                </Button>
              </div>
            </div>
            <div className="px-4 pb-3">
              <div className="border border-gray-100 rounded-lg p-3 mb-3">
                <TreeItem
                  label="一期外围"
                  childCount={4}
                  defaultExpanded
                  onEdit={() => handleEditSurrounding("一期外围")}
                  onDelete={() => handleDelete("一期外围")}
                  isSurroundingOrParking={true}
                  buildingName={"一期外围"}
                >
                  <TreeItem
                    label="车行道路"
                    childCount={0}
                    onEdit={() => handleEditLocation("一期外围", "车行道路", "车行道路")}
                    onDelete={() => handleDelete("车行道路")}
                    buildingName={"一期外围"}
                    floorName={"车行道路"}
                  />
                  <TreeItem
                    label="人行道路"
                    childCount={0}
                    onEdit={() => handleEditLocation("一期外围", "人行道路", "人行道路")}
                    onDelete={() => handleDelete("人行道路")}
                    buildingName={"一期外围"}
                    floorName={"人行道路"}
                  />
                  <TreeItem
                    label="车行出入口"
                    childCount={0}
                    onEdit={() => handleEditLocation("一期外围", "车行出入口", "车行出入口")}
                    onDelete={() => handleDelete("车行出入口")}
                    buildingName={"一期外围"}
                    floorName={"车行出入口"}
                  />
                  <TreeItem
                    label="人行出入口"
                    childCount={0}
                    onEdit={() => handleEditLocation("一期外围", "人行出入口", "人行出入口")}
                    onDelete={() => handleDelete("人行出入口")}
                    buildingName={"一期外围"}
                    floorName={"人行出入口"}
                  />
                </TreeItem>
                <TreeItem
                  label="二期外围"
                  childCount={0}
                  onEdit={() => handleEditSurrounding("二期外围")}
                  onDelete={() => handleDelete("二期外围")}
                  isSurroundingOrParking={true}
                  buildingName={"二期外围"}
                />
              </div>
              <Button variant="outline" className="w-full h-10 bg-white border-gray-200" onClick={handleAddSurrounding}>
                <Plus className="mr-2 h-4 w-4" /> 添加
              </Button>
            </div>
          </section>

          {/* 地下车库模块 */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">地下车库</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  标准层
                </Button>
              </div>
            </div>
            <div className="px-4 pb-3">
              <div className="border border-gray-100 rounded-lg p-3 mb-3">
                <TreeItem
                  label="B1"
                  childCount={3}
                  defaultExpanded
                  onEdit={() => handleEditUndergroundParking("B1")}
                  onDelete={() => handleDelete("B1")}
                  isSurroundingOrParking={true}
                  buildingName={"B1"}
                >
                  <TreeItem
                    label="防火分区1"
                    childCount={0}
                    onEdit={() => handleEditLocation("B1", "防火分区1", "防火分区1")}
                    onDelete={() => handleDelete("防火分区1")}
                    buildingName={"B1"}
                    floorName={"防火分区1"}
                  >
                    <FacilityItem label="防火分区1" buildingName="B1" floorName="防火分区1" locationName="防火分区1" />
                  </TreeItem>
                  <TreeItem
                    label="防火分区2"
                    childCount={0}
                    onEdit={() => handleEditLocation("B1", "防火分区2", "防火分区2")}
                    onDelete={() => handleDelete("防火分区2")}
                    buildingName={"B1"}
                    floorName={"防火分区2"}
                  >
                    <FacilityItem label="防火分区2" buildingName="B1" floorName="防火分区2" locationName="防火分区2" />
                  </TreeItem>
                  <TreeItem
                    label="防火分区3"
                    childCount={0}
                    onEdit={() => handleEditLocation("B1", "防火分区3", "防火分区3")}
                    onDelete={() => handleDelete("防火分区3")}
                    buildingName={"B1"}
                    floorName={"防火分区3"}
                  >
                    <FacilityItem label="防火分区3" buildingName="B1" floorName="防火分区3" locationName="防火分区3" />
                  </TreeItem>
                </TreeItem>
                <TreeItem
                  label="B2"
                  childCount={0}
                  onEdit={() => handleEditUndergroundParking("B2")}
                  onDelete={() => handleDelete("B2")}
                  isSurroundingOrParking={true}
                  buildingName={"B2"}
                />
              </div>
              <Button
                variant="outline"
                className="w-full h-10 bg-white border-gray-200"
                onClick={handleAddUndergroundParking}
              >
                <Plus className="mr-2 h-4 w-4" /> 添加
              </Button>
            </div>
          </section>
        </div>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button
          className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]"
          onClick={() => router.push("/project-confirmation")}
        >
          保存
        </Button>
      </footer>
    </div>
  )
}

function TreeItem({
  label,
  childCount,
  children,
  defaultExpanded = false,
  onEdit,
  onDelete,
  onAdd,
  isBuilding = false,
  isFloor = false,
  isSurroundingOrParking = false,
  buttons,
  buildingName,
  floorName,
}: {
  label: string
  childCount: number
  children?: React.ReactNode
  defaultExpanded?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onAdd?: () => void
  isBuilding?: boolean
  isFloor?: boolean
  isSurroundingOrParking?: boolean
  buttons?: React.ReactNode
  buildingName?: string
  floorName?: string
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const hasChildren = Boolean(children)

  const renderCount = () => {
    return null
  }

  return (
    <div className="py-1">
      <div className="flex items-center justify-between">
        <div
          className="flex-grow flex items-center cursor-pointer"
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 mr-1 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
            )
          ) : (
            <div className="w-4 mr-1" />
          )}
          <span className="text-gray-700 flex items-center">
            <span className="font-medium">{label}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {isBuilding && onAdd && (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onAdd}>
              <PlusCircle className="h-4 w-4 text-gray-400" />
            </Button>
          )}
          {onEdit && (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onEdit}>
              <Edit className="h-4 w-4 text-gray-400" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-gray-400" />
            </Button>
          )}
          {buttons && <div className="flex items-center space-x-2">{buttons}</div>}
        </div>
      </div>
      {isExpanded && children && (
        <div className="pl-5 mt-1">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { buildingName, floorName: label, locationName: label })
            }
            return child
          })}
        </div>
      )}
    </div>
  )
}

function FacilityItem({
  label,
  buildingName,
  floorName,
  locationName,
}: { label: string; buildingName: string; floorName: string; locationName: string }) {
  return (
    <div className="py-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-4 mr-1" />
          <span className="text-gray-600">{label}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => handleDeleteFacilityType(buildingName, floorName, locationName, label)}
        >
          <Trash2 className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
    </div>
  )
}


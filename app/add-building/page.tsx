"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddBuilding() {
  const router = useRouter()
  const [batchAdd, setBatchAdd] = useState(false)
  const [buildingName, setBuildingName] = useState("")
  const [startBuildingName, setStartBuildingName] = useState("")
  const [buildingCount, setBuildingCount] = useState("")
  const [aboveGroundFloors, setAboveGroundFloors] = useState("")
  const [undergroundFloors, setUndergroundFloors] = useState("")
  const [buildingArea, setBuildingArea] = useState("")
  const [buildingPreview, setBuildingPreview] = useState<string[]>([])

  useEffect(() => {
    if (batchAdd && startBuildingName && buildingCount) {
      const count = Number.parseInt(buildingCount)
      const names = []
      for (let i = 0; i < count; i++) {
        const charCode = startBuildingName.charCodeAt(0) + i
        names.push(String.fromCharCode(charCode) + "栋")
      }
      setBuildingPreview(names)
    } else {
      setBuildingPreview([])
    }
  }, [batchAdd, startBuildingName, buildingCount])

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理表单提交逻辑
    console.log("Form submitted")
    router.back()
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">添加楼栋</h1>
        <div className="w-5" /> {/* Spacer for centering */}
      </header>

      <ScrollArea className="flex-grow">
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <section className="bg-white rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="batchAdd" className="text-base font-normal">
                批量添加楼栋
              </Label>
              <Switch id="batchAdd" checked={batchAdd} onCheckedChange={setBatchAdd} />
            </div>

            {batchAdd ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="startBuildingName">起始楼栋名称</Label>
                  <Input
                    id="startBuildingName"
                    value={startBuildingName}
                    onChange={(e) => setStartBuildingName(e.target.value)}
                    placeholder="例如：A"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="buildingName">楼栋名称</Label>
                <Input
                  id="buildingName"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  placeholder="输入楼栋名称"
                />
              </div>
            )}

            <div>
              <Label htmlFor="buildingArea">建筑面积（平方米）</Label>
              <Input
                id="buildingArea"
                type="number"
                value={buildingArea}
                onChange={(e) => setBuildingArea(e.target.value)}
                placeholder="输入建筑面积"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aboveGroundFloors">地上层数</Label>
                <Input
                  id="aboveGroundFloors"
                  type="number"
                  value={aboveGroundFloors}
                  onChange={(e) => setAboveGroundFloors(e.target.value)}
                  placeholder="输入地上层数"
                />
              </div>
              <div>
                <Label htmlFor="undergroundFloors">地下层数</Label>
                <Input
                  id="undergroundFloors"
                  type="number"
                  value={undergroundFloors}
                  onChange={(e) => setUndergroundFloors(e.target.value)}
                  placeholder="输入地下层数"
                />
              </div>
            </div>
            {batchAdd && (
              <>
                <div>
                  <Label htmlFor="buildingCount">批量添加楼栋数量</Label>
                  <Input
                    id="buildingCount"
                    type="number"
                    value={buildingCount}
                    onChange={(e) => setBuildingCount(e.target.value)}
                    placeholder="例如：5"
                  />
                </div>
                <div>
                  <Label>批量添加楼栋预览</Label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-600">
                      {buildingPreview.length > 0 ? buildingPreview.join("、") : "请填写起始楼栋名称和批量添加楼栋数量"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </section>
        </form>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]"
        >
          确认添加
        </Button>
      </footer>
    </div>
  )
}


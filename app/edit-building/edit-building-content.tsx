"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Plus, X } from "lucide-react"

export default function EditBuildingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const buildingName = searchParams.get("name") || "未知楼栋"

  const [name, setName] = useState(buildingName)
  const [area, setArea] = useState("")
  const [aboveGroundFloors, setAboveGroundFloors] = useState("")
  const [undergroundFloors, setUndergroundFloors] = useState("")
  const [mediaFiles, setMediaFiles] = useState<{ file: File; preview: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleBack = () => {
    router.back()
  }

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

  const handleSubmit = () => {
    console.log("Submitting:", { name, area, aboveGroundFloors, undergroundFloors, mediaFiles })
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
          <section className="bg-white rounded-lg p-4 space-y-4">
            <div>
              <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700">
                楼栋名称
              </label>
              <Input
                id="buildingName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
                placeholder="输入楼栋名称"
              />
            </div>
            <div>
              <label htmlFor="buildingArea" className="block text-sm font-medium text-gray-700">
                建筑面积（平方米）
              </label>
              <Input
                id="buildingArea"
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="mt-1"
                placeholder="输入建筑面积"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="aboveGroundFloors" className="block text-sm font-medium text-gray-700">
                  地上层数
                </label>
                <Input
                  id="aboveGroundFloors"
                  type="number"
                  value={aboveGroundFloors}
                  onChange={(e) => setAboveGroundFloors(e.target.value)}
                  className="mt-1"
                  placeholder="输入地上层数"
                />
              </div>
              <div>
                <label htmlFor="undergroundFloors" className="block text-sm font-medium text-gray-700">
                  地下层数
                </label>
                <Input
                  id="undergroundFloors"
                  type="number"
                  value={undergroundFloors}
                  onChange={(e) => setUndergroundFloors(e.target.value)}
                  className="mt-1"
                  placeholder="输入地下层数"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">照片/视频</label>
              <div className="mt-1 flex flex-wrap gap-2">
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
                  <Plus className="h-6 w-6 text-gray-400" />
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


"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface MediaFile {
  file: File
  preview: string
}

export default function EditFloor() {
  const router = useRouter()
  const [floorName, setFloorName] = useState("3层")
  const [floorArea, setFloorArea] = useState("1000")
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
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
    console.log("Floor edited:", { floorName, floorArea, mediaFiles })
    router.back()
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">编辑楼层</h1>
        <div className="w-5" /> {/* Spacer for centering */}
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Floor name, area, and media upload */}
          <section className="bg-white rounded-lg p-4 space-y-4">
            <div>
              <Label htmlFor="floorName">楼层名称</Label>
              <Input
                id="floorName"
                value={floorName}
                onChange={(e) => setFloorName(e.target.value)}
                className="bg-white border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="floorArea">楼层面积（平方米）</Label>
              <Input
                id="floorArea"
                type="number"
                value={floorArea}
                onChange={(e) => setFloorArea(e.target.value)}
                className="bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-[17px] font-normal">照片/视频</h2>
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
                      <X className="w-4 w-4" />
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


"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EditLocation() {
  const router = useRouter()
  const [locationName, setLocationName] = useState("架空层")
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

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">编辑点位</h1>
        <div className="w-5" /> {/* Spacer for centering */}
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-6">
          {/* Location Name and Media Upload Combined */}
          <section className="bg-white rounded-lg p-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-[17px] font-normal">点位名称</h2>
                <Input
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="bg-white border-gray-200"
                  placeholder="输入点位名称"
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
            </div>
          </section>
        </div>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]">保存</Button>
      </footer>
    </div>
  )
}


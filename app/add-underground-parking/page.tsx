"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface UndergroundParkingType {
  id: string
  name: string
}

interface LocationType {
  name: string
  count: number
  facilities: { name: string; id: string }[]
  isExpanded: boolean
}

export default function AddUndergroundParking() {
  const router = useRouter()
  const [parkingName, setParkingName] = useState("")
  const [mediaFiles, setMediaFiles] = useState<{ file: File; preview: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isParkingListDialogOpen, setIsParkingListDialogOpen] = useState(false)
  const [existingParkings] = useState<UndergroundParkingType[]>([
    { id: "1", name: "B1" },
    { id: "2", name: "B2" },
    { id: "3", name: "B3" },
  ])
  const [locations, setLocations] = useState<LocationType[]>([])

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

  const openParkingListDialog = () => {
    setIsParkingListDialogOpen(true)
  }

  const closeParkingListDialog = () => {
    setIsParkingListDialogOpen(false)
  }

  const copyLocationsFromParking = (parkingId: string) => {
    // 这里通常会从选定的地下车库获取位置并更新当前地下车库的位置。
    // 为了演示功能，我们只添加一个虚拟位置。
    const newLocation: LocationType = {
      name: `从${existingParkings.find((p) => p.id === parkingId)?.name}复制的位置`,
      count: 1,
      facilities: [{ name: "复制的设施", id: Date.now().toString() }],
      isExpanded: false,
    }
    setLocations([...locations, newLocation])
    closeParkingListDialog()
  }

  const handleSubmit = () => {
    // 处理表单提交
    console.log("Form submitted:", { parkingName, mediaFiles, locations })
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">添加地下车库</h1>
        <div className="w-5" /> {/* Spacer for centering */}
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-6">
          {/* Underground Parking Name and Media Upload Combined */}
          <section className="bg-white rounded-lg p-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-[17px] font-normal">地下车库名称</h2>
                <Input
                  value={parkingName}
                  onChange={(e) => setParkingName(e.target.value)}
                  className="bg-white border-gray-200"
                  placeholder="输入地下车库名称"
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
        <Button onClick={handleSubmit} className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]">
          保存
        </Button>
      </footer>

      {/* Underground Parking List Dialog */}
      <Dialog open={isParkingListDialogOpen} onOpenChange={setIsParkingListDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>选择地下车库</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ScrollArea className="h-[300px] pr-4">
              {existingParkings.map((parking) => (
                <Button
                  key={parking.id}
                  variant="outline"
                  onClick={() => copyLocationsFromParking(parking.id)}
                  className="w-full justify-start mb-2"
                >
                  {parking.name}
                </Button>
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


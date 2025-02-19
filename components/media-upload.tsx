"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface MediaFile {
  file: File
  preview: string
}

export function MediaUpload() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    <div className="space-y-2">
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
  )
}
\
"


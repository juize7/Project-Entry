"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddProject() {
  const router = useRouter()
  const [projectName, setProjectName] = useState("")
  const [buildingArea, setBuildingArea] = useState("")
  const [projectAddress, setProjectAddress] = useState("")
  const [projectManager, setProjectManager] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [projectPlan, setProjectPlan] = useState<File | null>(null)

  const handleBack = () => {
    router.back()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProjectPlan(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理表单提交逻辑
    console.log("Form submitted", {
      projectName,
      buildingArea,
      projectAddress,
      projectManager,
      contactPhone,
      projectPlan,
    })
    router.push("/project-list")
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-normal">编辑项目</h1>
        <div className="w-5" /> {/* Spacer for centering */}
      </header>

      <ScrollArea className="flex-grow">
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">项目名称</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-white border-gray-200"
                placeholder="输入项目名称"
              />
            </div>
            <div>
              <Label htmlFor="buildingArea">建筑面积（平方米）</Label>
              <Input
                id="buildingArea"
                type="number"
                value={buildingArea}
                onChange={(e) => setBuildingArea(e.target.value)}
                className="bg-white border-gray-200"
                placeholder="输入建筑面积"
              />
            </div>
            <div>
              <Label htmlFor="projectAddress">项目地址</Label>
              <Input
                id="projectAddress"
                value={projectAddress}
                onChange={(e) => setProjectAddress(e.target.value)}
                className="bg-white border-gray-200"
                placeholder="输入项目地址"
              />
            </div>
            <div>
              <Label htmlFor="projectManager">项目负责人</Label>
              <Input
                id="projectManager"
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}
                className="bg-white border-gray-200"
                placeholder="输入项目负责人姓名"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">联系电话</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="bg-white border-gray-200"
                placeholder="输入联系电话"
              />
            </div>
            <div>
              <Label htmlFor="projectPlan">项目平面图</Label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="projectPlan"
                  className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <span className="flex items-center space-x-2">
                    <Upload className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-600">
                      {projectPlan ? projectPlan.name : "点击上传图片或PDF文件"}
                    </span>
                  </span>
                  <input
                    id="projectPlan"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </ScrollArea>

      <footer className="bg-white p-4 shadow-sm">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]"
        >
          保存
        </Button>
      </footer>
    </div>
  )
}


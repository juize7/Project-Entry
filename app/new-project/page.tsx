"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewProject() {
  const router = useRouter()

  const handleAddProject = () => {
    router.push("/add-project")
  }

  const handleAddBuilding = () => {
    router.push("/add-building")
  }

  const handleAddSurrounding = () => {
    router.push("/add-surrounding")
  }

  const handleAddUndergroundParking = () => {
    router.push("/add-underground-parking")
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
          {/* Project Module */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">项目</h2>
            </div>
            <div className="px-4 pb-3">
              <Button variant="outline" className="w-full h-10 bg-white border-gray-200" onClick={handleAddProject}>
                <Plus className="mr-2 h-4 w-4" /> 添加
              </Button>
            </div>
          </section>

          {/* Building Data Module */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">楼栋</h2>
            </div>
            <div className="px-4 pb-3">
              <Button variant="outline" className="w-full h-10 bg-white border-gray-200" onClick={handleAddBuilding}>
                <Plus className="mr-2 h-4 w-4" /> 添加
              </Button>
            </div>
          </section>

          {/* Surrounding Area Data Module */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">外围</h2>
            </div>
            <div className="px-4 pb-3">
              <Button variant="outline" className="w-full h-10 bg-white border-gray-200" onClick={handleAddSurrounding}>
                <Plus className="mr-2 h-4 w-4" /> 添加
              </Button>
            </div>
          </section>

          {/* Underground Parking Module */}
          <section className="bg-white rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <h2 className="text-[17px] font-normal">地下车库</h2>
            </div>
            <div className="px-4 pb-3">
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
        <Button className="w-full h-11 bg-[#4086F4] hover:bg-[#4086F4]/90 text-[17px]" onClick={() => router.push("/")}>
          保存
        </Button>
      </footer>
    </div>
  )
}


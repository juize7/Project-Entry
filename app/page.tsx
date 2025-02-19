"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <h1 className="flex-1 text-center text-[17px] font-normal">小程序功能入口</h1>
      </header>

      <div className="px-8 pt-8 grid grid-cols-2 gap-6">
        <button
          className="aspect-square rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-900 text-lg hover:bg-gray-50"
          onClick={() => console.log("工单作业")}
        >
          工单作业
        </button>

        <button
          className="aspect-square rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-900 text-lg hover:bg-gray-50"
          onClick={() => console.log("缺陷扫描")}
        >
          缺陷扫描
        </button>

        <button
          className="aspect-square rounded-lg border border-gray-200 bg-[#EBF3FF] flex flex-col items-center justify-center text-[#4086F4] text-lg relative"
          onClick={() => router.push("/project-list")}
        >
          <span>项目录入</span>
          <span className="text-sm mt-1">(当前)</span>
        </button>
      </div>
    </div>
  )
}


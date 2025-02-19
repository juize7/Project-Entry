"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type React from "react"

interface TreeNode {
  id: string
  name: string
  type: "project" | "building" | "floor" | "location" | "facility"
  children?: TreeNode[]
  details?: Record<string, string | number | string[]>
}

const mockData: TreeNode = {
  id: "1",
  name: "XXX大厦",
  type: "project",
  details: {
    项目名称: "XXX大厦",
    建筑面积: "50000平方米",
    项目地址: "某某市某某区某某街道",
    项目负责人: "张三",
    联系电话: "123-4567-8900",
    项目平面图: "/placeholder.svg?height=200&width=300",
  },
  children: [
    {
      id: "2",
      name: "A栋",
      type: "building",
      details: {
        楼栋名称: "A栋",
        建筑面积: "20000平方米",
        "照片/视频": ["/placeholder.svg?height=100&width=150", "/placeholder.svg?height=100&width=150"],
      },
      children: [
        {
          id: "3",
          name: "1层",
          type: "floor",
          details: {
            楼层名称: "1层",
            楼层面积: "2000平方米",
            "照片/视频": ["/placeholder.svg?height=100&width=150"],
          },
          children: [
            {
              id: "4",
              name: "大堂",
              type: "location",
              details: {
                点位名称: "大堂",
                点位面积: "500平方米",
                "照片/视频": ["/placeholder.svg?height=100&width=150", "/placeholder.svg?height=100&width=150"],
              },
              children: [
                { id: "5", name: "地面", type: "facility" },
                { id: "6", name: "天花板", type: "facility" },
                { id: "7", name: "前台", type: "facility" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "8",
      name: "外围",
      type: "building",
      details: {
        外围名称: "项目外围",
        外围面积: "5000平方米",
        "照片/视频": [],
      },
      children: [
        {
          id: "9",
          name: "停车场",
          type: "location",
          details: {
            点位名称: "停车场",
            点位面积: "3000平方米",
            "照片/视频": [],
          },
          children: [
            { id: "10", name: "地面", type: "facility" },
            { id: "11", name: "车位线", type: "facility" },
          ],
        },
      ],
    },
    {
      id: "12",
      name: "地下车库",
      type: "building",
      details: {
        车库名称: "地下车库",
        车库面积: "10000平方米",
        "照片/视频": [],
      },
      children: [
        {
          id: "13",
          name: "B1",
          type: "floor",
          details: {
            楼层名称: "B1",
            楼层面积: "5000平方米",
            "照片/视频": [],
          },
          children: [
            {
              id: "14",
              name: "车位区",
              type: "location",
              details: {
                点位名称: "车位区",
                点位面积: "4500平方米",
                "照片/视频": [],
              },
              children: [
                { id: "15", name: "地面", type: "facility" },
                { id: "16", name: "车位线", type: "facility" },
                { id: "17", name: "照明", type: "facility" },
              ],
            },
          ],
        },
      ],
    },
  ],
}

function TreeNodeComponent({
  node,
  level = 0,
  onNodeClick,
}: {
  node: TreeNode
  level?: number
  onNodeClick: (node: TreeNode) => void
}) {
  const [isExpanded, setIsExpanded] = useState(level === 0)

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const handleNodeClick = () => {
    onNodeClick(node)
  }

  return (
    <div key={node.id}>
      <div
        className="flex items-center h-10 px-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
        onClick={handleNodeClick}
      >
        <div style={{ marginLeft: `${level * 20}px` }} className="flex items-center">
          {node.children && node.children.length > 0 && (
            <span onClick={toggleExpand} className="mr-2">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </span>
          )}
          <span className={`text-sm ${node.type === "facility" ? "text-gray-900" : "text-[#4086F4] hover:underline"}`}>
            {node.name}
          </span>
        </div>
      </div>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNodeComponent key={child.id} node={child} level={level + 1} onNodeClick={onNodeClick} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectConfirmation() {
  const router = useRouter()
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node)
  }

  const handleConfirmButtonClick = () => {
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmDialogClose = () => {
    setIsConfirmDialogOpen(false)
  }

  const handleConfirmProject = () => {
    console.log("项目确认完成")
    setIsConfirmDialogOpen(false)
    // Here you would typically handle the project confirmation,
    // such as sending data to a server or updating the app state
  }

  const renderDetails = (node: TreeNode) => {
    if (!node.details) return null
    return (
      <div className="border-t border-l border-r border-gray-200">
        {Object.entries(node.details).map(([key, value], index) => (
          <div
            key={key}
            className={`flex border-b border-gray-200 hover:bg-gray-50 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
            }`}
          >
            <div className="w-32 p-3 border-r border-gray-200 bg-gray-50">
              <span className="text-sm text-gray-600">{key}</span>
            </div>
            <div className="flex-1 p-3">
              {key === "照片/视频" || key === "项目平面图" ? (
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(value) ? (
                    value.map((url, index) => (
                      <img
                        key={index}
                        src={url || "/placeholder.svg"}
                        alt={`${key} ${index + 1}`}
                        className="w-32 h-24 object-cover rounded border border-gray-200"
                      />
                    ))
                  ) : (
                    <img
                      src={(value as string) || "/placeholder.svg"}
                      alt={key}
                      className="w-48 h-36 object-cover rounded border border-gray-200"
                    />
                  )}
                </div>
              ) : (
                <span className="text-sm">{value as string}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          返回
        </Button>
        <h1 className="flex-1 text-center text-xl font-semibold">项目确认</h1>
      </header>
      <div className="px-4 py-2 bg-white border-b">
        <Button onClick={handleConfirmButtonClick} className="bg-[#4086F4] text-white">
          项目录入确认
        </Button>
      </div>
      <div className="flex-1 overflow-hidden bg-white">
        <div className="flex h-full">
          <div className="w-1/3 border-r border-gray-200">
            <div className="h-10 flex items-center px-4 border-b border-gray-200 bg-gray-50">
              <span className="text-sm font-medium">项目数据</span>
            </div>
            <ScrollArea className="h-[calc(100%-40px)]">
              <TreeNodeComponent node={mockData} onNodeClick={handleNodeClick} />
            </ScrollArea>
          </div>
          <div className="flex-1">
            <div className="h-10 flex items-center px-4 border-b border-gray-200 bg-gray-50">
              <span className="text-sm font-medium">详细信息</span>
            </div>
            <ScrollArea className="h-[calc(100%-40px)]">
              <div className="p-4">
                {selectedNode ? (
                  renderDetails(selectedNode)
                ) : (
                  <div className="text-center text-sm text-gray-500 p-4">请选择左侧项目结构查看详细信息</div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认项目录入</DialogTitle>
            <DialogDescription>是否确认录入该项目数据？已确认数据在小程序项目录入中不可编辑和删除。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleConfirmDialogClose}>
              取消
            </Button>
            <Button onClick={handleConfirmProject}>确认</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


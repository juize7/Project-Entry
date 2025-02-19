"use client"
import { useRouter, useSearchParams } from "next/navigation"

// ... (rest of the imports and interfaces remain the same)

export default function ConfigureFloorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const buildingName = searchParams.get("building")
  const floorName = searchParams.get("floor")

  // ... (rest of the component logic remains the same)

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F7F7F7]">
      {/* ... (rest of the JSX remains the same) */}
    </div>
  )
}


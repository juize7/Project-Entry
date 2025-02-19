"use client"

import { Suspense } from "react"
import AddFloorContent from "./add-floor-content"

export default function AddFloor() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddFloorContent />
    </Suspense>
  )
}


"use client"

import { Suspense } from "react"
import ConfigureFloorContent from "./configure-floor-content"

export default function ConfigureFloor() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfigureFloorContent />
    </Suspense>
  )
}


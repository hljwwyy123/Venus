import React, { useEffect } from "react"
import init, { animate } from "./index"

export default {
  title: "GL",
  component: [Earth3D]
}

export function Earth3D() {
  useEffect(() => {
    init();
    setTimeout(() => {
      animate()
    }, 500);
  }, [])
  return (
    <canvas id="three-container" width="1000" height="600"></canvas>
  )
}
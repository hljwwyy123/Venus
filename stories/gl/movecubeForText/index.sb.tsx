import React, { useEffect, useState } from "react"
import init from "./index"

export default {
  title: "GL",
  component: [CubeForText]
}

export function CubeForText() {
  useEffect(() => {
    setTimeout(() => {

      init()
    }, 500);
  }, [])
  return (
    <>
    <div id="three-container"></div>
    <canvas id="dot_canvas"></canvas> 
    <div className="controls">
      <span className="btn left disabled">-</span><span className="count">1</span><span className="btn right">+</span>
    </div>
    </>
  )
}
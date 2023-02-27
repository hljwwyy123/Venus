import React, { useEffect } from "react"
// import init from "./animate"
import init from "./index"

export default {
  title: "移动的方块",
  component: [RotateCube]
}

export function RotateCube() {
  useEffect(() => {
    setTimeout(() => {
      init()
    }, 500);
  }, [])
  return (
    <>
    <div id="three-container"></div>
    <div className="controls">
      <span className="btn left disabled">-</span><span className="count">1</span><span className="btn right">+</span>
    </div>
    </>
  )
}
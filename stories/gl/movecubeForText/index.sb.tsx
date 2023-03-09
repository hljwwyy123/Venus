import React, { useEffect, useState } from "react"
import init from "./index"

export default {
  title: "GL",
  component: [CubeForText]
}

export function CubeForText() {
  useEffect(() => {
      init('王新一', "#three-container")
  }, [])
  return (
    <>
      <div id="three-container"></div>
    </>
  )
}
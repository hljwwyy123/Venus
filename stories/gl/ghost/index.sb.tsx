import React, { useEffect } from "react"
import Viz from ".";

export default {
  title: "GL",
  component: [Ghost]
}

export function Ghost() {
  useEffect(() => {
    const viz = new Viz();

    viz.updateSize();
    window.addEventListener('resize', () => viz.updateSize());

    viz.loop();
  }, [])
  return (
    <div className="viz"></div>
  )
}
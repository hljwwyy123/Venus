import React, { useState, useEffect }  from "react"
import DrawText from "./animate"
import "./drawImage.css"

export default function DrawImageData() {
  useEffect(() => {
    const animate = new DrawText();
    setTimeout(() => {
      animate.init({
        paintDom: 'dot_canvas', 
        stageSize: {
          width: 600,
          height: 300
        },
        pixelSize: {
          w: 4,
          h: 4
        }
      });
      animate.drawPixelText(1122)
    }, 300);
  }, [])

  return <div className="draw-text-container">
  <canvas id="dot_canvas"></canvas> 
</div>
}
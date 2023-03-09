import React, { useEffect }  from "react"
import DrawText from "./animate"
import "./drawImage.css"

export default function DrawImageData() {
  useEffect(() => {
    const animate = new DrawText();
      animate.init({
        container: ".draw-text-container",
        paint: true,
        stageSize: {
          width: 600,
          height: 300
        },
        pixelSize: {
          w: 4,
          h: 4
        },
      });
      animate.drawPixelText(1122)
  }, [])

  return <div className="draw-text-container">
  {/* <canvas id="dot_canvas"></canvas>  */}
</div>
}
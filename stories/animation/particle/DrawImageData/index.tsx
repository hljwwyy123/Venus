import React, { useEffect }  from "react"
import Demo from "./animate"
import "./drawImage.css"

export default function DrawImageData() {
  useEffect(() => {
    const animate = new Demo();
    setTimeout(() => {
      animate.init('number_canvas', 'a');
    }, 300);
  }, [])

  return <div className="draw-text-container">
  <canvas width="400" height="400" id="number_canvas"></canvas> 
  <hr />
  <canvas width="400" height="400" id="dot_canvas"></canvas> 
</div>
}
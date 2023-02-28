import React, { useState, useEffect }  from "react"
import Demo from "./animate"
import "./drawImage.css"

export default function DrawImageData() {
  const [size, setSize] = useState({width: 800, height:600})
  useEffect(() => {
    const animate = new Demo();
    setTimeout(() => {
      animate.init('dot_canvas', '1234');
    }, 300);
  }, [])

  return <div className="draw-text-container">
  <canvas width={size.width} height={size.height} id="dot_canvas"></canvas> 
</div>
}
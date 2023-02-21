import React, { useEffect }  from "react"
import init, { animate, countdown } from "./animate"
import "./particle.css"

export default function TweenParticle() {
  useEffect(() => {
    setTimeout(() => {
      init('number_canvas', 'dot_canvas')
      animate();
      countdown();
    }, 100);
  }, [])

  return <div className="particle-container">
  <canvas id="number_canvas"></canvas> 
  <canvas id="dot_canvas"></canvas> 
</div>
}
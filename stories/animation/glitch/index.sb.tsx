import React from "react"
import "./glitch.css"

export default {
  title: "Glitch",
  component: Glitch
}

export function Glitch() {
  return <div className="glitch-container">
  <div className="glitch" data-text="LOADING">LOADING</div> 
</div>
}
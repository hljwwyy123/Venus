let id = 0


export function startFPS() {
  let frameCount = 0
  let fpsDiv = document.querySelector('#fps')
  if (!fpsDiv) {
    fpsDiv = document.createElement("div");
    fpsDiv.setAttribute("id","fps")
    document.body.appendChild(fpsDiv)
  }
  
  let lastTime = performance.now()
  const caculateFps = () => {
      frameCount++
      const now = performance.now()
    
      if(now - lastTime >=1000){
        const preFrameSeconds = (now - lastTime) * 0.001/ frameCount
        fpsDiv.innerHTML ='fps: '+ Math.round(1/preFrameSeconds)
        frameCount = 0;
        lastTime = now;
      }
    id = requestAnimationFrame(caculateFps)
  }
  caculateFps()
}
export function stopFPS() {
  cancelAnimationFrame(id)
}
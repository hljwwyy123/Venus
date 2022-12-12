import React, { useEffect, useState } from "react";
import loadImages from "image-promise";

function KeyPress() {
  this.keyListeners = []
}

KeyPress.prototype = {
  addKeyListener: function(keyAndListener) {
    this.keyListeners.push(keyAndListener)
  },

  findKeyListener: function(key) {
    var listener = undefined

    this.keyListeners.forEach(function(keyAndListener) {
      var currentKey = keyAndListener.key
      if(currentKey === key) {
        listener = keyAndListener.listener
      }
    })

    return listener
  },

  keyPressed: function(e) {
    var listener = undefined,
      key = undefined

    switch (e.keyCode) {
      case 32: key = 'space'; break;
      case 37: key = 'left'; break;
      case 39: key = 'right'; break;
      case 38: key = 'up'; break;
      case 40: key = 'down'; break;
    }
    listener = this.findKeyListener(key)
    if(listener) {
      listener()
    }
  }
}
function Sprite(arg) {
  this.left = arg.left || 0
  this.top = arg.top || 0
  this.width = arg.width || 10
  this.height = arg.height || 10
  this.visible = true
  this.image = arg.image
}

Sprite.prototype = {
  paint: function(context) {
    if(this.visible) {
      context.save()
      context.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                        this.left, this.top, this.width, this.height)
      context.restore()
    }
  }
}


function detectIntersection(rect1, rect2) {
  var rect2CenterX = rect2.left + rect2.width/2,
    rect2CenterY = rect2.top + rect2.height/2,
    rect1CenterX = rect1.left + rect1.width/2,
    rect1CenterY = rect1.top + rect1.height/2;

    // 加上 = 就是相切
    if((Math.abs(rect2CenterX - rect1CenterX) < rect1.width / 2 + rect2.width / 2) &&
        Math.abs(rect2CenterY - rect1CenterY) < rect1.height / 2 + rect2.height / 2) {
      return true
    } else {
      return false
    }
}

function getIntersectionRect(rect1, rect2) {
  var rect1Right = rect1.left + rect1.width,
    rect1Bottom = rect1.top + rect1.height,
    rect2Right = rect2.left + rect2.width,
    rect2Bottom = rect2.top + rect2.height;

  var rect3Left = Math.max(rect1.left, rect2.left),
    rect3Top = Math.max(rect1.top, rect2.top),
    rect3Right = Math.min(rect1Right, rect2Right),
    rect3Bottom = Math.min(rect1Bottom, rect2Bottom);

  return {
    left: rect3Left,
    top: rect3Top,
    width: rect3Right - rect3Left,
    height: rect3Bottom - rect3Top
  }
}


  // rect 是交集矩形
  function handleEgdeCollisions(rect, ctx1, ctx2) {
    var imgData1 = ctx1.getImageData(rect.left, rect.top, rect.width, rect.height),
      imgData2 = ctx2.getImageData(rect.left, rect.top, rect.width, rect.height);
    var imgData1Data = imgData1.data
    var imgData2Data = imgData2.data
  
    for(var i = 3, len = imgData1Data.length; i < len; i += 4) {
      if(imgData1Data[i] > 0 && imgData2Data[i] > 0) {
        return true
      }
    }
    return false
  }


export default function Pixel() {
  
  let onscreenCanvas = null;
  let onscreenContext = null;
  let offscreenCanvasObjectA = null;
  let offscreenCanvasObjectB = null;
  let offscreenContextObjectB = null;
  let offscreenContextobjectA = null;
  let imageA = new Image();
  let imageB = new Image();
  
  let isCollisions = false;
  
  let objectA = null;
  let ObjectB = null;
  let keyPress = new KeyPress()

  async function init() {
    onscreenCanvas = document.getElementById('canvas');
    onscreenContext = onscreenCanvas.getContext('2d');
    offscreenCanvasObjectB = document.createElement('canvas');
    offscreenCanvasObjectA = document.createElement('canvas');
    
    offscreenContextObjectB = offscreenCanvasObjectB.getContext('2d');
    offscreenContextobjectA = offscreenCanvasObjectA.getContext('2d');
    offscreenCanvasObjectB.id = `ObjectB`
    offscreenCanvasObjectA.id = `objectA`
    
    offscreenCanvasObjectB.width = offscreenCanvasObjectA.width = 200
    offscreenCanvasObjectB.height = offscreenCanvasObjectA.height = 100
    
    var offscreenCanvasWrap = document.getElementById('offscreenCanvasWrap')
    offscreenCanvasWrap.querySelector('.ObjectB').appendChild(offscreenCanvasObjectB)
    offscreenCanvasWrap.querySelector('.objectA').appendChild(offscreenCanvasObjectA)

    imageA.src = '/images/me.png';
    imageB.src = '/images/enemy.png';
    loadImages([imageA, imageB]).then(() => {
      addKeyEventListener();
      objectA = new Sprite({
        width: 30,
        height: 30,
        left: 40,
        top: 40,
        image: imageA
      })
      
      ObjectB = new Sprite({
        width: 30,
        height: 30,
        top: 10,
        left: 30,
        image: imageB
      })
    })
    window.addEventListener('keypress', function(e) {
      e.preventDefault()
      keypressHandle(e)
    }, false)
    window.addEventListener('keydown', function(e) {
      e.preventDefault()
      keypressHandle(e)
    }, false)
  
  }

  

  function addKeyEventListener() {
    keyPress.addKeyListener({
      key: 'right',
      listener: function() {
        ObjectB.left += 1
      }
    })
    
    keyPress.addKeyListener({
      key: 'left',
      listener: function() {
        ObjectB.left -= 1
      }
    })
    
    keyPress.addKeyListener({
      key: 'up',
      listener: function() {
        ObjectB.top -= 1
      }
    })
    
    keyPress.addKeyListener({
      key: 'down',
      listener: function() {
        ObjectB.top += 1
      }
    })
    
  }
  

  function keypressHandle(e) {
    keyPress.keyPressed(e)
    if(detectIntersection(ObjectB, objectA)) {
      var intersectionRect = getIntersectionRect(ObjectB, objectA)
      isCollisions = handleEgdeCollisions(intersectionRect, offscreenContextobjectA, offscreenContextObjectB)
    }
    draw()
  }

  function draw() {
    onscreenContext.clearRect(0, 0, onscreenCanvas.width, onscreenCanvas.height)
    offscreenContextObjectB.clearRect(0, 0, offscreenCanvasObjectB.width, offscreenCanvasObjectB.height)
    offscreenContextobjectA.clearRect(0, 0, offscreenContextobjectA.width, offscreenContextobjectA.height)
  
    objectA.paint(offscreenContextobjectA)
    ObjectB.paint(offscreenContextObjectB)
    objectA.paint(onscreenContext)
    ObjectB.paint(onscreenContext)
    
    onscreenContext.save()
    onscreenContext.font = '16px Arial';
  
    if(isCollisions) {
      onscreenContext.fillText('collision', 15, canvas.height - 10);
    } else {
      onscreenContext.fillText('通过↑↓←→键移动元素', 15, canvas.height - 10);
    }
    onscreenContext.restore()
  }
  useEffect(() => {
    init();
  },[])

  return <div>
    <canvas id="canvas" width="200" height="100"></canvas>
    <div id="offscreenCanvasWrap">
      <div className="ObjectB"><p>ImageA离屏渲染：</p></div>
      <div className="objectA"><p>ImageB离屏渲染</p></div>
    </div>
  </div>
}
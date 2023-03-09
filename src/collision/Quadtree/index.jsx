import React, { useEffect }  from "react";
import Quadtree from "../../assets/quadtree/quadtree.js"
// import "./quadtree.css"

export default function QuadtreeDemo() {
  useEffect(() => {
    initQuadDemo()
  }, [])

  return <div>
    <div id="quadcanvas_container">
      <canvas id="canvas" width="640" height="480" style={{backgroundColor: "black"}}></canvas>
    </div>
    <div className="ctrl">
      <div className="ctrl-left">
        <button id="btn_add">add small object</button>
        <button id="btn_add_big">add big object</button>
        <button id="btn_add_10">add 10 small objects</button>
        <button id="btn_clear">clear tree</button>
      </div>

      <div className="ctrl-right">
        Total Objects: <span id="cnt_total">0</span><br />
        Candidates: <span id="cnt_cand">0</span> (<span id="cnt_perc">0</span>%)
      </div>
    </div>
  </div>
}

function initQuadDemo() {
			
    /*
     * the main Quadtree
     */
    var myTree = new Quadtree({
      x: 0,
      y: 0,
      width: 640,
      height: 480
    }, 4);
    
    /*
     * our objects will be stored here
     */
    var myObjects = [];


    /*
     * our "hero", aka the mouse cursor.
     * He is not in the quadtree, we only use this object to retrieve objects from a certain area
     */
    var myCursor = {
      x : 0,
      y : 0,
      width : 28,
      height : 28
    };

    var isMouseover = false;
    
    var ctx = document.getElementById('canvas').getContext('2d');

    var cnt_total = document.querySelector('#cnt_total'),
      cnt_cand = document.querySelector('#cnt_cand'),
      cnt_perc = document.querySelector('#cnt_perc');

    /*
     * position hero at mouse
     */
    var handleMousemove = function(e) {
      
      isMouseover = true;
      
      if(!e.offsetX) {
        e.offsetX = e.layerX - e.target.offsetLeft;
        e.offsetY = e.layerY - e.target.offsetTop;
      } 
      
      myCursor.x = e.offsetX - (myCursor.width/2);
      myCursor.y = e.offsetY - (myCursor.height/2);		
    };


    /*
     * hide hero
     */
    var handleMouseout = function(e) {
      
      isMouseover = false;
    };


    
    /*
     * add a random object to our simulation
     */
    var handleAdd = function(rect) {

      if(!rect) {
        rect = {
          x : randMinMax(0, myTree.bounds.width-32),
          y : randMinMax(0, myTree.bounds.height-32),
          width : randMinMax(4, 32, true),
          height : randMinMax(4, 32, true),
          check : false
        };
      }

      //store object in our array
      myObjects.push(rect);

      //insert object in our quadtree
      myTree.insert(rect);

      //update total counter
      updateTotal();
    }
    
    /*
     * clear the tree
     */
    var handleClear = function() {

      //empty our array
      myObjects = [];

      //empty our quadtree
      myTree.clear();

      //update total counter
      updateTotal();				
    }
    
    
    /*
     * draw Quadtree nodes
     */
    var drawQuadtree = function(node) {

      var bounds = node.bounds;
    
      //no subnodes? draw the current node
      if(node.nodes.length === 0) {
        ctx.strokeStyle = 'rgba(255,0,0,0.5)';
        ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
        
      //has subnodes? drawQuadtree them!
      } else {
        for(var i=0;i<node.nodes.length;i=i+1) {
          drawQuadtree(node.nodes[i]);
        }
      }
    };
    
    /*
     * draw all objects
     */
    var drawObjects = function() {
      
      var obj;
      
      for(var i=0;i<myObjects.length;i=i+1) {
        
        obj = myObjects[i];
        
        if(obj.check) {
          ctx.fillStyle = 'rgba(48,255,48,0.5)';
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        } else {
          ctx.strokeStyle = 'rgba(255,255,255,0.5)';
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        }
        
        
      }
    };

    
   
    
    /*
     * our main loop
     */
    var loop = function() {
      
      var candidates = [];
      
      ctx.clearRect(0, 0, 640, 480);
      
      //reset myObjects check flag
      for(var i=0;i<myObjects.length;i=i+1) {
        
        myObjects[i].check = false;
      }
      

      if(isMouseover) {

        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(myCursor.x, myCursor.y, myCursor.width, myCursor.height);
        
        //retrieve all objects in the bounds of the hero 
        candidates = myTree.retrieve(myCursor);

        //flag retrieved objects
        for(i=0;i<candidates.length;i=i+1) {
          candidates[i].check = true;
        }
      }

      updateCandidatesInfo(candidates);
      
      drawQuadtree(myTree);

      drawObjects();
      
      requestAnimationFrame(loop);
    };


    var updateTotal = function() {

      cnt_total.innerHTML = myObjects.length;
    }

    var updateCandidatesInfo = function(candidates) {

      cnt_cand.innerHTML = candidates.length;
      if(!myObjects.length) return;
      cnt_perc.innerHTML = Math.round((candidates.length/myObjects.length)*100);
    }
          
    //init first loop
    loop();
    
    //set eventListener for mousemove
    document.getElementById('canvas').addEventListener('mousemove', handleMousemove);
    document.getElementById('canvas').addEventListener('mouseout', handleMouseout);

    //set eventListener for buttons
    document.getElementById('btn_add').addEventListener('click', function() {
      handleAdd();
    });
    document.getElementById('btn_add_big').addEventListener('click', function() {
      handleAdd({
        x : randMinMax(0, myTree.bounds.width/2),
        y : randMinMax(0, myTree.bounds.height/2),
        width : randMinMax(myTree.bounds.height/4, myTree.bounds.height/2, true),
        height : randMinMax(myTree.bounds.height/4, myTree.bounds.height/2, true),
        check : false
      });
    });
    document.getElementById('btn_add_10').addEventListener('click', function() {
      for(var i=0;i<10;i++) { handleAdd() };
    });
    document.getElementById('btn_clear').addEventListener('click', handleClear);

    
  // })(window, Math);
}

 /**
     * return a random number within given boundaries.
     *
     * @param {number} min		the lowest possible number
     * @param {number} max		the highest possible number
     * @param {boolean} round	if true, return integer
     * @return {number} 		a random number
     */
 const randMinMax = function(min, max, round) {
  var val = min + (Math.random() * (max - min));
  
  if(round) val = Math.round(val);
  
  return val;
};
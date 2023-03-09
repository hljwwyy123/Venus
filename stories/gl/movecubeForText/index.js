import DrawText from "../../animation/particle/DrawImageData/animate"

const viewportWidth = 1000;
const viewportHeight = 500;

export default function init(text, container) {
  let { pos3d, gridSize } = get3dPosition(text);
  gridSize = Math.max(gridSize.row, gridSize.column);
  
  var root = new THREERoot({container});
  root.renderer.setClearColor(0xffffff);
  root.camera.position.set(-20, 12, 12);

  var light = new THREE.DirectionalLight(0xfff3f3, 1.8);
  light.position.set(1, 1, 0);
  root.add(light);
  root.addUpdateCallback(function () {
    light.position.copy(root.camera.position).normalize();
  });

  var pointLight = new THREE.PointLight();
  pointLight.position.set(0, 10, 10);
  root.add(pointLight);

  var gridHelper, animation, tween;

  function createAnimation() {
    
    if (gridHelper) {
      root.remove(gridHelper);
      gridHelper.material.dispose();
      gridHelper.geometry.dispose();
    }

    if (animation) {
      root.remove(animation);
      animation.material.dispose();
      animation.geometry.dispose();
    }

    gridHelper = new THREE.GridHelper(gridSize * 0.5, 1, 0x222222, 0x444444);
    root.add(gridHelper);

    animation = new Animation(pos3d);
    animation.position.y = 0.25;
    root.add(animation);

    tween = animation.animate({
      repeat: -1,
      repeatDelay: 2.0,
      ease: Power0.easeNone
    }).timeScale(3.0);
  }

  createAnimation();
}
/**
 * 
 * @param {*} text 
 * @returns 
 */
function get3dPosition(text) {
  const drawImageTextAnimate = new DrawText();
  const imageDateInfo = drawImageTextAnimate.init({
    stageSize: {
      width: viewportWidth,
      height: viewportHeight,
    },
    pixelSize: {
      w: 5,
      h: 5
    }
  });
  const coloredGridPos = drawImageTextAnimate.drawPixelText(text);
  let pixel2dPositions = Object.values(coloredGridPos)
  
  const pos3d = []
  pixel2dPositions.forEach(p => {
    pos3d.push({x: p.x - imageDateInfo.gridSize.row/2, y: p.y - imageDateInfo.gridSize.column/2})
  });
  return { pos3d, gridSize: imageDateInfo.gridSize};
}

function Animation(position) {
  // setup timeline

  // the timeline generates shader chunks where an animation step is baked into.
  // each prefab will execute the same animation, with in offset position and time (delay).
  var timeline = new THREE.BAS.Timeline();

  // roll right
  timeline.add(1.0, {
    rotate: {
      axis: new THREE.Vector3(0, 0, -1),
      from: 0,
      to: Math.PI * 0.5,
      origin: {
        x: 0.25,
        y: -0.25
      },
      ease: 'easeCubicOut'
    }
  });


  // zero duration transitions act like a 'set'
  timeline.add(0.0, {
    translate: {
      to: {
        x: 0.5,
        y: 0,
        z: 0
      }
    }
  });


  // roll down
  timeline.add(1.0, {
    rotate: {
      axis: new THREE.Vector3(1, 0, 0),
      from: 0,
      to: Math.PI * 0.5,
      origin: {
        y: -0.25,
        z: 0.25
      },
      ease: 'easeCubicIn'
    }
  });


  timeline.add(0.0, {
    translate: {
      to: {
        x: 0.5,
        y: 0,
        z: 0.5
      }
    }
  });


  // roll left
  timeline.add(1.0, {
    rotate: {
      axis: new THREE.Vector3(0, 0, 1),
      from: 0,
      to: Math.PI * 0.5,
      origin: {
        x: -0.25,
        y: -0.25
      },
      ease: 'easeCubicIn'
    }
  });


  timeline.add(0.0, {
    translate: {
      to: {
        x: 0,
        y: 0,
        z: 0.5
      }
    }
  });


  // roll up
  timeline.add(1.0, {
    rotate: {
      axis: new THREE.Vector3(-1, 0, 0),
      from: 0,
      to: Math.PI * 0.5,
      origin: {
        y: -0.25,
        z: -0.25
      },
      ease: 'easeCubicIn'
    }
  });


  timeline.add(0.0, {
    translate: {
      to: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  });



  // setup prefab
  var prefabSize = 0.5;
  var prefab = new THREE.BoxGeometry(prefabSize, prefabSize, prefabSize);
  var prefabCount = position.length;
  var geometry = new THREE.BAS.PrefabBufferGeometry(prefab, prefabCount);

  var aPosition = geometry.createAttribute('aPosition', 3);
  var aDelayDuration = geometry.createAttribute('aDelayDuration', 3);
  var index = 0;
  var dataArray = [];
  var maxDelay = 2.0;
  this.totalDuration = timeline.duration + maxDelay;

  for (let i = 0; i < position.length; i++) {
    // var x = THREE.Math.mapLinear(i, 0, position[i].x, -p[i].x * 0.5, p[i].x * 0.5) + 0.5;  
    dataArray[0] = position[i].x + 0.5
    dataArray[1] = 0;
    dataArray[2] = position[i].y + 0.5;
    geometry.setPrefabData(aPosition, i, dataArray);
    dataArray[0] = maxDelay * Math.random();
    dataArray[1] = timeline.duration;
    geometry.setPrefabData(aDelayDuration, i, dataArray);
  }

  var material = new THREE.BAS.StandardAnimationMaterial({
    shading: THREE.FlatShading,
    uniforms: {
      uTime: {
        value: 0
      }
    },

    uniformValues: {
      diffuse: new THREE.Color(0xffffff),
      metalness: 1.0,
      roughness: 1.0
    },

    vertexFunctions: [
      // the eases used by the timeline defined above
      THREE.BAS.ShaderChunk['ease_cubic_in'],
      THREE.BAS.ShaderChunk['ease_cubic_out'],
      THREE.BAS.ShaderChunk['ease_cubic_in_out'],
      THREE.BAS.ShaderChunk['ease_back_out'],
      THREE.BAS.ShaderChunk['ease_bounce_out'],
      THREE.BAS.ShaderChunk['quaternion_rotation']
      // getChunks outputs the shader chunks where the animation is baked into
    ].concat(timeline.compile()),
    vertexParameters: [
      'uniform float uTime;',

      'attribute vec3 aPosition;',
      'attribute vec2 aDelayDuration;'
    ],

    vertexPosition: [
      // calculate animation time for the prefab
      'float tTime = clamp(uTime - aDelayDuration.x, 0.0, aDelayDuration.y);',

      // apply timeline transformations based on 'tTime'
      timeline.getTransformCalls('scale'),
      timeline.getTransformCalls('rotate'),
      timeline.getTransformCalls('translate'),

      // translate the vertex by prefab position
      'transformed += aPosition;'
    ]
  });



  THREE.Mesh.call(this, geometry, material);

  this.frustumCulled = false;
}
Animation.prototype = Object.create(THREE.Mesh.prototype);
Animation.prototype.constructor = Animation;

Object.defineProperty(Animation.prototype, 'time', {
  get: function () {
    return this.material.uniforms['uTime'].value;
  },
  set: function (v) {
    this.material.uniforms['uTime'].value = v;
  }
});


Animation.prototype.animate = function (options) {
  options = options || {};
  options.time = this.totalDuration;

  return TweenMax.fromTo(this, this.totalDuration, {
    time: 0.0
  }, options);
};

// THREE ROOT
function THREERoot(params) {
  // defaults
  params = Object.assign({
      container: document.querySelector(params.container),
      fov: 45,
      zNear: 1.0,
      zFar: 1000.0,
      createCameraControls: true,
      autoStart: true,
      pixelRatio: window.devicePixelRatio,
      antialias: window.devicePixelRatio === 1,
      alpha: false
    },
    params);

  // maps and arrays
  this.updateCallbacks = [];
  this.resizeCallbacks = [];
  this.objects = {};

  // renderer
  this.renderer = new THREE.WebGLRenderer({
    antialias: params.antialias,
    alpha: params.alpha
  });

  this.renderer.setPixelRatio(params.pixelRatio);

  // container
  this.container = typeof params.container === 'string' ? document.querySelector(params.container) : params.container;
  this.container.appendChild(this.renderer.domElement);

  // camera
  this.camera = new THREE.PerspectiveCamera(
    params.fov,
    viewportWidth / viewportHeight,
    params.zNear,
    params.zFar
  );


  // scene
  this.scene = new THREE.Scene();

  // resize handling
  this.resize = this.resize.bind(this);
  this.resize();
  window.addEventListener('resize', this.resize, false);

  // tick / update / render
  this.tick = this.tick.bind(this);
  params.autoStart && this.tick();

  // optional camera controls
  params.createCameraControls && this.createOrbitControls();
}
THREERoot.prototype = {
  createOrbitControls: function () {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.autoRotate = true
    this.addUpdateCallback(this.controls.update.bind(this.controls));
  },
  start: function () {
    this.tick();
  },
  addUpdateCallback: function (callback) {
    this.updateCallbacks.push(callback);
  },
  addResizeCallback: function (callback) {
    this.resizeCallbacks.push(callback);
  },
  add: function (object, key) {
    key && (this.objects[key] = object);
    this.scene.add(object);
  },
  addTo: function (object, parentKey, key) {
    key && (this.objects[key] = object);
    this.get(parentKey).add(object);
  },
  get: function (key) {
    return this.objects[key];
  },
  remove: function (o) {
    var object;

    if (typeof o === 'string') {
      object = this.objects[o];
    } else {
      object = o;
    }

    if (object) {
      object.parent.remove(object);
      delete this.objects[o];
    }
  },
  tick: function () {
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  },
  update: function () {
    this.updateCallbacks.forEach(function (callback) {
      callback();
    });
  },
  render: function () {
    this.renderer.render(this.scene, this.camera);
  },
  resize: function () {
    var width = viewportWidth;
    var height = viewportHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.resizeCallbacks.forEach(function (callback) {
      callback();
    });
  },
  initPostProcessing: function (passes) {
    var size = this.renderer.getSize();
    var pixelRatio = this.renderer.getPixelRatio();
    size.width *= pixelRatio;
    size.height *= pixelRatio;

    var composer = this.composer = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    }));


    var renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    for (var i = 0; i < passes.length; i++) {
      var pass = passes[i];
      pass.renderToScreen = i === passes.length - 1;
      this.composer.addPass(pass);
    }

    this.renderer.autoClear = false;
    this.render = function () {
      this.renderer.clear();
      this.composer.render();
    }.bind(this);

    this.addResizeCallback(function () {
      var width = viewportWidth;
      var height = viewportHeight;

      composer.setSize(width * pixelRatio, height * pixelRatio);
    }.bind(this));
  }
};
//# sourceURL=pen.js
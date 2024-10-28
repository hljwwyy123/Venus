import * as THREE from "@/assets/three.min.js"
import * as OrbitControls from "@/assets/OrbitControls";

// earth 纹理
// NASA https://visibleearth.nasa.gov/collection/1484/blue-marble?page=1

Object.assign(THREE, {...OrbitControls});

let earth = null;
let renderer = null;
let controls = null;
let camera = null;
let scene = null;
let cloud = null;

function init() {
  // 创建场景、相机和渲染器
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-container'), antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 创建地球
  var geometry = new THREE.SphereGeometry(5, 32, 32);
  // var texture = new THREE.TextureLoader().load('https://img.alicdn.com/imgextra/i2/O1CN01XcWFtO287qFqktKGN_!!6000000007886-0-tps-2048-1024.jpg');
  // var texture = new THREE.TextureLoader().load('https://img.alicdn.com/imgextra/i1/O1CN01xiHQsV22TTDNcvmSl_!!6000000007121-0-tps-1125-750.jpg');
  var texture = new THREE.TextureLoader().load('https://img.alicdn.com/imgextra/i1/O1CN01T2Jsqm1RgcrLGaZ3P_!!6000000002141-0-tps-2048-1024.jpg');
  
  
  var material = new THREE.MeshPhongMaterial({ map: texture, shininess: 1 });
  earth = new THREE.Mesh(geometry, material);
  scene.add(earth);
  
  // 创建云层
  var cloudGeometry = new THREE.SphereGeometry(5.1, 32, 32);
  var cloudTexture = new THREE.TextureLoader().load('https://img.alicdn.com/imgextra/i1/O1CN011EIYjH1f6M732q2Nf_!!6000000003957-0-tps-2048-1024.jpg');
  var cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudTexture, transparent: true, opacity: 0.5 });
  cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(cloud);
  
  // 添加光源
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // 添加控制器，实现放大缩小和转动
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.z = 15;
}

export default init;

// 渲染场景
export function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.001;
  cloud.rotation.y += 0.0005;
  controls.update();
  renderer.render(scene, camera);
}

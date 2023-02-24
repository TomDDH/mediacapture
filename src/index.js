import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VideoCapture } from './VideoCapture'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import './index.css'

let camera, scene, renderer, controls, canvas;

let bgSound
let birdSound
let listener
let mixers = []
const gltfLoader = new GLTFLoader();
let clock = new THREE.Clock();
let mediaCapture

init()

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    1,
    11000
  );
  camera.position.z = 2;
  camera.position.y = 1;



  // set audio and sound effects
  const audioLoader = new THREE.AudioLoader()
  listener = new THREE.AudioListener()

  camera.add(listener)
  
  
  bgSound = new THREE.Audio(listener)
  audioLoader.load("./assets/BKKS8SE-bird-unknown-water-bird.mp3", (buffer) => {
    bgSound.setBuffer(buffer)
    bgSound.setLoop(true)
    bgSound.play()
  })

  birdSound = new THREE.Audio(listener)
  audioLoader.load("./assets/mindfulness-relaxation-amp-meditation-music-22174.mp3", (buffer) => {
    birdSound.setBuffer(buffer)
    birdSound.setLoop(true)
    birdSound.play()
  })
  
  
  
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true 
  });





  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  // renderer.setPixelRatio(window.devicePixelRatio * 2);
  renderer.outputEncoding = THREE.sRGBEncoding;
  // renderer.toneMappingExposure = 0.1;
  canvas = renderer.domElement
  document.body.appendChild(renderer.domElement);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment(),
    0.04
  ).texture;

  scene.background =new THREE.Color( 0xeeeeee );

  controls = new OrbitControls(camera, renderer.domElement);
  gltfLoader.load("./assets/Flamingo.glb", (gltf) => {
    scene.add(gltf.scene)
    const scale = 0.01
    gltf.scene.scale.set(scale, scale, scale)

    const mixer = new THREE.AnimationMixer(gltf.scene);
    mixers.push(mixer)
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    mediaCapture.init()
  })



  mediaCapture = new VideoCapture({
    listener,
    canvas,
  })
  mediaCapture.onClick((e) => {
    console.log('camera capture tapped')
  })
  mediaCapture.onPreviewShow(() => {
    birdSound.setVolume(0)
    bgSound.setVolume(0)
  })
  mediaCapture.onPreviewHide(() => {
    bgSound.setVolume(1)
    birdSound.setVolume(1)
  })
  

  function animate() {
    const delta = clock.getDelta();
    if (mixers) mixers.forEach(mixer => mixer.update(delta))

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

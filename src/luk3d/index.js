// Option 1: Import the entire three.js core library.
import * as THREE from "three/build/three.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
import {TransformControls} from "three/examples/jsm/controls/TransformControls.js";

const run = function ({ onUpdate, onInit  }) {
    onUpdate? startScene({ onUpdate }):startScene();

  onInit && onInit();
}

const startScene = ({ onUpdate }) =>{
  ///Creating camera
  let canvas = document.getElementById("canvas");

  let fieldOfView = 60;
  let aspectRation = canvas.clientWidth / canvas.clientHeight;
  let minClipDistance = 0.1;
  let maxClipDistance = 2000;
  let currentCam;
  let perspCamera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRation,
    minClipDistance,
    maxClipDistance
  );
  currentCam = perspCamera;
  currentCam.position.z = 1;
  let renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
  let cameraControls = new OrbitControls(currentCam, canvas);
  const scene = new THREE.Scene();
//   const textureLoader = new THREE.TextureLoader();
//   textureLoader.load(require("@/assets/skys/sky_texture.png"), (texture) => {
//     let sky = new THREE.WebGLCubeRenderTarget(texture.image.height);
//     sky.fromEquirectangularTexture(renderer, texture);
//     scene.background = sky.texture;
//   });

let ambientLight = new THREE.AmbientLight(0x404040,1);
scene.add(ambientLight);

scene.background = new THREE.Color(0xdddddd);

  let light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(0,4,2);
  light.castShadow = true;
  scene.add(light);
  
//   let onControls =  new TransformControls(  currentCam, canvas )

cameraControls.mouseButtons = {
    LEFT: THREE.MOUSE.MIDDLE,
    MIDDLE: THREE.MOUSE.RIGHT,
    RIGHT: THREE.MOUSE.LEFT
    
}


  const size = 10;
const divisions = 30;

const gridHelper = new THREE.GridHelper( size, divisions,0x2756a3ab );
scene.add( gridHelper );


let tControls = new TransformControls(currentCam, canvas);

tControls.setMode("translate");
scene.add(tControls);

  currentCam.position.set(0,0,5);


  let currentModel;

  function render() {
    currentCam.aspectRation = aspectRation =
      canvas.clientWidth / canvas.clientHeight;
    currentCam.updateProjectionMatrix();
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    renderer.setSize(width, height, false);

    renderer.render(scene, currentCam);
    requestAnimationFrame(render);

    onUpdate && onUpdate(renderer, currentCam, cameraControls);

    if(currentModel){
            currentModel.rotation.y = 0.01;
            tControls.attach(currentModel.Mesh);
            // onControls.update();
      
    }
  }

  function loadScene() {
    var loader = new OBJLoader();
        loader.load("./3d/suzanne.obj", function(model) {
            console.log(model);
            model.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshPhongMaterial({ specular: 0x111111, shininess: 200, color: 0xff5533, flatShading: true, });
                    // child.material.color = 0xffb830
                }
            });
            model.children[0].material = new THREE.MeshPhongMaterial({ specular: 0x111111, shininess: 200, color: 0xff5533, flatShading: true });
            model.children[0].material.shading = THREE.SmoothShading;
            model.position.set(0, 0, 0);
            currentModel = model.children[0];
            scene.add(model);

           
            render();
        });
}
loadScene();


  requestAnimationFrame(render);


    onUpdate && onUpdate();




}

export {
    run,
    startScene
  }
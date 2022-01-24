



<template>
  <div class="home w-screen h-screen bg-gray-800">

    <canvas id="canvas" class="w-full h-full bg-gray-800">

    </canvas>
   
  </div>
</template>



<script>
// @ is an alias to /src

// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


export default {
  name: 'Home',
  components: {
  },
  methods: {
   initialize(){



     

           ///Creating camera
      let canvas = document.getElementById("canvas");
      
      let fieldOfView = 60;
      let aspectRation = canvas.clientWidth/canvas.clientHeight;
      let minClipDistance = 0.1;
      let maxClipDistance = 2000;
      let currentCam;
      let perspCamera = new THREE.PerspectiveCamera(fieldOfView, aspectRation, minClipDistance, maxClipDistance);
      currentCam = perspCamera;

      currentCam.position.z = 1;

      let renderer = new THREE.WebGLRenderer({canvas});



      

       new OrbitControls(currentCam,canvas );

      const scene = new THREE.Scene();

      const textureLoader = new THREE.TextureLoader();
        textureLoader.load(require("@/assets/skys/sky_texture.png"),(texture)=>{
        let sky =  new THREE.WebGLCubeRenderTarget(texture.image.height);
        sky.fromEquirectangularTexture(renderer,texture);
          scene.background = sky.texture;
      });

      function render(){

         currentCam.aspectRation = aspectRation = canvas.clientWidth/canvas.clientHeight;
         currentCam.updateProjectionMatrix();

        let width = canvas.clientWidth;
        let height = canvas.clientHeight;
        renderer.setSize(width,height,false);
       
        renderer.render(scene,currentCam)
        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    
   },

   upDate(){
     
   }

  },
  mounted() {
    this.initialize();
  },
}
</script>
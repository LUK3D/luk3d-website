



<template>
  <div class="home w-screen h-screen bg-gray-800">

    <canvas id="canvas" class="w-full h-full bg-gray-800">

    </canvas>
    <!-- <div id="scene" class="cena w-full h-full bg-gray-800">

    </div> -->
   
  </div>
</template>



<script>

import {run} from "../luk3d";
// @ is an alias to /src

export default {
  name: 'Home',

  data() {
    return {renderer:{}, currentCam:{}, cameraControls:{}
      
    }
  },
  components: {
  },
  methods: {
   initialize(){
   },
  Start(){

    


  },
   Update(renderer, currentCam, cameraControls){
     this.renderer = renderer;
      this.currentCam = currentCam
      this.cameraControls =  cameraControls
   }


  },
  mounted() {

    let ctx = this;
    
    run({onUpdate:ctx.Update,onInit:ctx.Start});
  },
}
</script>
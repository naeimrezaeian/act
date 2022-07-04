<template>
    <div>

        <Camera v-on:takePicture="this.takePicture"/>


    </div>
</template>

<script>
import Camera from './Camera.vue'

    export default {
        components:{
            Camera
        },
        methods:{
            takePicture(){
                console.log("take")
               // let ratio= (window.innerHeight > window.innerWidth) ? 16/9 : 9/16;
                //const picture = document.querySelector("canvas");
               // let photo = document.querySelector("video ")
              

            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>
<template>
<div>
  <video ref="videoRec"  autoplay class="webcam" ></video>
</div>
</template>
  
<script>
import axios from "axios"
  export default {
    data(){
            return {
               
                recorder: null, 
                stream: null,
                recordedChunks :[],
               
            }
        },
    methods:{
 init(){
                
                if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
                    navigator.mediaDevices.getUserMedia({
                     video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                     },
                     audio: false
                    }).then(  mediaStream=>{
                        
                      this.stream=mediaStream;
                        this.recorder = new MediaRecorder(mediaStream, {
                          mimeType: "video/webm; codecs=vp9",
                            audioBitsPerSecond: 128000
                        });
                      
                       this.recorder.ondataavailable =  (event) => { 
                        
                       // const r=event.data.text()
                      //var blob = new Blob(event.data, { 'type' : 'video/webm; codecs=vp9' });
                      const file = new File ([event.data],"test"+new Date().getTime()+".webm",{type:'video/webm; codecs=vp9',lastModified:new Date().getTime()})

                      const formData = new FormData();
                      formData.append("file", file);
                          const headers = {  'Content-Type': 'multipart/form-data'}
                           axios.post("upload",formData,{headers:headers}).then(res=>{
                            console.log(res.data)
                           })
                        
                        
                        
                        
                        this.recordedChunks.push(event.data); 
                        };
                        this.recorder.start(6000);
                        
                       
                       this.$refs.videoRec.src = null;
                       this.$refs.videoRec.srcObject = mediaStream;
                      
                        
                    })
                    .catch(() => (
                        console.log("Error media ")
                       
                        ));

                            
                      
                }


    }
},beforeMount(){
           
           this.init();         
        }
                
  }
</script>

<style scoped>
.webcam{
  width: 320px;
  height: 240px;
  background-color: red;
}

</style>
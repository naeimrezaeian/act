<template>
    <div >
        <video ref="videoRec"  autoplay class="webcam"></video>
         </div>
</template>

<script>
    export default {
        name:'ACTCamera',
        data(){
            return {
                 isRecording: false, 
                recorder: null, // component wide MediaRecorder
                stream: null,
                recordedChunks :[]
            }
        },
        mounted() {
    //As an instance property
    
    this.$root.$on("callMethodInChild", () => {
      this.download();
    });
        },
        methods:{
            init(){
                if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
                    navigator.mediaDevices.getUserMedia({
                     video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                     },
                     audio: false
                    }).then(mediaStream=>{
                      this.stream=mediaStream;
                        this.recorder = new MediaRecorder(mediaStream, {
                          mimeType: "video/webm",
                            audioBitsPerSecond: 128000
                        });
                       // this.recorder.ondataavailable = this.videoDataHandler;
                       this.recorder.ondataavailable = (event) => { this.recordedChunks.push(event.data); };
                        this.recorder.start(100);
                        
                       
                       this.$refs.videoRec.src = null;
                        this.$refs.videoRec.srcObject = mediaStream;
                        
                    })
                    .catch(() => (console.log("Error media ")));

                            
                      //  stream =>{ const videoPlayer = document.querySelector("video");videoPlayer.srcObject=stream;videoPlayer.play();});

                }else{
                    alert("can not get media devicess")
                }

            },
     
     videoDataHandler(event) {
        console.log("test")
        this.isUploading = true;
        let reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        reader.onloadend = () => {
           // this.connection.send(reader.result);
          // console.log(reader.result)
           //this.recordedChunks
           console.log(event.data)
           this.recordedChunks.push(reader.result)

        };
    },
    
     download() {
  this.recorder.stop();
   this.isRecording = false;
  this.stream.getTracks().forEach(track => { track.stop(); });

  var blob = new Blob(this.recordedChunks, {type: "video/webm"});
  var url =  URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = 'test.webm';
  a.click();
  // setTimeout() here is needed for Firefox.
  setTimeout(function() { URL.revokeObjectURL(url); }, 100); 
}

        },beforeMount(){
           this.init();
        },
        
        
    }
</script>

<style lang="scss" scoped>

.webcam{
width: 100%;
margin: -2rem auto;  
border: 2px solid #ffff;
border-radius: 20px;

}


</style>
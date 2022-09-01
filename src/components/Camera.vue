<template>
    <div>
        <video ref="videoRec" autoplay class="webcam"></video>
    </div>
</template>

<script>
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

import * as base64 from "byte-base64";
import { mapActions } from 'vuex'
import axios from "axios"
export default {

    name: 'ACTCamera',
    data() {
        return {
            isRecording: false,
            recorder: null,
            connection: null,
            stream: null,
            recordedChunks: [],
            isWebcamera: false,
        }
    },
    created() {
        this.connection = new HubConnectionBuilder()
            .withUrl('http://51.250.106.203:7023/RecordVideoHub', { accessTokenFactory: () => localStorage.getItem("token") })
            //.withUrl('https://localhost:7035/RecordVideoHub',{ accessTokenFactory: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3QiLCJleHAiOjE2NjE5ODAyNDcsImlzcyI6Imh0dHA6Ly9BQ1QucnUiLCJhdWQiOiJodHRwOi8vSGFuaXNBcHAuY29tIn0.TZf_zvwWc3RMIUHfc0H0WO_VWWGaeQNu3UnvBfqpscM" })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build()

        this.connection.start().then(() => {
            console.log("connected")
            this.connection.on("multipleConnections", () => {
                console.log("Multiple logins deteced")
            })
            this.connection.on("closeApp", () => {
                console.log("close App")
            })
            let self = this;
            async function handleDataAvailable(event) {

                const ab = await event.data.arrayBuffer();
                const bytes = new Uint8Array(ab);
                const ab64 = base64.bytesToBase64(bytes)
                await self.connection.invoke("UploadVideoStream", ab64)
            }
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    },
                    audio: false
                }).then(mediaStream => {

                    this.stream = mediaStream;
                    this.recorder = new MediaRecorder(mediaStream, {
                        mimeType: "video/webm; codecs=vp9",
                        audioBitsPerSecond: 128000
                    });

                    this.recorder.ondataavailable = handleDataAvailable
                    this.recorder.start(60);


                    this.$refs.videoRec.src = null;
                    this.$refs.videoRec.srcObject = mediaStream;
                    this.webcam = "OK"

                })
                    .catch((err) => {
                        console.log(err)


                        this.webcam = "Webcam Error"
                    })


            } else {
                this.webcam = "Webcam unsuported"
            }
        })
        this.init()

    },
    computed: {

    },
    methods: {
        ...mapActions(['set_isWebcamera']),
        init() {
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    },
                    audio: false
                }).then(mediaStream => {

                    this.stream = mediaStream;
                    this.recorder = new MediaRecorder(mediaStream, {
                        mimeType: "video/webm; codecs=vp9",
                        audioBitsPerSecond: 128000
                    });

                    this.recorder.ondataavailable = (event) => { this.recordedChunks.push(event.data); };
                    this.recorder.start(100);


                    this.$refs.videoRec.src = null;
                    this.$refs.videoRec.srcObject = mediaStream;
                    this.webcamera = true
                    this.set_isWebcamera(true)

                })
                    .catch(() => (
                        console.log("Error media ")

                    ));



            } else {
                alert("can not get media devicess")
            }

        },


        async download() {
            this.recorder.stop();
            this.isRecording = false;
            this.stream.getTracks().forEach(track => { console.log(track); track.stop(); });

            var blob = new Blob(this.recordedChunks, { type: "video/webm" });

            const headers = { 'Content-Type': 'multipart/form-data' }
            const file = new File([blob], "test" + new Date().getTime() + ".webm", { type: blob.type, lastModified: new Date().getTime() })

            let formData = new FormData();
            formData.append('file', file)

            const response = await axios.post("upload", formData, { headers: headers })
            console.log(response.data)
            // var url =  URL.createObjectURL(blob);
            //var a = document.createElement("a");
            //document.body.appendChild(a);
            //a.style = "display: none";
            //a.href = url;
            //a.download = 'test.webm';
            //a.click();

            // setTimeout(function() { URL.revokeObjectURL(url); }, 100); 
        },
        stopRecord() {
            console.log("camera stop")
            this.recorder.stop();
            this.isRecording = false;
            this.stream.getTracks().forEach(track => { track.stop(); });
            this.set_isWebcamera(false)
        }

    }, beforeMount() {

        this.init();
    }, watch: {
        stream: function () {
            // console.log(this.stream)
        }
    }


}
</script>

<style lang="scss" scoped>
.webcam {
    width: 100%;
    margin: -2rem auto;
    border: 2px solid #ffff;
    border-radius: 20px;
}
</style>
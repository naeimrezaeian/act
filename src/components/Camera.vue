<template>
    <div>
        <video ref="videoRec" autoplay class="webcam"></video>
    </div>
</template>

<script>
import * as base64 from "byte-base64";
import { mapActions } from 'vuex'


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
    mounted() {


    },
    created() {

        if (this.$soketio.client.state === "Disconnected") {
            this.$soketio.start()
        }

        let self = this;
        async function handleDataAvailable(event) {

            const ab = await event.data.arrayBuffer();
            const bytes = new Uint8Array(ab);
            const ab64 = base64.bytesToBase64(bytes)
            await self.$soketio.client.invoke("UploadVideoStream", ab64)
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
                this.webcamera = true
                this.set_isWebcamera(true)
                this.webcam = "OK"

            })
                .catch((err) => {
                    console.log(err)


                    this.webcam = "Webcam Error"
                })


        } else {
            this.webcam = "Webcam unsuported"
        }



    },

    methods: {
        ...mapActions(['set_isWebcamera']),
        stopRecord() {
            this.isRecording = false;
            let tracks = this.stream.getTracks();

            tracks.forEach(track => {

                track.stop();
            });

            this.set_isWebcamera(false)
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
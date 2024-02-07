<template>
    <div class="title">{{ CurrentTitle }}</div>
    <div class="box">
        <div class="player">
            <div class="video">
                <video id="videoplayer" ref="videoPlayer" @timeupdate="updateVideoTime" style="width:100%; height: 300px;"></video>
            </div>
            <div class="panel">
                <div class="play" @click="videoplay()" v-if="!videoPlaying"
                    :style="[ (CurrentFileLimit - CurrentFileListen <= 0) ? 'visibility: hidden;' : 'visibility: visible;' ]">
                    <img src="@/assets/img/play.svg" alt="">
                </div>
                <div v-if="videoPlaying">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="three-dot" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                </div>
                <div class="audio-text">Осталось прослушиваний: {{ CurrentFileLimit - CurrentFileListen }}</div>
            </div>
        </div>
        <div class="text" v-html="CurrentQuestion"></div>
    </div>
    <div class="opros"> <br>
        <div class="zag">Варианты ответа:</div>
        <template v-for="item in CurrentAnswers" :key="item.id">
            <button v-if="isAnswer(item.id)" type="button" class="btns" style="background-color: red;"
                @click="sendAnswer([CurrentSubtestId, CurrentQuestionId, CurrentId, item.id, getNextQuestion])">{{
                    item.answer }}</button>
            <button v-else type="button" class="btns"
                @click="sendAnswer([CurrentSubtestId, CurrentQuestionId, CurrentId, item.id, getNextQuestion])">{{
                    item.answer }}</button>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import httpClient from '@/httpClient';
export default {
    name: "questionVideo",
    data() {
        return {
            CurrentFileAccessToken: null,
            CurrentFileLimit: null,
            CurrentFileListen: null,
            videoPlaying: false,
        }
    },
    props: {
        CurrentTitle: {
            type: String,
            require: true
        },
        CurrentQuestion: {
            type: String,
            require: true
        },
        CurrentAnswers: {
            type: Object,
            require: true
        },
        CurrentVideoFile: {
            type: String,
            require: true
        },
        CurrentVideoLimit: {
            type: Number,
            require: true
        },
        SelectedAnswers: {
            type: Object,
            require: true
        },
        CurrentQuestionId: {
            type: String,
            require: true
        },
        CurrentId: {
            type: String,
            require: true
        },
        CurrentSubtestId: {
            type: String,
            require: true
        }
    },
    computed: {
        ...mapGetters([
            'getCurrentPointer',
            'selectedAnswers',
            'GetFileAccessToken',
            'GetFileListen',
            'GetFileLimit',
            'getNextQuestion',
        ]),
        answersList() {
            if (this.selectedAnswers) {
                return this.selectedAnswers.map(item => item.answerId)
            } else {
                return []
            }
        }
    },
    methods: {
        ...mapActions(['sendAnswer', 'FileAccessToken']),
        isAnswer(id) { return this.answersList.includes(id) },
        async videoplay() {
            this.videoPlaying = true;
            await this.FileAccessToken(this.CurrentVideoFile);
            this.CurrentFileAccessToken = await this.GetFileAccessToken();
            var reader = new FileReader();
            const responseFile = await httpClient.get('/api/files/DownloadFile/' + this.CurrentVideoFile + "/" + this.CurrentFileAccessToken, { responseType: 'blob', showLoader: false });
            console.log(responseFile);
            reader.readAsBinaryString(responseFile.data);
            reader.onload = function () {
                var arrayBuffer = reader.result;
                var base64str = btoa(arrayBuffer);
                this.$refs.videoPlayer.src = "data:video/mp4;base64," + base64str;
                this.getCurrentFileStatus();
                this.$refs.videoPlayer.play();
                this.$refs.videoPlayer.onended = () => { 
                    this.videoPlaying = false;
                }
            }.bind(this)
        },
        async getCurrentFileStatus() {
            await this.FileAccessToken(this.CurrentVideoFile);
            this.CurrentFileLimit = this.GetFileLimit();
            this.CurrentFileListen = this.GetFileListen();
        }
    },
    async created() {
        this.getCurrentFileStatus();
    },
    watch: {
        'CurrentTitle' : async function() {
            this.$refs.videoPlayer.src = null;
            this.videoPlaying = false,
            this.getCurrentFileStatus();
        }
    }
}
</script>

<style lang="scss" scoped>
.audio-text {
    padding: 0px 0 0 0 !important;

}

.answer_select {
    color: yellow !important;

}
.three-dot {
    color: white;
    width: 30px;
    height: 36px;
}
.panel {
    height: 40px;
}
</style>
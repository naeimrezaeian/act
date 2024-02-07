<template>
    <div class="title">{{ CurrentTitle }}</div>
    <div class="audio-vopros">
        <button type="button" :disabled="(CurrentFileLimit - CurrentFileListen) <= 0 || audioPlaying"
            class="btn" :class="[ ((CurrentFileLimit - CurrentFileListen) <= 0 || audioPlaying) ? 'btn-disabled' : 'btn-play']"
            @click="getAudio()">
            <p>ПРОСЛУШАТЬ ВОПРОС</p>
        </button>
        <span>Осталось прослушиваний: {{ CurrentFileLimit - CurrentFileListen }}</span>
    </div>
    <div class="text" v-html="CurrentQuestion"></div>
    <div class="opros">
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
    name: "questionAudio",
    data() {
        return {
            audio: new Audio(),
            CurrentFileAccessToken: null,
            CurrentFileLimit: null,
            CurrentFileListen: null,
            audioPlaying: false,
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
        CurrentAudioFile: {
            type: String,
            require: true
        },
        CurrentAudioLimit: {
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
    async created() {
        this.getCurrentFileStatus();
    },
    computed: {
        ...mapGetters(['getCurrentPointer', 'getNextQuestion', 'selectedAnswers', 'GetFileAccessToken', 'GetFileLimit', 'GetFileListen']),
        answersList() {
            if (this.selectedAnswers[0]) {
                return this.selectedAnswers.map(item => item.answerId)
            } else {
                return []
            }
        }
    },
    methods: {
        ...mapActions(['sendAnswer', 'FileAccessToken']),
        isAnswer(id) { return this.answersList.includes(id) },
        async getAudio() {
            this.audioPlaying = true;
            await this.FileAccessToken(this.CurrentAudioFile)
            this.CurrentFileAccessToken = this.GetFileAccessToken()
            var reader = new FileReader();
            const responseFile = await httpClient.get('/api/files/DownloadFile/' + this.CurrentAudioFile + "/" + this.CurrentFileAccessToken, { responseType: 'blob', showLoader: false })
            reader.readAsBinaryString(responseFile.data);

            reader.onload = async function () {
                var arrayBuffer = reader.result;
                var base64str = btoa(arrayBuffer);
                this.audio.src = "data:audio/wav;base64," + base64str;
                this.getCurrentFileStatus();
                this.audio.play()
                this.audio.onended = () => { 
                    this.audioPlaying = false;
                }
            }.bind(this)
        },
        async getCurrentFileStatus() {
            await this.FileAccessToken(this.CurrentAudioFile);
            this.CurrentFileLimit = this.GetFileLimit();
            this.CurrentFileListen = this.GetFileListen();
        }
    },
    watch: {
        'CurrentTitle': async function() {
            this.audio.src = null;
            this.audioPlaying = false;
            this.getCurrentFileStatus();
        }
    }
}

</script>

<style scoped>
.btn-disabled {
    background-color: grey !important;
    cursor: default;
}
</style>
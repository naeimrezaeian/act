<template>
    <div class="title">{{ CurrentTitle }}</div>
    <div class="audio-vopros">
        <button type="button" class="btn" v-bind:class="{ btn_play: this.AudioBtn }" @click="getAudio()">
            <p>ПРОСЛУШАТЬ ВОПРОС</p>

        </button>
        <span>Осталось прослушиваний: {{ CurrentFileLimit - CurrentFileListen }}</span>
    </div>
    <div class="text">{{ CurrentQuestion }} </div>
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
            AudioBtn: false,
            audio: new Audio(),
            CurrentFileAccessToken: null,
            CurrentFileLimit: null,
            CurrentFileListen: null
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
            console.log("Get Audio")
            //
            await this.FileAccessToken(this.CurrentAudioFile)

            this.CurrentFileAccessToken = this.GetFileAccessToken()
            this.CurrentFileLimit = this.GetFileLimit()
            this.CurrentFileListen = this.GetFileListen()

            var reader = new FileReader();
            const responseFile = await httpClient.get('/api/files/DownloadFile/' + this.CurrentAudioFile + "/" + this.CurrentFileAccessToken, { responseType: 'blob', showLoader: false })
            reader.readAsBinaryString(responseFile.data);

            reader.onload = function () {

                var arrayBuffer = reader.result;
                var base64str = btoa(arrayBuffer);
                this.audio.src = "data:audio/wav;base64," + base64str
                this.audio.play()
            }.bind(this)


        },
        playAudio() {
            console.log("play " + this.CurrentAudioFile)
            this.AudioBtn = !this.AudioBtn
            var audio = new Audio("uploads/" + this.CurrentAudioFile)
            let that = this
            audio.ontimeupdate = function () {
                //console.log( audio.currentTime.toFixed()+" "+audio.duration)
                if (audio.currentTime === audio.duration) {
                    that.AudioBtn = !that.AudioBtn
                    console.log("audio finish")
                }
            }
            audio.play()


        }
    }
}

</script>

<style  scoped></style>
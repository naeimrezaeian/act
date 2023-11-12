<template>
    <div class="title">{{ CurrentTitle }}</div>
    <div class="box">
        <div class="player">
            <div class="video">
                <video id="videoplayer" ref="videoPlayer" @timeupdate="updateVideoTime" style="width:100%;"></video>
            </div>

            <div class="panel">
                <div class="play" @click="videoplay()"><img src="@/assets/img/play.svg" alt=""></div>
                <div class="audio-text">Осталось прослушиваний: {{ CurrentVideoLimit }}</div>
            </div>
        </div>

        <div class="text" v-html="this.CurrentQuestion"></div>
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
export default {
    name: "questionVideo",
    data() {
        return {
            VideoBtn: true
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
        ...mapGetters(['getCurrentPointer', 'selectedAnswers']),
        answersList() {
            if (this.selectedAnswers) {
                return this.selectedAnswers.map(item => item.answerId)
            } else {
                return []
            }
        }

    },
    methods: {
        ...mapActions(['sendAnswer']),
        isAnswer(id) { return this.answersList.includes(id) },
        videoplay() {
            if (this.VideoBtn && this.CurrentVideoLimit > 0) {
                this.VideoBtn = !this.VideoBtn
                this.$refs.videoPlayer.src = "uploads/" + this.CurrentVideoFile
                this.$refs.videoPlayer.width = "100px"
                this.$refs.videoPlayer.play();

            }
        },
        updateVideoTime() {
            if (this.$refs.videoPlayer.currentTime == this.$refs.videoPlayer.duration) {
                this.VideoBtn = !this.VideoBtn
            }

        }

    },
    mounted() {
        this.$refs.videoPlayer.src = "uploads/" + this.CurrentVideoFile
    }, watch: {
        getCurrentPointer: function () {
            this.$refs.videoPlayer.src = "uploads/" + this.CurrentVideoFile
            this.VideoBtn = !this.VideoBtn
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
</style>
<template>
  <section class="pages-time">
    <div class="box">
      <div class="left">
        <div class="top">
          <div class="zag">Чтение</div>
          <div class="sub-zag">Время выполнения: <b>{{ this.currentSubtestMaxTime(this.currentSubtestId) }} минут</b>.
            Максимальное количество баллов: <b>{{ this.currentSubtestMaxScore(this.currentSubtestId) }}. Пожалуйста, не
              пользуйтесь электронными устройствами.</b></div>
        </div>


        <questionText v-if="CurrentQuestionType === 'text'" :CurrentQuestionId="this.CurrentQuestionId"
          :CurrentTitle="this.CurrentTitle" :CurrentQuestion="this.CurrentQuestion"
          :CurrentAnswers="this.CurrentAnswers" />

        <questionLetter v-if="CurrentQuestionType === 'letter'" :CurrentTitle="this.CurrentTitle"
          :CurrentQuestion="this.CurrentQuestion" />

        <questionAudio v-if="CurrentQuestionType === 'audio'" :CurrentTitle="this.CurrentTitle"
          :CurrentQuestion="this.CurrentQuestion" :CurrentAnswers="this.CurrentAnswers"
          :CurrentAudioFile="this.CurrentFile" :CurrentAudioLimit="this.CurrentLimit" :CurrentListen="this.CurrentListen" :CurrentToken="this.CurrentToken"
          :SelectedAnswers="this.SelectedAnswers" :CurrentQuestionId="this.CurrentQuestionId" 
          :CurrentId="this.CurrentId" />

        <questionVideo v-if="CurrentQuestionType === 'video'" :CurrentTitle="this.CurrentTitle"
          :CurrentQuestion="this.CurrentQuestion" :CurrentAnswers="this.CurrentAnswers"
          :CurrentVideoFile="this.CurrentFile" :CurrentVideoLimit="this.CurrentLimit"
          :SelectedAnswers="this.SelectedAnswers" />

        <a class="btn red" v-show="this.LastQuestion" @click="send">ОТПРАВИТЬ</a>
      </div>
      <div class="right">
        <timerComponent />

        <ul>
          <template v-for="(question, index) in this.allQuestions() " :key="question.id">
                       
            <li v-if="question.id === this.getCurrentPointer" @click="pointerclick(question.id)" class="active">
              {{ index + 1 }} </li>
              
            <li v-else @click="pointerclick(question.id)">{{ index + 1 }}</li>
          </template>
        </ul>
        <div class="video" v-show="this.currentSubtestRecord">
          <div class="res" v-show="isWebcamera2">ЗАПИСЬ</div>
          <div class="img" v-show="!isWebcamera2"><img src="@/assets/img/video.svg" alt=""></div>
          <Camera ref="camera" v-show="isWebcamera2" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Camera from './Camera.vue'
import timerComponent from './ExamElements/timerComponent.vue'
import questionText from './ExamElements/questionText.vue'
import questionLetter from './ExamElements/questionLetter.vue'
import questionAudio from './ExamElements/questionAudio.vue'
import questionVideo from './ExamElements/questionVideo.vue'
export default {
  name: 'ACTexam',
  components: {
    Camera,
    timerComponent,
    questionText,
    questionLetter,
    questionAudio,
    questionVideo

  },

  computed: {
   
    ...mapGetters(['currentSubtestMaxTime', 'currentSubtestId', 'currentSubtestRecord',
      'currentSubtestMaxScore', "allQuestions", "getQuestion", 'isWebcamera',
      'getCurrentPointer', 'selectedAnswers', 'currentStateData', 'getNextQuestion'
      ,'GetFileAccessToken','GetFileLimit','GetFileListen']),
    isDisabled() {
      return this.isDisabledValue
    },
    isWebcamera2() {      
      return this.isWebcamera
    }

  },
  data() {
    return {
      CurrentQuestionId: '',
      CurrentQuestion: '',
      CurrentTitle: '',
      CurrentQuestionType: '',
      CurrentAnswers: [],
      CurrentFile: '',
      CurrentLimit: 0,
      CurrentListen: 0,  
      CurrentToken:null,    
      CurrentPointer: 0,
      SelectedAnswers: [],
      LastQuestion: false,
      selectedTime: 0,
      timeLeft: '00:00',
      endTime: '0',
      timerFinish: false,
      isDisabledValue: false,
    

    }
  },
  methods: {
    ...mapActions(['subtestQuestions', 'setTime', 'updateQuestionPointer', 'finishExam','getCurrentState','getAnswers','FileAccessToken']),

    async updateQuestion() {
     
      if(this.getCurrentPointer !=null){
        

      this.CurrentQuestionId = this.getQuestion(this.getCurrentPointer).questionId
      this.CurrentId = this.getQuestion(this.getCurrentPointer).id
      this.CurrentQuestion = this.getQuestion(this.getCurrentPointer).question
      this.CurrentQuestionType = this.getQuestion(this.getCurrentPointer).type
      this.CurrentAnswers = this.getQuestion(this.getCurrentPointer).answers
      this.CurrentFile = this.getQuestion(this.getCurrentPointer).fileId || ''  
      this.CurrentTitle = this.getQuestion(this.getCurrentPointer).desc     

      if (this.getNextQuestion) {         this.LastQuestion = false      } else {        this.LastQuestion = true      }
      if (this.CurrentQuestionType === 'audio'){
        await this.FileAccessToken(this.CurrentFile)
        this.CurrentLimit=this.GetFileLimit()
        this.CurrentListen=this.GetFileListen()
        this.CurrentToken = this.GetFileAccessToken()
        
        }
      
      }
    },
    pointerclick(index) {
      this.updateQuestionPointer(index)
      this.updateQuestion();
     
     
    },
    async send() {
      this.$refs.camera.stopRecord()
      await this.finishExam(this.currentSubtestId)
      this.setTime(0)
      
      //this.isDisabledValue=true
    }


  },

  async created() {
    await this.getCurrentState()
    await this.getAnswers(this.currentSubtestId)
    await this.subtestQuestions(this.currentSubtestId)
    this.updateQuestionPointer(this.currentStateData.questionId)
    this.updateQuestion();   
    this.setTime(this.currentStateData.start ?? this.currentSubtestMaxTime())
    if (this.CurrentQuestionType === 'audio'){
        await this.FileAccessToken(this.CurrentFile)
        this.CurrentLimit=this.GetFileLimit()
        this.CurrentListen=this.GetFileListen()
        this.CurrentToken = this.GetFileAccessToken()
        console.log(this.CurrentToken)
        }
   

  },
  mounted() {
    // this.Webcamera=this.$refs.camera.webcamera
    // console.log(this.isWebcamera)
    this.$soketio.start();
    this.$store.subscribe(async (mutation) => {
      switch (mutation.type) {
        
        case 'updateTimeleft':
          this.timerFinish = this.$store.state.timer.timerFinish
          if (this.timerFinish) {
            console.log("finish time")
            this.$refs.camera.stopRecord()
            console.log(this.$refs.camera)
            await this.finishExam(this.currentSubtestId)
          }
          break
        case 'updateSendAnswer':
        
          if (this.getNextQuestion) {
            
            this.updateQuestionPointer(this.getNextQuestion.id)
            
          }
          this.SelectedAnswers = this.selectedAnswers[0]
          this.updateQuestion()
          break
      }


    })


  }
}
</script>

<style lang="scss" scoped>
</style>
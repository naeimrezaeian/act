<template>
    <section class="pages-time">
    <div class="box">
        <div class="left">
            <div class="top">
                <div class="zag">Чтение</div>
                <div class="sub-zag">Время выполнения: <b>{{this.currentSubtestMaxTime(this.currentSubtestId)}} минут</b>. Максимальное количество баллов: <b>{{this.currentSubtestMaxScore(this.currentSubtestId)}}. Пожалуйста, не пользуйтесь электронными устройствами.</b></div>
            </div>

          
            <questionText v-if="CurrentQuestionType ==='text'" :CurrentTitle="this.CurrentTitle"  :CurrentQuestion="this.CurrentQuestion"  :CurrentAnswers="this.CurrentAnswers"/>

            <questionLetter v-if="CurrentQuestionType ==='letter'" :CurrentTitle="this.CurrentTitle"  :CurrentQuestion="this.CurrentQuestion"/>
            <questionAudio v-if="CurrentQuestionType ==='audio'" :CurrentTitle="this.CurrentTitle"  :CurrentQuestion="this.CurrentQuestion"  :CurrentAnswers="this.CurrentAnswers" :CurrentAudioFile="this.CurrentAudioFile" :CurrentAudioLimit="this.CurrentAudioLimit" :SelectedAnswers="this.SelectedAnswers"/>
            <questionVideo  v-if="CurrentQuestionType ==='video'"  :CurrentTitle="this.CurrentTitle" :CurrentQuestion="this.CurrentQuestion"  :CurrentAnswers="this.CurrentAnswers" :CurrentVideoFile="this.CurrentVideoFile" :CurrentVideoLimit="this.CurrentVideoLimit" :SelectedAnswers="this.SelectedAnswers"/>
            
            <a class="btn red" v-show="this.LastQuestion" @click="send">ОТПРАВИТЬ</a>
        </div>
        <div class="right">
          <timerComponent />
         
            <ul>
            <template v-for="index in this.allQuestions.length " :key="index">
                <li  v-if="index == this.getCurrentPointer+1" class="active" @click="pointerclick(index)">{{index}}</li>
                <li  v-else @click="pointerclick(index)" >{{index}}</li>
                </template>
            </ul>
            <div class="video" v-show="this.currentSubtestRecord">
                <div class="res" v-show= "isWebcamera2">ЗАПИСЬ</div>
                <div class="img" v-show="!isWebcamera2"><img src="@/assets/img/video.svg" alt=""></div>
                  <Camera ref="camera" v-show= "isWebcamera2"/>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Camera from './Camera.vue'
import timerComponent from './ExamElements/timerComponent.vue'
import questionText from './ExamElements/questionText.vue'
import questionLetter from './ExamElements/questionLetter.vue'
import questionAudio from './ExamElements/questionAudio.vue'
import questionVideo from './ExamElements/questionVideo.vue'
   export default {
        name:'ACTexam',
        components:{
          Camera,
          timerComponent,
          questionText,
          questionLetter,
          questionAudio,
          questionVideo
          
        },
       
        computed:{
            ...mapGetters(['currentSubtestMaxTime','currentSubtestId','currentSubtestRecord',
            'currentSubtestMaxScore',"allQuestions","getQuestion",'isWebcamera',
            'getCurrentPointer','selectedAnswers','currentStateData']),
            isDisabled(){
              return this.isDisabledValue
            },
            isWebcamera2(){
              //console.log(this.$refs)
              return this.isWebcamera
            }
            
           },  
           data(){
            return {
                CurrentQuestion:'',
                CurrentTitle:'',
                CurrentQuestionType:'',
                CurrentAnswers:[],  
                CureentAudioFile:'', 
                CurrentAudioLimit:0,
                CurrentVideoFile:'', 
                CurrentVideoLimit:0,           
                CurrentPointer:0,
                SelectedAnswers:[],
                LastQuestion:false,
                selectedTime: 0,
                timeLeft: '00:00',
                endTime: '0',
                timerFinish:false,
                isDisabledValue:false,
               
                
            }
           }  ,      
         methods:{
            ...mapActions(['subtestQuestions','setTime']) ,
                        
            updateQuestion(){             
                this.CurrentQuestion=this.getQuestion(this.getCurrentPointer).question 
                this.CurrentQuestionType=this.getQuestion(this.getCurrentPointer).type
                this.CurrentAnswers=this.getQuestion(this.getCurrentPointer).answers  
                this.CurrentAudioFile=this.getQuestion(this.getCurrentPointer).file || ''
                this.CurrentAudioLimit=this.getQuestion(this.getCurrentPointer).limit || 0
                this.CurrentVideoFile=this.getQuestion(this.getCurrentPointer).file || ''
                this.CurrentVideoLimit=this.getQuestion(this.getCurrentPointer).limit || 0
                this.CurrentTitle=this.getQuestion(this.getCurrentPointer).desc
                
                if (this.getCurrentPointer+1 === this.allQuestions.length ){
                  this.LastQuestion=true
                }else{
                  this.LastQuestion=false
                }
                //console.log( "refs: ",this.$refs)
                
            },
            pointerclick(index){              
              this.$store.commit('updatePointer',index-1)
              this.updateQuestion();
            },
  send(){
   console.log("send...")
 
   this.$refs.camera.download()
   //this.$refs.camera.stopRecord()
   //this.isDisabledValue=true
  }

            
        },

       async created(){
      
       this.$store.commit('updatePointer',this.currentStateData.questionId)
console.log( this.$store.state.questions.currentPointer)
      // console.log("call:"+this.getRecorder)
        await this.subtestQuestions(1)   
          
           this.updateQuestion();
           this.setTime(60)
          
          
        },mounted(){
         // this.Webcamera=this.$refs.camera.webcamera
        // console.log(this.isWebcamera)
 this.$store.subscribe((mutation)=>{
    switch(mutation.type){
      case 'updateTimeleft':
        this.timerFinish=this.$store.state.timer.timerFinish 
        break
      case 'updateSendAnswer':        
        if(this.getCurrentPointer+1 < this.allQuestions.length){
         this.$store.commit('updatePointer',this.getCurrentPointer+1)         
        }
       
        this.SelectedAnswers=this.selectedAnswers[0]      
        this.updateQuestion()
        break

    }


  })

           
        }
   }
   </script>

<style lang="scss" scoped>

</style>
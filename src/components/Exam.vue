<template>
    <section class="pages-time">
    <div class="box">
        <div class="left">
            <div class="top">
                <div class="zag">Чтение</div>
                <div class="sub-zag">Время выполнения: <b>{{this.currentSubtestMaxTime(this.currentSubtestId)}} минут</b>. Максимальное количество баллов: <b>{{this.currentSubtestMaxScore(this.currentSubtestId)}}. Пожалуйста, не пользуйтесь электронными устройствами.</b></div>
            </div>

          
            <questionText v-if="CurrentQuestionType==='text'" :CurrentTitle="this.CurrentTitle"  :CurrentQuestion="this.CurrentQuestion"  :CurrentAnswers="this.CurrentAnswers"/>

            <questionLetter v-if="CurrentQuestionType==='letter'" :CurrentTitle="this.CurrentTitle"  :CurrentQuestion="this.CurrentQuestion"/>
            <questionAudio v-if="CurrentQuestionType==='audio'" :CurrentTitle="this.CurrentTitle"  :CurrentQuestion="this.CurrentQuestion"  :CurrentAnswers="this.CurrentAnswers" />
            

                 <a  class="btn red" v-show="this.LastQuestion" @click="send">ОТПРАВИТЬ</a>
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
   export default {
        name:'ACTexam',
        components:{
          Camera,
          timerComponent,
          questionText,
          questionLetter,
          questionAudio
          
        },
       
        computed:{
            ...mapGetters(['currentSubtestMaxTime','currentSubtestId','currentSubtestRecord',
            'currentSubtestMaxScore',"allQuestions","getQuestion",'isWebcamera',
            'getCurrentPointer']),
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
                CurrentPointer:0,
                LastQuestion:false,
                selectedTime: 0,
                timeLeft: '00:00',
                endTime: '0',
                timerFinish:false,
                isDisabledValue:false,
                Limit:2,
                
            }
           }  ,      
         methods:{
            ...mapActions(['subtestQuestions','setTime']) ,
            videoplay(id){
              console.log("video"+id)
              this.$refs.videoPlayer.src="uploads/"+this.allQuestions[id].file
              this.$refs.videoPlayer.width="100px"
               this.$refs.videoPlayer.play();
            },
            playAudio(id){
              if (this.Limit >0) {
              console.log(id)
              this.Limit=this.Limit-1
               this.isDisabledValue=true
              console.log(this.allQuestions)
              var audio = new Audio("uploads/"+this.allQuestions[id].file)
               let that = this
              audio.ontimeupdate = function () { 
                console.log( audio.currentTime.toFixed()+" "+audio.duration)
                if (audio.currentTime === audio.duration ){                  
                  that.isDisabledValue=false   
                }
               

              }
              audio.play()
              }else{
                console.log("Limit !!!!!")
              }
            },
            
            updateQuestion(){             
                this.CurrentQuestion=this.getQuestion(this.getCurrentPointer).question 
                this.CurrentQuestionType=this.getQuestion(this.getCurrentPointer).type
                this.CurrentAnswers=this.getQuestion(this.getCurrentPointer).answers  
                this.CurrentTitle=this.getQuestion(this.getCurrentPointer).desc
                if (this.getCurrentPointer+1 === this.allQuestions.length && this.CurrentQuestionType!='video'){
                  this.LastQuestion=true
                }else{
                  this.LastQuestion=false
                }
            },
            pointerclick(index){
               console.log("Index: "+index)
              this.$store.commit('updatePointer',index-1)
              this.updateQuestion();
            },
  send(){
   console.log("send...")
 
   //this.$refs.camera.download()
   this.$refs.camera.stopRecord()
   this.isDisabledValue=true
  }

            
        },

       async created(){
        
      // console.log("call:"+this.getRecorder)
        await this.subtestQuestions(1)           
           this.updateQuestion();
           this.setTime(600)
          
          
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
        this.updateQuestion()
        break

    }


  })

           
        }
   }
   </script>

<style lang="scss" scoped>

</style>
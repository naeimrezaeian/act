<template>
    <section class="pages-time">
    <div class="box">
        <div class="left">
            <div class="top">
                <div class="zag">Чтение</div>
                <div class="sub-zag">Время выполнения: <b>{{this.currentSubtestMaxTime(this.currentSubtestId)}} минут</b>. Максимальное количество баллов: <b>{{this.currentSubtestMaxScore(this.currentSubtestId)}}. Пожалуйста, не пользуйтесь электронными устройствами.</b></div>
            </div>
           
            <template v-if="this.CurrentQuestionType==='text'">
            <div class="title">{{CurrentTitle}}</div>
            <div class="text">{{this.CurrentQuestion}}</div>
            <div class="opros">
                <div class="zag">Варианты ответа:</div>
                    <button v-for="item in this.CurrentAnswers" :key="item.id" type="button" class="btns" @click="saveAnswer(item.id)">{{item.answer}}</button>
                </div>
            </template>

         


          <template v-if="this.CurrentQuestionType==='audio'">
          <div class="title">{{CurrentTitle}}</div>
            <div class="audio-vopros">
                <button type="button" :disabled='isDisabled' class="btn" @click="playAudio(this.getCurrentPointer)">ПРОСЛУШАТЬ ВОПРОС</button>
                <span>Осталось прослушиваний: {{Limit}}</span>
            </div>
                <div class="text">{{this.CurrentQuestion}}</div>
            <div class="opros">
                <div class="zag">Варианты ответа:</div>
                    <button v-for="item in this.CurrentAnswers" :key="item.id" type="button" class="btns" @click="saveAnswer(item.id)">{{item.answer}}</button>
                </div>
          </template>
          

          <template v-if="this.CurrentQuestionType==='video'">
              <div class="title">{{CurrentTitle}}</div>
            <div class="box">
                <div class="player">
                  <div class="video">
                      <video ref="videoPlayer"  style="width:100%;"></video>
                  </div>
                    
                    <div class="panel">
                        <div class="play" @click="videoplay(this.getCurrentPointer)"><img src="@/assets/img/play.svg" alt=""></div>
                      </div>
                
                </div>
                <div class="text" v-html="this.CurrentQuestion"></div>
            </div>
            <div class="box">
                <div class="audio-text">Осталось прослушиваний: 2</div>
                <a href="#" class="btn red">ОТПРАВИТЬ</a>
            </div>
          </template>
<template v-if="this.CurrentQuestionType==='letter'">
<div class="title">{{CurrentTitle}}</div>
<div class="text-mini" v-html="this.CurrentQuestion"></div>
<a href="#" class="pismo">Ответьте на вопрос письменно.</a>
</template>




                 <a  class="btn red" v-show="this.LastQuestion" @click="send">ОТПРАВИТЬ</a>
        </div>
        <div class="right">
            <div class="zag">Осталось времени</div>
            <div class="time">{{timeLeft}}</div>
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


var intervalTimer;

   export default {
        name:'ACTexam',
        components:{
          Camera,
          
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
                isDisabledValue:false,
                Limit:2,
                
            }
           }  ,      
         methods:{
            ...mapActions(['subtestQuestions']) ,
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
            saveAnswer(id){
                console.log(id+" "+this.allQuestions.length+" "+this.getCurrentPointer)
                this.$store.commit('updatePointer',this.getCurrentPointer+1)
                this.updateQuestion()
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
            setTime(seconds) {
      clearInterval(intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      // this.initialTime = this.selectedTime;
      intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if(secondsLeft === 0) {
          this.endTime = 0;
        }

        if(secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft)
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
      if ( minutes === 0 && seconds ===0 ){
      console.log("Time end")
      this.send()
      }
      
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();
      this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`
    }
  ,send(){
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
           
        }
   }

   function zeroPadded(num) {
  // 4 --> 04
  return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
  // 15 --> 3
  return (hour % 12) || 12;
}

</script>

<style lang="scss" scoped>

</style>
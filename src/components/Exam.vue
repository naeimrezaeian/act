<template>
    <section class="pages-time">
    <div class="box">
        <div class="left">
            <div class="top">
                <div class="zag">Чтение</div>
                <div class="sub-zag">Время выполнения: <b>{{this.currentSubtestMaxTime(this.currentSubtestId)}} минут</b>. Максимальное количество баллов: <b>{{this.currentSubtestMaxScore(this.currentSubtestId)}}. Пожалуйста, не пользуйтесь электронными устройствами.</b></div>
            </div>
            <div class="title">Выберите правильный вариант. Прочитайте сообщения и найдите логическое продолжение этой информации в вариантах</div>
            <div class="text">{{this.CurrentQuestion}}</div>
            <div class="opros">
                <div class="zag">Варианты ответа:</div>
                    <button v-for="item in this.CurrentAnswers" :key="item.id" type="button" class="btns" @click="saveAnswer(item.id)">{{item.answer}}</button>
                </div>

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
                <div class="res">ЗАПИСЬ</div>
                  <Camera/>
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
          Camera

        },
        computed:{
            ...mapGetters(['currentSubtestMaxTime','currentSubtestId','currentSubtestRecord',
            'currentSubtestMaxScore',"allQuestions","getQuestion",
            'getCurrentPointer']),
           },  
           data(){
            return {
                CurrentQuestion:'',
                CurrentAnswers:[],
               
                CurrentPointer:0,
                LastQuestion:false,
                selectedTime: 0,
                timeLeft: '00:00',
                endTime: '0',
            }
           }  ,      
         methods:{
            ...mapActions(['subtestQuestions']) ,
            callMethodInChildComponent() {
      //As an instance property
      this.$camera.$emit("callMethodInChild");
            },
            saveAnswer(id){
                console.log(id)
                
                
                 this.$store.commit('updatePointer',this.getCurrentPointer+1)
                this.updateQuestion()
            },
            updateQuestion(){
                this.CurrentQuestion=this.getQuestion(this.getCurrentPointer).question 
                this.CurrentAnswers=this.getQuestion(this.getCurrentPointer).answers  
                if (this.getCurrentPointer+1 === this.allQuestions.length){
                  this.LastQuestion=true
                }else{
                  this.LastQuestion=false
                }
            },
            pointerclick(index){
               
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
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`
    }
  ,send(){
    this.callMethodInChild()
  }

            
        },

       async created(){
       
        await this.subtestQuestions(1)           
           this.updateQuestion();
           this.setTime(600)
          
          
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
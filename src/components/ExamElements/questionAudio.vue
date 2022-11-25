<template>
    <div class="title">{{CurrentTitle}}</div>
            <div class="audio-vopros">
                <button type="button"  class="btn" v-bind:class="{btn_play:this.AudioBtn}" @click="playAudio()">
                <p>ПРОСЛУШАТЬ ВОПРОС</p>                
                
                </button>
                <span>Осталось прослушиваний: {{CurrentAudioLimit}}</span>
            </div>
                <div class="text">{{CurrentQuestion}} </div>                
            <div class="opros">
                <div class="zag">Варианты ответа:</div>  
                <template v-for="item in CurrentAnswers" :key="item.id">
                    <button v-if="isAnswer(item.id)" type="button" class="btns" style="background-color: red;" @click="sendAnswer([CurrentQuestionId,item.id,getCurrentTimeInSecond,getNextQuestion])">{{item.answer}}</button>
           <button v-else type="button" class="btns"  @click="sendAnswer([CurrentQuestionId,CurrentId,item.id,getNextQuestion])">{{item.answer}}</button>
            </template>           
                    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
  export default {
        name:"questionAudio",
        data(){
            return {
                AudioBtn:false
            }
        },
        

        props:{
             CurrentTitle:{
                type:String,
                require:true
            },
            CurrentQuestion:{
                 type:String,
                require:true
            },
            CurrentAnswers:{
                 type:Object,
                require:true
            },
            CurrentAudioFile:{
                type:String,
                require:true
            },
            CurrentAudioLimit:{
                    type:Number,
                    require:true
            },
            SelectedAnswers:{
                type:Object,
                require:true
            },
            CurrentQuestionId:{
                type:String,
                require:true
            },           
            CurrentId:{
                type:String,
                require:true 
            }

        },
        computed:{
            ...mapGetters(['getCurrentPointer','getNextQuestion','selectedAnswers']),
            answersList(){
            if(this.selectedAnswers[0]){
          return  this.selectedAnswers[0].map(item => item.answerId)
            }else{                
          return []
            }
        }
          
        },        
        
        methods:{
            ...mapActions(['sendAnswer']),
            isAnswer(id){           return this.answersList.includes(id) },
            playAudio(){
                console.log("play "+this.CurrentAudioFile)
                this.AudioBtn=!this.AudioBtn
                var audio = new Audio("uploads/"+this.CurrentAudioFile)
               let that = this
              audio.ontimeupdate = function () { 
                //console.log( audio.currentTime.toFixed()+" "+audio.duration)
                if (audio.currentTime === audio.duration ){                  
                  that.AudioBtn=!that.AudioBtn
                  console.log("audio finish") 
                }
              }
               audio.play()
                
                
            }
        }
    }
    
</script>

<style  scoped>

</style>
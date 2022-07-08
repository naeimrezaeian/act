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
                    <button v-for="item in CurrentAnswers" :key="item.id" type="button" class="btns" @click="saveAnswer([getCurrentPointer,item.id])">{{item.answer}}</button>
                </div>
</template>

<script>
import {mapGetters} from 'vuex'


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
            }

        },
        computed:{
            ...mapGetters(['getCurrentPointer'])
        },
        methods:{
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
.btn_play{
    background-color: rgb(224, 224, 224);
    cursor: default;
}
</style>
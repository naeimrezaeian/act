<template>
    <div class="title">{{CurrentTitle}}</div>
            <div class="audio-vopros">
                <button type="button"  class="btn" v-bind:class="{btn_play:this.AudioBtn}" @click="getAudio()">
                <p>ПРОСЛУШАТЬ ВОПРОС</p>                
                
                </button>
                <span>Осталось прослушиваний: {{(this.Limit)}}</span>
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
import httpClient from '@/httpClient';

  export default {
        name:"questionAudio",
        data(){
            return {
                AudioBtn:false,
                audio: new Audio(),
                Limit:0,
                Listen:0              
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
            CurrentListen:{
                type:Number,
                require:true  
            },
            CurrentToken:{
                type:String,
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
            ...mapGetters(['getCurrentPointer','getNextQuestion','selectedAnswers','GetFileAccessToken','GetFileLimit','GetFileListen']),
            answersList(){
            if(this.selectedAnswers[0]){
          return  this.selectedAnswers[0].map(item => item.answerId)
            }else{                
          return []
            }
        }
          
        },   
         

        methods:{
            ...mapActions(['sendAnswer','FileAccessToken']),
            isAnswer(id){           return this.answersList.includes(id) },
            async getAudio(){
                this.AudioBtn=!this.AudioBtn
                console.log("Get Audio")
               //this.Limit=this.CurrentAudioLimit-this.CurrentListen
             
                if (this.CurrentAudioLimit-this.CurrentListen>=1){
                
                var reader = new FileReader();
                const responseFile = await httpClient.get('/api/files/DownloadFile/' + this.CurrentAudioFile+"/"+this.CurrentToken,{ responseType: 'blob',showLoader:false })
                reader.readAsBinaryString(responseFile.data);
                reader.onload = function(){ 
                    
                    var arrayBuffer = reader.result;
                    var base64str = btoa( arrayBuffer);
                    this.audio.src="data:audio/wav;base64,"+base64str
                    this.audio.play()
                }.bind(this)
            }else{
                console.log("file audio error")
            }
            },
            init(){
                console.log("init")
                console.log(this.CurrentAudioLimit)
                this.Limit=this.CurrentAudioLimit
                this.Listen=this.CurrentListen
                this.Limit=this.CurrentAudioLimit-this.CurrentListen


            }

            }
            ,
            watch:{
                CurrentListen(new_value,old_value){
                    console.log(new_value+" "+old_value)
                    this.init()
                }
            }

        }
    
    
</script>

<style  scoped>

</style>
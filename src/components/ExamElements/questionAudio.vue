<template>
    <div class="title">{{CurrentTitle}}</div>
            <div class="audio-vopros">
                <button type="button"  class="btn" @click="playAudio(this.getCurrentPointer)">ПРОСЛУШАТЬ ВОПРОС</button>
                <span>Осталось прослушиваний: {{Limit}}</span>
            </div>
                <div class="text">{{CurrentQuestion}}</div>
            <div class="opros">
                <div class="zag">Варианты ответа:</div>
                    <button v-for="item in CurrentAnswers" :key="item.id" type="button" class="btns" @click="saveAnswer(item.id)">{{item.answer}}</button>
                </div>
</template>

<script>
    export default {
        name:"questionAudio",
        data(){
            return{
                Limit:2
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
                require:false
            }

        }
        


        
    }
</script>

<style lang="scss" scoped>

</style>
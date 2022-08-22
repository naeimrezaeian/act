<template>
    <div class="title">{{CurrentTitle}}</div>
    <div class="text">{{CurrentQuestion}}</div>
    <div class="opros">
        <div class="zag">Варианты ответа:</div>
     <template v-for="item in CurrentAnswers" :key="item.id">
            <button v-if="isAnswer(item.id)" type="button" class="btns" style="background-color: red;" @click="sendAnswer([CurrentQuestionId,item.id,getCurrentTimeInSecond,getNextQuestion])">{{item.answer}}</button>
           <button v-else type="button" class="btns"  @click="sendAnswer([CurrentQuestionId,item.id,getNextQuestion])">{{item.answer}}</button>
        </template>
        </div>
 
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
//answerId
    export default {
        name:"questionText",
        props:{
           
            CurrentTitle:{
                type:String,
                require:true
            },
            CurrentQuestion:{
                 type:String,
                require:true
            },
            CurrentQuestionId:{
                 type:String,
                require:true
            },
            CurrentAnswers:{
                 type:Object,
                require:true
            }
        },
        computed:{
            ...mapGetters(['getCurrentPointer','getCurrentTimeInSecond','getNextQuestion','selectedAnswers'])
        ,answersList(){
            if(this.selectedAnswers[0]){
          return  this.selectedAnswers[0].map(item => item.answerId)
            }else{                
          return []
            }
        }
        },
        methods:{            
            ...mapActions(['sendAnswer']),
            isAnswer(id){    
                          
                return this.answersList.includes(id) 
                
                
            }
        },
       async created(){
         // await this.sendAnswer([ "3ff008c9-88ff-4df0-be69-56d8803cf167", "3ff008c9-88ff-4df0-be69-56d8803cf16e", 500, null ]) 
         
        }

        
    }
</script>

<style lang="scss" scoped>

</style>
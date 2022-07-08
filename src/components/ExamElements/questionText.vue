<template>
    <div class="title">{{CurrentTitle}}</div>
    <div class="text">{{CurrentQuestion}}</div>
    <div class="opros">
        <div class="zag">Варианты ответа:</div>
            <button  v-for="item in CurrentAnswers" :key="item.id" type="button" class="btns" @click="sendAnswer([getCurrentPointer,item.id])">{{item.answer}}</button>
        </div>
 
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

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
            CurrentAnswers:{
                 type:Object,
                require:true
            }
        },
        computed:{
            ...mapGetters(['getCurrentPointer'])
        },
        methods:{            
            ...mapActions(['sendAnswer'])
        },
        created(){
           
         
        }

        
    }
</script>

<style lang="scss" scoped>

</style>
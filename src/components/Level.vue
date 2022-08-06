<template>
   <section>
    <div class="conteiner">
        <div class="page">
            <div class="title">{{titleValue}}</div>
            <div class="text-main" v-html="descValue"></div>
            <a  class="btn" @click.once="start">НАЧАТЬ ЭКЗАМЕН</a>
        </div>
    </div>
</section>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
    export default {
        name:'ACTlevel',
        
        computed:{
            ...mapGetters(['titleValue','descValue','currentLevelId']),
           
        } ,
        async created(){

            this.levelInformation(this.currentLevelId);           
          
          
           
        },methods:{
             ...mapActions(['levelInformation']),
        start(){
            
            this.$router.push("/module");
        }
        }
        
        
    }
</script>

<style lang="scss" scoped>

</style>
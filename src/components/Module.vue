<template>
    <section class="pages">
    <div class="box">
        <div class="left">
            <div v-for="module in this.moduleList" :key="module.id">
            <div class="zag" ><span>{{module.title}}</span></div>
            
            <ul>
                  <li v-for="item in module.subtests" :key="item.id">
                  <strong class="subtest-current" v-if="item.status=='active'">{{item.title}}</strong>
                  <span  v-else-if="item.status==0">{{item.title}}</span>
                  <span  class="subtest-passed" v-else-if="item.status==2">{{item.title}}</span>
                 
                  </li>   
            </ul>
            </div>
        </div>
        <div class="right">
            <div class="title">{{title}}</div>
            <div class="text" v-html="desc"> </div>
            <a href="#" class="btn" @click="start">НАЧАТЬ</a>
        </div>
    </div>
</section>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
    export default {
        name:"ACTmodule",
        data(){
            return {
                exam:'',
                title:'',
                desc:''
            }
        },computed:{
            ...mapGetters(['moduleList','currentSubtestId']),
           
        } ,
       async created(){
        // if(!this.currentSubtestId) {
            
        // }
        const response = await axios.get("api/subtests/"+this.currentSubtestId)        
        this.title=response.data.result.title;
        this.desc=response.data.result.desc;
          
                 
        },methods:{
            start(){
                  this.$router.push("/exam");
            }
        }

    }
</script>

<style  scoped>

.subtest-passed{
   
    text-decoration: line-through;
}
.subtest-current{
     color:rgb(247, 255, 13);

}

</style>
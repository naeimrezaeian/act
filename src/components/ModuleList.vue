<template>
    <div v-for="module in this.moduleList()" :key="module.id">
                    <div class="zag"><span>{{ module.title }}</span></div>

                    <ul>
                        <li v-for="item in module.subtests" :key="item.id">
                            <strong class="subtest-current" v-if="item.status == 'active'">{{ item.subtest.title
                            }}</strong>
                            <span v-else-if="item.status == 'created'">{{ item.subtest.title }}</span>
                            <span class="subtest-passed" v-else-if="item.status == 'passed'">{{ item.subtest.title
                            }}</span>

                        </li>
                    </ul>
                </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        name:"ACTmoduleList",
       

       async  created(){
       //  await this.getCurrentState()

        },
        methods:{
             ...mapGetters(['moduleList', 'currentSubtestId']),
           //   ...mapActions(['getCurrentState']),

        }

        
        
    }
</script>

<style  scoped>
.subtest-passed {

    text-decoration: line-through;
}

.subtest-current {
    color: rgb(247, 255, 13);

}

</style>
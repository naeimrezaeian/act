<template>
    <div v-for="item in moduleList" :key="item.id">
        <div class="zag"><span>{{ item.title }}</span></div>
        <ul>
            <li v-for="item in item.subtests" :key="item.id">
                <strong class="subtest-current" v-if="item.status == 'active'">{{ item.subtest.title}}</strong>
                <span v-else-if="item.status == 'created'">{{ item.subtest.title }}</span>
                <span class="subtest-passed" v-else>{{ item.subtest.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        name:"ACTmoduleList",
        computed:{
            ...mapGetters(['moduleList']),
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
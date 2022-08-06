<template>
    <section class="pages">
        <div class="box">
            <div class="left">
                <div v-for="module in this.moduleList" :key="module.id">
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
            </div>
            <div class="right">
                <div class="title">{{ title }}</div>
                <div class="text" v-html="desc"> </div>
                <a v-if="title" href="#" class="btn" @click="start">НАЧАТЬ</a>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: "ACTmodule",
    data() {
        return {
            exam: '',
            title: '',
            desc: ''
        }
    }, computed: {
        ...mapGetters(['moduleList', 'currentSubtestId']),

    },
    async created() {
        await this.getCurrentState()
        const currentmoudle = JSON.parse(localStorage.getItem("exam")).modules.map(
            function (e) {
                const subtest = e.subtests.filter(i => i.status === 'active')
                return subtest.length ? { module: e, subtest: subtest[0] } : null
            }
        ).filter(item => item)[0]
        if (currentmoudle) {
            await this.setCurrentSubtest({ moduleId: currentmoudle.module.id, subtestId: currentmoudle.subtest.subtest.id })
            const response = await axios.get("api/usersubtests/" + this.currentSubtestId)
            this.title = response.data.result.subtest.title;
            this.desc = response.data.result.subtest.desc;
        }
        else{
            console.log('exam done')
        }

    }, methods: {
        ...mapActions(['setCurrentSubtest', 'sendCurrentState', 'startSubtest', 'getCurrentState']),
        async start() {
            await this.startSubtest(this.currentSubtestId)
            await this.getCurrentState()
            this.$router.push("/exam");
        }
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
<template>
    <section class="pages">
        <div class="box">
            <div class="left">
                <ACTmoduleList></ACTmoduleList>

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
import httpClient from '@/httpClient';
import { mapGetters, mapActions } from 'vuex'
import ACTmoduleList from './ModuleList.vue'
export default {
    name: "ACTmodule",
    components: {
        ACTmoduleList,


    },
    data() {
        return {
            exam: '',
            title: '',
            desc: '',
            pageStatus: true
        }
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
            await this.setCurrentSubtest({ moduleId: currentmoudle.module.id, subtestId: currentmoudle.subtest.id })
            const response = await httpClient.get("api/userexam/usersubtests/" + this.currentSubtestId)
            this.title = response.data.result.subtest.title;
            this.desc = response.data.result.subtest.desc;
        }
        else {
            this.$router.push({ name: 'Finish' });
        }
    },
    mounted() {
        this.$soketio.client._connectionState != 'Disconnected' ? null : this.$soketio.start();
    },
    computed: {
        ...mapGetters(['currentSubtestId']),
    },
    methods: {
        ...mapActions(['setCurrentSubtest', 'sendCurrentState', 'startSubtest', 'getCurrentState']),
        async start() {
            navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(async () => {
                await this.startSubtest(this.currentSubtestId)
                await this.getCurrentState()
                this.$router.push("/exam");
            }).catch(() => {
                console.log('no')
            })
        }
    },
}
</script>

<style  scoped>

.text {
    width: 86% !important;
    max-height: 30% !important;
    overflow: auto;
    margin-bottom: 50px;
}
</style>
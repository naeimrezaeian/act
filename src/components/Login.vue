<template>
    <div v-if="this.loadingValue" id="overlay"></div>
    <section>

        <div class="conteiner">
            <div class="page">
                <div class="title">Авторизация</div>
                <div class="text">В случае проблем с авторизацией обратитесь к сотруднику соответствующей службы</div>
                <span v-if="this.errorValue" class="error-text">{{ this.errorValue }}</span>
                <form @submit.prevent="handelSubmit">
                    <div class="box">
                        <label for="login"><img src="@/assets/img/login.svg" alt=""></label>
                        <input type="text" placeholder="Логин" id="login" v-model="currentUser.login">
                        <div class="info">
                            <img src="@/assets/img/info.svg" alt="">
                            <span>Информационное окно при нажатии о логине</span>
                        </div>
                    </div>
                    <div class="box">
                        <label for="pass"><img src="@/assets/img/pass.svg" alt=""></label>
                        <input type="password" placeholder="Пароль" id="pass" autocomplete="off" v-model="currentUser.password">
                        <div class="info">
                            <img src="@/assets/img/info.svg" alt="">
                            <span></span>
                        </div>
                    </div>
                    <button type="submit" class="btn">ВОЙТИ</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ACTlogin',

    data() {
        return {
            currentUser: {
                login: '',
                password: ''
            },
            error: '',

        }
    },
    computed: {
        ...mapGetters(['loadingValue', 'errorValue', 'currentStateData'])
    }
    ,
    methods: {
        ...mapActions(['loginUser']),
        async handelSubmit() {
console.log("login")
          //
         await this.loginUser(this.currentUser)
/*
            if (localStorage.getItem("token")) {

                if (this.currentStateData.start === null) {
                    if (this.currentStateData.moduleId === null) {
                        console.log("goto level")
                        this.$router.push("/level");
                    } else {
                         console.log("goto module")
                        this.$router.push("/module");
                    }
                } else {

                    this.$router.push("/exam")

                }

            }
            */

        }



        // await this.$store.dispatch("loginUser",this.currentUser)



        // this.currentUser.password=this.currentUser.login   





    }


}
</script>
<style scoped>
#overlay {
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
}
</style>


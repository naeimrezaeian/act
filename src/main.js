import { createApp } from 'vue'
import socketHub from '@/socketHub';
import store from './store'
import App from './App.vue'
import router from './router';
import './axios'
//import axiosinstance from './axiosinstance'


socketHub.client.on("multipleConnections",function(){
    console.log("Multiple logins deteced")
    localStorage.removeItem("token")
    localStorage.removeItem("exam")
    router.push({name:'Login'})
    location.reload()
});
socketHub.client.on("closeApp", () => {
    console.log("close App")
})
const app = createApp(App)
app.config.globalProperties.$soketio = socketHub
app.use(store)
app.use(router)
app.mount('#app')





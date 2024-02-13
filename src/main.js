import { createApp } from 'vue'
import socketHub from '@/socketHub';
import store from './store'
import App from './App.vue'
import router from './router';
import './axios'
import Swal from 'sweetalert2'
//import axiosinstance from './axiosinstance'


socketHub.client.on("multipleConnections",async function(){
    const result = await Swal.fire({
        title: "Время сеанса истекло!",
        text: "Другой IP-адрес выполнен с вашим именем пользователя!",
        icon: "warning"
    })
    if (result.isConfirmed) {
        localStorage.removeItem("token")
        localStorage.removeItem("exam")
        router.push({name:'Login'})
        location.reload()
    }
});
socketHub.client.on("closeApp", () => {
    Swal.fire({
        title: "Неа!",
        text: "Эта операция не разрешена!",
        icon: "error"
    })
})
const app = createApp(App)
app.config.globalProperties.$soketio = socketHub
app.config.globalProperties.Swal = Swal
app.use(store)
app.use(router)
app.mount('#app')





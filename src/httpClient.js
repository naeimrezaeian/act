import axios from "axios";
import router from "./router";
const requestFetch = axios.create({
    baseURL:'http://51.250.106.203:7064/'
    //baseURL:'https://localhost:7064/'
});

requestFetch.interceptors.request.use((request)=>{
    return request
},(error)=>{
    return Promise.reject(error)
})


requestFetch.interceptors.response.use((response)=>{
   
    if(response.status ===200 || response.status===201){
        return Promise.resolve(response)
    }else{
       
        return Promise.reject(response)
    }
},(error)=>{
    if (401 === error.response.status) {
        console.log("******************")
        localStorage.removeItem("token")
        localStorage.removeItem("exam")
        router.push({name:'Login'})
        location.reload()
               
    } else {
        console.log("_____________")
        return Promise.reject(error);
    }
})

export default requestFetch

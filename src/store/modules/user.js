import axios from 'axios'

export default {
    state:{       
        user:{},
        error:'',
        loading: false
     },
    actions:{
         loginUser({commit},user){
            const error=''
            const loading = true;
            commit('updateLogin',{error:error,loading:loading})

      
             axios.get('login', {login : user.login, password :user.password} ).then((response) =>{  
           
                if (response.data && response.data.message === "success"){ 
                    localStorage.removeItem("token")
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem("exam",JSON.stringify(response.data.exam))
                    const error=''
                    const loading = false;
                    commit('updateLogin',{error:error,loading:loading})
                    
                }else{                   
                    const error='Логин или пароль введены неверно'
                    const loading = false;
                    commit('updateLogin',{error:error,loading:loading})
                } 

            }).catch(() =>{
                
                const error='Ошибка соединения к серверу'
                const loading = false;
                commit('updateLogin',{error:error,loading:loading})
            })
       
            
           
        }
    },
    mutations:{
        updateLogin(state,data) { 
            state.error=data.error
            state.loading=data.loading            
        }
    },
    
    getters:{
        loadingValue(state){
            return state.loading
        },
        errorValue(state){
            return state.error
        },
        currentLevelId(){
           
            return JSON.parse(localStorage.getItem("exam")).levelid
        },
        currentSubtestId(){
            
             return JSON.parse(localStorage.getItem("exam")).currentState.subtestId
         },
         currentSubtestMaxTime: () => (id) => {
            return JSON.parse(localStorage.getItem("exam")).module.map(
                function(e){
                    return e.subtest.filter(i =>i.id===id)
                }
            )[0][0].maxtime
         },
         currentSubtestMaxScore: () => (id) => {
            return JSON.parse(localStorage.getItem("exam")).module.map(
                function(e){
                    return e.subtest.filter(i =>i.id===id)
                }
            )[0][0].maxscore
         },
         currentSubtestRecord(){
           return JSON.parse(localStorage.getItem("exam")).currentState.record
            //return true
         },
        moduleList(){
            return JSON.parse(localStorage.getItem("exam")).module
        }


       
    }
}
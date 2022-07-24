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

      
             axios.post('api/user/login', {username : user.login, password :user.password} ).then((response) =>{  
           
                if (response.data && response.data.success === true){ 
                    
                    localStorage.removeItem("token")
                    localStorage.removeItem("exam")
                    localStorage.setItem('token',response.data.result.token);
                    localStorage.setItem("exam",JSON.stringify(response.data.result.exam))
                    sessionStorage.setItem('isAuth', 'true');
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
           
            return JSON.parse(localStorage.getItem("exam")).levelId
        },
        currentSubtestId(){
            
             return JSON.parse(localStorage.getItem("exam")).currentState.subtestId
         },
         currentSubtestMaxTime: () => (id) => {
            return JSON.parse(localStorage.getItem("exam")).modules.map(
                function(e){
                    return e.subtests.filter(i =>i.id===id)
                }
            )[0][0].maxTime
         },
         currentSubtestMaxScore: () => (id) => {
            return JSON.parse(localStorage.getItem("exam")).modules.map(
                function(e){
                    return e.subtests.filter(i =>i.id===id)
                }
            )[0][0].maxScore
         },
         currentSubtestRecord(){
           return JSON.parse(localStorage.getItem("exam")).currentState.record
            //return true
         },
         currentStateData(){
            return JSON.parse(localStorage.getItem("exam")).currentState
         },
        moduleList(){
            return JSON.parse(localStorage.getItem("exam")).modules
        }


       
    }
}
import httpClient from '@/httpClient';
export default {
    state:{
        title:'',
        desc:''
    },
    actions:{

        async levelInformation({commit},levelData){    
               
       const response= await httpClient.get("api/userexam/levels/"+levelData)
       
        if (response.data && response.data.success===true){
            commit('updateLevel',response.data.result)
        }
        
    
}
    },
    mutations:{
        updateLevel(state,data){
            state.title=data.title
            state.desc=data.desc
        }
    },
    getters:{
        titleValue(state){
            return state.title
        },
        descValue(state){
            return state.desc
        }
    }
}
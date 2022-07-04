import axios from "axios"

export default {
    state:{
        title:'',
        desc:''
    },
    actions:{

        async levelInformation({commit},levelData){           
        const response= await axios.get("levels/"+levelData)
        if (response.data ){
            commit('updateLevel',response.data)
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
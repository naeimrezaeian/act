

export default {
    state:{
       isWebcamera:false
    },
    actions:{

        set_isWebcamera({commit},data){
            commit("update_isWebcamera",data)

        }

       
    },
    mutations:{
        update_isWebcamera(state,data){
            state.isWebcamera=data
        }
        
    },
    getters:{
        isWebcamera(state){
            return state.isWebcamera
        }
        
    }
}
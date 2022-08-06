export default{
    state:{
        module:null,
        subtest:null,
    },
    actions:{
    },
    mutations:{
        updateCurrentState(state, data){
            state.module=data.moduleId
            state.subtest=data.subtestId
        }
    }
}
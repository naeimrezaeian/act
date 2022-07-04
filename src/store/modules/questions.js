import axios from "axios"

export default {
    state:{
        questionsList:[],
        currentPointer:0
       
    },
    actions:{
        async subtestQuestions({commit},subtest){ 
        subtest      
        const response= await axios.get("questions")
        if (response.data ){            
            commit('updateQuestions',response.data)            
        }

        }
    },
    mutations:{
        updateQuestions(state,data){           
            state.questionsList=data
        },
        updatePointer(state,value){
            state.currentPointer=value
        }
    },
    getters:{
        allQuestions(state){
          
            return state.questionsList
        },
        getQuestion: (state) => (pointer) => {
       
            return state.questionsList[pointer]
        },
        getCurrentPointer(state){
            return state.currentPointer
        }

        
    }
}
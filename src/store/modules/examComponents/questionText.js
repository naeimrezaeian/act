import axios from "axios"

export default {
    state:{
        selectedAnswers:[],
    },
    actions:{   
        async sendAnswer({commit},[questionId,answerId,secondsLeft,nextQuestion]){       
            console.log({method:'sendAnswer',data:[questionId,answerId]})      
            const response= await axios.post("api/questions/examAnswer/",{questionId,answerId,secondsLeft,nextQuestion:nextQuestion?nextQuestion.id:null})
            console.log({method:'sendAnswer',data:[questionId,answerId]})
            commit("updateSendAnswer",response.data.result)
        } 
        
    },
    mutations:{
        updateSendAnswer(state,data){
            console.log({method:'updateSendAnswer',data})
            state.selectedAnswers.push(data.answers)
        }
      
    },
    getters:{
        selectedAnswers(state){
            return state.selectedAnswers
        }
       
    }
}
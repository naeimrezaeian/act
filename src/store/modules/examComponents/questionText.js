import axios from "axios"

export default {
    state:{
        selectedAnswers:[],
    },
    actions:{   
        async sendAnswer({commit},[questionId,answerId]){                
            const response= await axios.post("api/questions/examAnswer/",{questionId:questionId,answerId:answerId}
            )
            //console.log(response.data.answers)
            commit("updateSendAnswer",response.data)
        } 
        
    },
    mutations:{
        updateSendAnswer(state,data){
           
            state.selectedAnswers.push(data.answers)
        }
      
    },
    getters:{
        selectedAnswers(state){
            return state.selectedAnswers
        }
       
    }
}
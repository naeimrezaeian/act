import axios from "axios"

export default {
    state:{
        selectedAnswers:[],
    },
    actions:{   
        async sendAnswer({commit},[questionIndex,questionId]){                
            const response= await axios.post("examAnswer/",{questionIndex:questionIndex,questionId:questionId}
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
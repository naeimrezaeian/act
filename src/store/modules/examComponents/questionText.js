import axios from "axios"

export default {
    state:{
        Answers:[],
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
           
            state.Answers.push(data.answers)
        }
      
    },
    getters:{
       
    }
}
import httpClient from '@/httpClient';

export default {
    state:{
        selectedAnswers:[],
    },
    actions:{   
        async getAnswers({commit},subtestId){
            if (subtestId!=null){
            const response= await httpClient.get("api/userexam/questions/GetAnswers/"+subtestId,{showLoader:false})
            commit("updateSendAnswer",response.data.result)
            }
        },
        async sendAnswer({commit},[questionId,answerId,nextQuestion]){       
           
            const response= await httpClient.post("api/userexam/questions/examAnswer/",{questionId,answerId,nextQuestion:nextQuestion?nextQuestion.id:null},{showLoader:false})
          
            commit("updateSendAnswer",response.data.result)
        } 
        
    },
    mutations:{
        updateSendAnswer(state,data){
            state.selectedAnswers=[]
            state.selectedAnswers.push(data)
        }
      
    },
    getters:{
        selectedAnswers(state){
           
            return state.selectedAnswers
        }
       
    }
}
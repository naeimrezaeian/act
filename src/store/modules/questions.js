import httpClient from '@/httpClient';
import router from '../../router'

export default {
    state: {
        questionsList: [],
        currentPointer: null

    },
    actions: {
        async subtestQuestions({ commit }, subtest) {
            
            if (subtest!=null){
                
            const response = await httpClient.get('api/userexam/questions/' + subtest)

            if (response.data && response.data.success === true) {
                //console.log("new")
                //console.log(response.data.result)
                commit('updateQuestions', response.data.result)
                commit('updatePointer', response.data.result[0].id)
            }
        }

        },
       
        updateQuestionPointer({ commit,state }, data) {
         
                if(!data && Object.keys(state.questionsList).length>0){                    
                data=state.questionsList[0].id                
               }
                commit("updatePointer", data)
        },
        async finishExam({commit}, subtest) {
            try {
                await httpClient.post('api/userexam/usersubtests/DoneSubtest/' + subtest)
                commit('updateQuestions', [])
                commit('updatePointer', null)
            } catch (error) {
                console.log(error)
            }
            finally{
                const response= await httpClient.get('api/userexam/Levels/GetUserExamLevel')
                if(response.data && response.data.success){
                    localStorage.removeItem('exam');
                    localStorage.setItem('exam',JSON.stringify(response.data.result));
                }
                router.push("/module");
            }
        }
    },
    mutations: {
        updateQuestions(state, data) {
            //new code
          
            let res=[]
            data.map(items =>{items.questionTexts.map(i =>{return i}).map(j => {res.push(Object.assign({},
            {"type":items.type,"desc":items.desc,"status":items.status,"listenLimitCount":items.listenLimitCount,"fileId":items.fileId},
            {"id":j.questionId,"question":j.questionTitle,"answers":j.answers}))});
            })
            //
            //state.questionsList = data
            console.log(res)
            state.questionsList=res


        },
        updatePointer(state, value) {
            state.currentPointer = value
        }
    },
    getters: {
        allQuestions: (state) =>() =>{
            return state.questionsList
           
        },
        getQuestion: (state) => (pointer) =>{
            
            return state.questionsList.filter(question => question.id === pointer)[0]},
        getCurrentPointer: (state) => state.currentPointer,
        getNextQuestion: (_,getters) => {
            
            const index = getters.allQuestions.indexOf(getters.getQuestion(getters.getCurrentPointer))
             if (index >= getters.allQuestions.length) return null
            return getters.allQuestions[index + 1]
        }
    }
    
}
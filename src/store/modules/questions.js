import axios from "axios"
import router from '../../router'

export default {
    state: {
        questionsList: [],
        currentPointer: null

    },
    actions: {
        async subtestQuestions({ commit }, subtest) {
            subtest
            const response = await axios.get('api/questions/' + subtest)

            if (response.data && response.data.success === true) {
                commit('updateQuestions', response.data.result)
                commit('updatePointer', response.data.result[0].id)
            }

        },
        updateQuestionPointer({ commit,state }, data) {
            if(!data){
                data=state.questionsList[0].id
            }
            console.log({ method:'updateQuestionPointer', data})
            commit("updatePointer", data)
        },
        async finishExam({commit}, subtest) {
            try {
                await axios.post('api/usersubtests/DoneSubtest/' + subtest)
                commit('updateQuestions', [])
                commit('updatePointer', null)
            } catch (error) {
                console.log(error)
            }
            finally{
                const response= await axios.get('api/Levels/GetUserExamLevel')
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
            state.questionsList = data
        },
        updatePointer(state, value) {
            state.currentPointer = value
        }
    },
    getters: {
        allQuestions: (state) => state.questionsList,
        getQuestion: (state) => (pointer) =>{
            return state.questionsList.filter(question => question.id === pointer)[0]},
        getCurrentPointer: (state) => state.currentPointer,
        getNextQuestion: (_,getters) => {
            
            const index = getters.allQuestions.indexOf(getters.getQuestion(getters.getCurrentPointer))
            console.log({method:'getNextQuestion',data: getters.allQuestions,data2:getters.getCurrentPointer,data3:getters.getQuestion(getters.getCurrentPointer), index})
            if (index >= getters.allQuestions.length) return null
            return getters.allQuestions[index + 1]
        }
    }
}
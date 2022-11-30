import httpClient from '@/httpClient';
import router from '../../router'

export default {
    state: {
        questionsList: [],
        currentPointer: null,
        currentFileAccessToken:null,
        currentFileLimit:null,
        currentFileListen:null

    },
    actions: {

        
        async FileAccessToken({commit},fileId){
            console.log("GetAccessToken")

           /* {
                "success": true,
                "result": {
                    "fileId": "3ff008c9-88ff-4df0-be69-56d8803cf160",
                    "accessCode": 739308630,
                    "listenLimitCount": 3,
                    "listenCount": 1
                }
            }
            */

            const responseAccess = await httpClient.get('/api/files/DownloadFile/GetFileAccessCode/' + fileId,{showLoader:false})
            
            
            if (responseAccess.data && responseAccess.data.success === true) {

                //const responseFile = await httpClient.get('/api/files/DownloadFile/' + fileId+"/"+responseAccess.data.result.accessCode)
               
                commit('updateAccessToken',responseAccess.data.result)


            }


        },
        async subtestQuestions({ commit }, subtest) {
            
            if (subtest!=null){
                
            const response = await httpClient.get('api/userexam/questions/' + subtest)

            if (response.data && response.data.success === true) {
                
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
        updateAccessToken(state,data){
            console.log(data)
            state.currentFileAccessToken=data.accessCode
            state.currentFileListen=data.listenCount
            state.currentFileLimit=data.listenLimitCount
        },
        updateQuestions(state, data) {
            //new code
         
            let res=[]
            data.map(items =>{items.questionTexts.map(i =>{return i}).map(j => {res.push(Object.assign({},
            {"type":items.type,"desc":items.desc,"status":items.status,"listenLimitCount":items.listenLimitCount,"fileId":items.fileId},
            {"id":j.id,"question":j.questionTitle,"answers":j.answers,"questionId":j.questionId}))});
            })
            //
            //state.questionsList = data
           
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
        getNextQuestion: (state) => {
          
            const index = state.questionsList.indexOf(state.questionsList.filter(question => question.id === state.currentPointer)[0])
            
             if (index >= state.questionsList.length-1) return null
            
            return state.questionsList[index+1]
        },
        GetFileAccessToken:(state)=>() => { return state.currentFileAccessToken},
        GetFileLimit:(state)=>() => { return state.currentFileLimit},
        GetFileListen:(state)=>() => { return state.currentFileListen},

    }
    
}
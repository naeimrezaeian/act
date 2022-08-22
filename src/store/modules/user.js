import axios from 'axios'
import router from '../../router'
export default {
    state: {
        user: {},
        error: '',
        loading: false,
        currentModule: {}
    },
    actions: {
        async loginUser({ commit }, user) {
           
            try {
                var response = await axios.post('api/auth/user/login', { username: user.login, password: user.password })
                if (response.data && response.data.success === true) {

                    localStorage.removeItem("token")
                    localStorage.removeItem("exam")
                    localStorage.setItem('token', response.data.result.token);
                    localStorage.setItem("exam", JSON.stringify(response.data.result.exam))
                    sessionStorage.setItem('isAuth', 'true');
                    axios.defaults.headers.common['Authorization']=  'Bearer '+localStorage.getItem("token");
                    const error = ''
                    const loading = false;                    
                    commit('updateLogin', { error: error, loading: loading })
                    router.push("/level");

                } else {

                    const error = 'Логин или пароль введены неверно'
                    const loading = false;
                    commit('updateLogin', { error: error, loading: loading })
                }
            }
            catch (ex) {
                const error = 'Ошибка соединения к серверу'
                const loading = false;
                commit('updateLogin', { error: error, loading: loading })
            }



        },
        async startSubtest(_, data) {
            console.log("start subtest")
            try {
                await axios.post('api/userexam/UserSubtests/StartSubtest/' + data)

            } catch (error) {
                console.log(error)
            }
        },
        setCurrentSubtest({ commit }, data) {
            const exam = JSON.parse(localStorage.getItem("exam"))
            localStorage.removeItem('exam')
            exam.currentState.moduleId = data.moduleId
            exam.currentState.subtestId = data.subtestId
            localStorage.setItem("exam", JSON.stringify(exam))
             commit("updateCurrentSubtest", data)
        },
        async getCurrentState({commit}) {
            
            try {
                const response = await axios.get('api/userexam/UserExamCurrentState')
                if (response.data && response.data.success) {
                    const exam = JSON.parse(localStorage.getItem("exam"))
                    localStorage.removeItem('exam')
                    exam.currentState=response.data.result
                    localStorage.setItem("exam", JSON.stringify(exam))
                                       commit("updateCurrentSubtest", {moduleId:exam.currentState.moduleId,subtestId:exam.currentState.subtestId})
                }
            } catch (error) {
                console.log(error)
            }


        }
    },
    mutations: {
        updateLogin(state, data) {
            state.error = data.error
            state.loading = data.loading
        },
        updateCurrentSubtest(state, data) {
            state.currentModule = data
            
        }
    },

    getters: {
        loadingValue(state) {
            return state.loading
        },
        errorValue(state) {
            return state.error
        },
        currentLevelId() {

            return JSON.parse(localStorage.getItem("exam")).levelId
        },
        currentSubtestId(state) {
            return state.currentModule.subtestId ?? JSON.parse(localStorage.getItem("exam")).currentState.subtestId
        },
        
        currentSubtestMaxTime: () => (id) => {
          if (id!=null){
          
            return JSON.parse(localStorage.getItem("exam")).modules.map(
                function (e) {
                    return e.subtests.filter(i => i.id === id)
                }
            ).filter(item=>item.length)[0][0].maxTime
           }
        },

       
        currentSubtestMaxScore: () => (id) => {
            if (id!=null){
            return JSON.parse(localStorage.getItem("exam")).modules.map(
                function (e) {
                    return e.subtests.filter(i => i.id === id)
                }
            ).filter(item=>item.length)[0][0].subtest.maxScore
            }
        },
        currentSubtestRecord() {
            return JSON.parse(localStorage.getItem("exam")).currentState.record
            //return true
        },
        currentStateData() {
            return JSON.parse(localStorage.getItem("exam")).currentState
        },
        moduleList() {
            return JSON.parse(localStorage.getItem("exam")).modules
        }



    }
}
import { createStore } from "vuex";
import user from './modules/user'
import level from './modules/level'
import questions from './modules/questions'

export default new createStore({  
    
    modules:{
        user,
        level,
        questions
        }

})
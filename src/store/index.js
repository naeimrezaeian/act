import { createStore } from "vuex";
import user from './modules/user'
import level from './modules/level'
import questions from './modules/questions'
import webcamera from './modules/webcamera'
export default new createStore({  
    
    modules:{
        user,
        level,
        questions,
        webcamera
       
        }

})
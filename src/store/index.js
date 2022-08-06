import { createStore } from "vuex";
import user from './modules/user'
import level from './modules/level'
import module from './modules/module'
import questions from './modules/questions'
import webcamera from './modules/webcamera'
import timer from './modules/examComponents/timer.js'
import questionText from './modules/examComponents/questionText.js'
export default new createStore({  
    
    modules:{
        user,
        level,
        module,
        questions,
        webcamera,
        timer,
        questionText
       
        }

})
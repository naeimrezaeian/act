import { createStore } from "vuex"
import loader from './modules/loader'
import user from './modules/user'
import level from './modules/level'
import module from './modules/module'
import questions from './modules/questions'
import webcamera from './modules/webcamera'
import timer from './modules/examComponents/timer.js'
import questionText from './modules/examComponents/questionText.js'
import error from './modules/error.js'
export default new createStore({

    modules: {
        loader,
        user,
        level,
        module,
        questions,
        webcamera,
        timer,
        questionText,
        error
    }

})
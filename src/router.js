import { createWebHistory, createRouter } from "vue-router";

import ACTlogin from './components/Login.vue'
import ACTlevel from './components/Level.vue'
import ACTmodule from './components/Module.vue'
import ACTexam from './components/Exam.vue'
import ACTfinish from './components/FinishExam.vue'
import test from './components/NaeimTest2.vue'

const checkLocalStorage = (to, from, next) => {
  if (localStorage.getItem("exam") === null) {
    next({ name: 'Login' })
  } else {
    next()
  }
}


const checkLogin = (to, from, next) => {

  if (!localStorage.getItem("exam")) {
    localStorage.removeItem('token')
    //next({name:'Login'}) 
  }

  if (to.meta.requiresVisitor || !localStorage.getItem("token")) {
    if (to.fullPath === "/") { next() } else { next({ name: 'Login' }) }
  } else {
    var data = JSON.parse(localStorage.getItem("exam"))
    let currentState = {}
    if (data === null) {



    } else {
      currentState = data.currentState

      if (currentState.start === null) {

        if (currentState.moduleId === null && to.fullPath != "/module") {
          if (to.fullPath === "/level") { next() } else { next({ name: 'Level' }) }
        } else {

          if (to.fullPath === "/module") { next() } else { next({ name: 'Module' }) }
        }

      } else {
        next({ name: 'Exam' })
      }

    }



  }

}



const routes = [
  {
    path: "/",
    name: "Login",
    component: ACTlogin,
    beforeEnter: checkLogin,

  },
  {
    path: "/level",
    name: "Level",
    component: ACTlevel,
    beforeEnter: [checkLocalStorage]

  },
  {
    path: "/module",
    name: "Module",
    component: ACTmodule,
    beforeEnter: [checkLocalStorage]


  },
  {
    path: "/exam",
    name: "Exam",
    component: ACTexam,
    beforeEnter: [checkLocalStorage]
  },
  {
    path: "/finish",
    name: "Finish",
    component: ACTfinish,
  },

  {
    path: "/test",
    name: "test",
    component: test
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
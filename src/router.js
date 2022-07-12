import { createWebHistory, createRouter } from "vue-router";

import  ACTlogin from './components/Login.vue'
import  ACTlevel from './components/Level.vue'
import  ACTmodule from './components/Module.vue'
import  ACTexam from './components/Exam.vue'
import  ACTnaeim from './components/NaeimTest.vue'
import  ACTnaeim2 from './components/NaeimTest2.vue'

const checkLogin = (to, from, next) =>{ 
  

  console.log(to)
  console.log(from )
  if (to.meta.requiresVisitor  && !sessionStorage.getItem('isAuth')){
    next({name:'Login'})
  }else{
    next()
  }

}


const routes = [
  {
    path: "/",
    name: "Login",
    component: ACTlogin,
  },
  {
    path: "/level",
    name: "Level",
    component: ACTlevel,
  },
  {
    path: "/module",
    name: "Module",
    component: ACTmodule,
  },
  {
    path: "/exam",
    name: "Exam",
    component: ACTexam,
  },
  
  {
    path: "/naeim",
    name: "NaeimTest",
    beforeEnter: checkLogin,
    meta: { requiresVisitor: false }  ,
    component: ACTnaeim,
  },
  {
    path: "/naeim2",
    name: "NaeimTest2",
    //beforeEnter: checkLogin,
    
    //meta: { requiresVisitor: false }  ,
    component: ACTnaeim2,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
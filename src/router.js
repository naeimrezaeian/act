import { createWebHistory, createRouter } from "vue-router";

import  ACTlogin from './components/Login.vue'
import  ACTlevel from './components/Level.vue'
import  ACTmodule from './components/Module.vue'
import  ACTexam from './components/Exam.vue'
import  ACTfinish from './components/FinishExam.vue'



const checkLogin=(to,from,next) =>{
  
  if (to.meta.requiresVisitor   || !localStorage.getItem("token")){
    if (to.fullPath==="/"){ next() }else{ next({name:'Login'})  }
  }else{
    var data=JSON.parse(localStorage.getItem("exam"))
 var currentState=data.currentState
  if(currentState.start===null){   
console.log(to.fullPath)
   if (currentState.moduleId===null && to.fullPath!="/module"){
    if (to.fullPath==="/level"){ next() }else{ next({name:'Level'})  }
  }else{
    
    if (to.fullPath==="/module"){ next() }else{ next({name:'Module'})  }
  }

   }else{
    next({name:'Exam'})
   }
}
}


// const checkLogin=(to,from,next) =>{
//   to
//   from
//   next
  
//   if ( localStorage.getItem("token")){
//     var currentState=JSON.parse(localStorage.getItem("exam")).currentState
//   console.log(currentState)
//   if (currentState.start==null ){
//     console.log("to:"+to.fullPath)
//     console.log("from:"+from.fullPath)
//    // next({name:"Level"})
   
//   }

//   }else{
//     next()
//   }


  
  
  
// }


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
    //beforeEnter: checkLogin,
   
  },
  {
    path: "/module",
    name: "Module",
    component: ACTmodule,
    //beforeEnter: checkLogin,
   
  },
  {
    path: "/exam",
    name: "Exam",
    component: ACTexam,
    beforeEnter: checkLogin,
  },
  {
    path: "/finish",
    name: "Finish",
    component: ACTfinish,
  },
  
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
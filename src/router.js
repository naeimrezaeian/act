import { createWebHistory, createRouter } from "vue-router";

import  ACTlogin from './components/Login.vue'
import  ACTlevel from './components/Level.vue'
import  ACTmodule from './components/Module.vue'
import  ACTexam from './components/Exam.vue'
import  ACTnaeim from './components/NaeimTest.vue'
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
    component: ACTnaeim,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
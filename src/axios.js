import axios from 'axios'

axios.defaults.baseURL="http://localhost:9000/";
axios.defaults.baseURL="http://51.250.106.203:7064/";
axios.defaults.headers.common['Authorization']=  'Bearer '+localStorage.getItem("token");


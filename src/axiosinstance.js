import Axios from 'axios'
import router from './router'

const axiosinstance = Axios.create({
    baseURL:'http://51.250.106.203:7064/'
});

axiosinstance.defaults.showLoader = true;


console.log("axois")
axiosinstance.interceptors.request.use(function (config) {
  console.log(config.showLoader)

    config.headers.common['Authorization']=  'Bearer '+localStorage.getItem("token");
    config.headers.common['Access-Control-Allow-Origin'] = '*';
    return config;
  }, function (error) {
   
    return Promise.reject(error);
  });


axiosinstance.interceptors.response.use(function (response) {
   
    return response;
  }, function (error) {
 
   localStorage.removeItem("token")
    localStorage.removeItem("exam")
    router.push("/");
    return Promise.reject(error);
  });

export default axiosinstance;

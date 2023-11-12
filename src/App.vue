<template>
  <Error />
  <ACTheader />
  <preloader :visible="loading" />
  <router-view />
  <ACTfooter />
</template>

<script>
import ACTheader from './components/Header.vue'
import ACTfooter from './components/Footer.vue'
import preloader from './components/Preloader.vue'
import Error from './components/Error.vue'
import httpClient from "./httpClient"

import { mapState } from "vuex";
export default {

  name: 'App',



  computed: {
    ...mapState("loader", ["loading"])
  },
  components: {
    Error,
    ACTheader,
    ACTfooter,
    preloader
  },
  created() {
    httpClient.defaults.showLoader = true;

    httpClient.interceptors.request.use(
      config => {

        config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
        config.headers.common['Access-Control-Allow-Origin'] = '*';
        if (config.showLoader) {
          this.$store.dispatch('loader/pending');
        }
        return config;
      },
      error => {
        if (error.config.showLoader) {
          this.$store.dispatch('loader/done');
        }
        return Promise.reject(error);
      }
    );
    httpClient.interceptors.response.use(
      response => {
        if (response.config.showLoader) {

          this.$store.dispatch('loader/done');


        }

        return response;
      },
      error => {
        let response = error.response;
        if (response.config.showLoader) {
          this.$store.dispatch('loader/done');
        }
        this.$store.dispatch('error/displayErrorMessage', 'An error occurred. Please try again later.');
        return Promise.reject(error);
      }
    )

  }


}
</script>

<style src="@/assets/css/main.css"></style>

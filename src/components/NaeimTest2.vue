<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <h1>Vue JS Axios - Image Upload using PHP API - ItSolutionStuff.com</h1>
      <label>File
        <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()"/>
      </label>
        <button v-on:click="submitForm()">Upload</button>
    </div>
  </div>
</template>
  
<script>
import axios from "axios"
  export default {
    data(){
      return {
        file: ''
      }
    },
  
    methods: {
      submitForm(){
       
            let formData = new FormData();
            formData.append('file', this.file);
  
            axios.post('http://localhost:4000/upload',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(data){
              console.log(data.data);
            })
            .catch(function(){
              console.log('FAILURE!!');
            });
      },
  
      onChangeFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>
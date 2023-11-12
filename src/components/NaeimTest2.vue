<template>
<div>
  <p>Test Page</p>
 
  <div class="audio-vopros">
                <button type="button"  class="btn"  @click="getAudio()"><p>ПРОСЛУШАТЬ ВОПРОС</p>
                </button>
  </div>
<br/><br/>


<br/><br/>
</div>
</template>
  
<script>
import httpClient from '@/httpClient';
export default {
  name:"Test",
  data (){
    return {
      fileId:"3ff008c9-88ff-4df0-be69-56d8803cf160",
      accessCode:null,
      audioContent:null,
      audio: new Audio(),
     

    }
  },
  methods: { 

   
    async getAudio(){
      console.log("Play file")
      var reader = new FileReader();
const responseFile = await httpClient.get('/api/files/DownloadFile/' + this.fileId+"/"+this.accessCode,{ responseType: 'blob' })
console.log(responseFile)
reader.readAsBinaryString(responseFile.data);

reader.onload = function(){
  
      var arrayBuffer = reader.result;
      var base64str = btoa( arrayBuffer);
      this.audio.src="data:audio/wav;base64,"+base64str
      this.audio.play()
}.bind(this)
     
      
        
    }
   
  },
  async created() {
console.log("create")

const responseAccess = await httpClient.get('/api/files/DownloadFile/GetFileAccessCode/' + this.fileId,{showLoader:false})
if (responseAccess!=null){
  this.accessCode=responseAccess.data.result.accessCode
  console.log(this.accessCode)
}else{
  console.log("get error")
}




  }
}

</script>

<style scoped>


</style>
<template>
<div>
  <p>Test Page</p>

  <div class="audio-vopros">
                <button type="button"  class="btn"  @click="getAudio()"><p>ПРОСЛУШАТЬ ВОПРОС</p>
                </button>
  </div>
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
      accessCode:null

    }
  },
  components: {
  

  },
  methods: { 

    async getAudio(){
      console.log("Play file")

      var audio = new Audio("uploads/m1.mp3")
        audio.play()
    //  const responseFile = await httpClient.get('/api/files/DownloadFile/' + this.fileId+"/"+this.accessCode)
      //var blob = new Blob(responseFile.data)
      //var mp3 = new Blob([responseFile.data], { type: 'application/octet-stream' })
      //var url = (window.URL || window.webkitURL).createObjectURL( mp3 );
     
   //   var reader = new FileReader();
    //  reader.readAsDataURL(mp3);

      //reader.onload = function() {
       

//};
               
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
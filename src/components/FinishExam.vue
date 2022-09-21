<template>
<section class="pages contact">
    <div class="box">
         <div class="left">  
                <ACTmoduleList></ACTmoduleList>             
          
            </div>
  <div class="right">
            <div class="title">Экзамен завершен</div>
            <div class="text">
                <p><b>Фамилия Имя Отчество,</b></p>
                <p>Узнать результаты экзамена вы можете <br>в период с 01.09.2021 по 12.10.2021 <br>по адресу ул. Пушкина, 12с1</p>
            </div>
            <div class="number">
                <p><b>Контактный телефон:</b><br> +7 (000) 000-00-00</p>
            </div>
            <a href="#" class="btn" @click="finish"> ВЫХОД</a>
        </div>
        </div>
        </section>
</template>

<script>
import ACTmoduleList from './ModuleList.vue'
export default {
    name: "ACTfinish",
     components: {
        ACTmoduleList
            
        },methods: {
            finish(){
                console.log("Finish exam")
                localStorage.removeItem("token")
                localStorage.removeItem("exam")
                this.$router.push({name:'Login'});

            }
        },
        mounted(){
            
            this.$soketio.start();
        }
}
</script>

<style lang="scss" scoped>

</style>
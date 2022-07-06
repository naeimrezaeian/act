<template>
<div class="title">{{CurrentTitle}}</div>
<div class="text-mini" v-html="CurrentQuestion"></div>
<a href="#" class="pismo">Ответьте на вопрос письменно.</a>
</template>

<script>
    export default {
        name:"questionLetter",
        props:{
             CurrentTitle:{
                type:String,
                require:true
            },
            CurrentQuestion:{
                 type:String,
                 require:true
            },

        }
        
        }
</script>

<style lang="scss" scoped>

</style>
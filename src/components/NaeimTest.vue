<template>
    <div>
        <h1>Test Page</h1>

<p>isAuth: {{this.isAuth}}</p>
    </div>
</template>

<script>
    export default {
        data(){
            return {
              
                isAuth:'www'
            }
        },
        mounted(){
           
            this.isAuth=sessionStorage.getItem('isAuth');
        }
        

        
    }
</script>

<style lang="scss" scoped>

</style>
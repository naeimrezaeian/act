<template>
    <div>
<P>Test 2</P>
    </div>
</template>

<script>
    export default {
        name:"actNaeim2",

        data(){
            
            return {
                token:444444
            }
        },
        methods:{
            login(){
                localStorage.setItem("atoken",this.token)
                sessionStorage.setItem('isAuth', 'true');
            }
            
        },
        mounted(){
            this.login()
        }
    }
</script>

<style lang="scss" scoped>

</style>
<template>
<ACTheader />
<router-view/>
<ACTfooter />
</template>

<script>
import  ACTheader from './components/Header.vue'
import  ACTfooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
   ACTheader,
   ACTfooter
  }
}
</script>

<style src="@/assets/css/main.css"></style>

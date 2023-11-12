<template>
    <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('error', ['message']),
        errorMessage() {
            return this.message;
        },
    },
};
</script>
  
<style scoped>
.error-message {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: red;
    color: white;
    text-align: center;
    font-size: 1.2rem;
    padding: 1rem;
}

.error-message p {
    margin: 0;
}
</style>
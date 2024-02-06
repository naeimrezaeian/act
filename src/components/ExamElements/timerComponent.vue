<template>
  <div class="zag">Осталось времени</div>
  <div class="time">{{ time }}</div>
</template>

<script>
export default {
  name: "timerComponent",
  data() {
    return {
      time: "00:00:00",
    };
  },
  
  mounted() {
    this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case "updateTimeleft":
          this.time = this.$store.state.timer.timeLeft;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
<template lang="pug">
.test
  p.test__text {{ text }}
</template>

<script>
export default {
  data () {
    return {
      text: 'test vue.js'
    };
  }
};
</script>

<style scoped lang="scss">
.test {
  width: 100%;

  &__text {
    color: #000;
  }
}
</style>

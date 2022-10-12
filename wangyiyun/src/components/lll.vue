<template>
  <div v-once v-if="isShow">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 123,
    };
  },

  computed: {
    isShow() {
      return true;
    },
  },
};
</script>

<style>
</style>
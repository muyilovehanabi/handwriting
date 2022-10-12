<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.state.currentpath = this.$route.path;
  },
};
</script>

<style>
</style>
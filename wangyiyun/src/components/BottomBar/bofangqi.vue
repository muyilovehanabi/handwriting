<template>
  <div class="yinpin">
    <audio :src="songs" autoplay="autoplay" controls="controls"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      song: [],
      songs: "",
    };
  },
  activated() {},
};
</script>

<style scoped>
.yinpin {
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>
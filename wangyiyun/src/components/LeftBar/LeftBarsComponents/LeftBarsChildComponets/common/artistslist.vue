<template>
  <div class="musiclist" ref="height">
    <artists :art="item" v-for="(item, index) in artist" :key="index"></artists>
  </div>
</template>

<script>
import artists from "./artists.vue";
export default {
  props: {
    artist: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    artists,
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.height.offsetHeight);
    });
  },
};
</script>

<style scoped>
.musiclist {
  width: 100%;
  height: auto;
  margin-left: -10px;
}
</style>
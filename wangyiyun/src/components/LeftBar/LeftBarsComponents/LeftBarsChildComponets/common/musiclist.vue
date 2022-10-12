<template>
  <div class="musiclist">
    <musics :music="item" v-for="(item, index) in music" :key="index"></musics>
  </div>
</template>

<script>
import musics from "./musics.vue";
export default {
  props: {
    music: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    musics,
  },
};
</script>

<style scoped>
.musiclist {
  width: 100%;
  height: auto;
  margin-top: -30px;
}
</style>
<template>
  <div>
    <div class="titles">
      <div
        class="title"
        :class="{
          active: currentIndex == index,
        }"
        v-for="(item, index) in titles"
        :key="index"
        @click="activechange(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="newshow">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: ["个性推荐", "专属订制", "歌单", "排行榜", "歌手", "最新音乐"],
      currentpath: [
        "/find/gexingtuijian",
        "/find/zhuanshudingzhi",
        "/find/gedan",
        "/find/paihangbang",
        "/find/geshou",
        "/find/zuixinyinyue",
      ],
    };
  },
  methods: {
    activechange(index) {
      if (index == 0) {
        this.$router.push("/find/gexingtuijian");
      } else if (index == 1) {
        this.$router.push("/find/zhuanshudingzhi");
      } else if (index == 2) {
        this.$router.push("/find/gedan");
      } else if (index == 3) {
        this.$router.push("/find/paihangbang");
      } else if (index == 4) {
        this.$router.push("/find/geshou");
      } else if (index == 5) {
        this.$router.push("/find/zuixinyinyue");
      }
    },
  },
  computed: {
    currentIndex() {
      return this.$route.path == "/find"
        ? this.currentpath.indexOf("/find/gexingtuijian")
        : this.currentpath.indexOf(this.$route.path);
    },
  },
  created() {
    if (this.$route.path == "/find") {
      this.activechange(0);
    }
  },
};
</script>

<style scoped>
.titles {
  width: 100%;
  height: 80px;
  display: flex;
  position: fixed;
  top: 73px;
  z-index: 3;
  background-color: #2b2b2b;
}

.title {
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 10px;
  height: 48px;
  font-size: 16px;
  color: #d2d2d2;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  font-family: YouYuan;
}

.titles .title:nth-child(1) {
  padding-left: 20px;
}

.active {
  color: white;
  font-size: 25px;
  border-bottom: 2px solid #ec4141;
}

.newshow {
  width: 100%;
  height: calc(100vh - 73px - 90px - 80px);
}
</style>
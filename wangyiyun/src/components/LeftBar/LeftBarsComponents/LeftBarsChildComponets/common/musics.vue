<template>
  <div class="gezi" @click="xiangqing">
    <div class="logo">
      <img src="../../../../../assets/Image/logo.jpg" />
    </div>
    <img :src="music.coverImgUrl" />
    <div class="liulan">
      <span class="xiaobofang">&#xea6d;</span>
      <span class="liulanliang">{{ playCount }}</span>
    </div>
    <div class="bofang">
      <span class="bofangjian">&#xea82;</span>
    </div>
    <div class="bottomIntroduction">
      <span class="leftIntroduction">&#xe654;</span>
      <span class="rightIntroduction">{{ music.creator.description }}</span>
    </div>
    <div class="bottomName">{{ music.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    music: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    playCount() {
      return parseInt(this.music.playCount) > 10000
        ? parseInt(this.music.playCount) > 100000000
          ? Math.ceil(parseInt(this.music.playCount) / 100000000) + "亿"
          : Math.ceil(parseInt(this.music.playCount) / 10000) + "万"
        : parseInt(this.music.playCount);
    },
  },

  methods: {
    xiangqing() {
      this.$router.push("/Detail/" + this.music.id);
    },
  },
};
</script>

<style scoped>
.gezi {
  position: relative;
  width: 200px;
  height: 200px;

  background-color: transparent;
  cursor: pointer;
  margin-left: 20px;
  float: left;
  font-family: YouYuan;
  margin-top: 50px;
}

.gezi img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.gezi .bottomName {
  position: absolute;
  width: 200px;
  height: 35px;
  top: 205px;
  background-color: transparent;
  font-size: 12px;

  color: white;
  text-align: left;
  font-family: YouYuan;
}

.gezi:nth-child(1),
.gezi:nth-child(6),
.gezi:nth-child(11),
.gezi:nth-child(16),
.gezi:nth-child(21),
.gezi:nth-child(26),
.gezi:nth-child(31),
.gezi:nth-child(36),
.gezi:nth-child(41),
.gezi:nth-child(46) {
  margin-left: 0px;
}

.logo {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
}

.logo img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.bofang {
  position: absolute;

  width: 40px;
  height: 40px;
  right: 10px;
  bottom: 10px;
  display: none;
  background-color: white;
  border-radius: 50%;
}

.bofang .bofangjian {
  position: absolute;
  right: 9.5px;
  line-height: 40px;
  font-size: 18px;
  color: #ec4141;
}

.gezi:hover .bofang {
  display: block;
}

.bottomIntroduction {
  width: auto;
  height: 20px;
  position: absolute;
  left: 5px;
  bottom: 0px;
  background-color: transparent;
}

.bottomIntroduction .leftIntroduction {
  float: left;
  font-size: 12px;
  color: white;
}

.bottomIntroduction .rightIntroduction {
  float: right;
  font-size: 12px;
  color: white;
}

.liulan {
  width: auto;
  height: 20px;
  position: absolute;
  right: 8px;
  top: 10px;
  background-color: transparent;
}

.liulan .xiaobofang {
  float: left;
  font-size: 12px;
  color: wheat;
}

.liulan .liulanliang {
  float: right;
  font-size: 12px;
  color: wheat;
}
</style>
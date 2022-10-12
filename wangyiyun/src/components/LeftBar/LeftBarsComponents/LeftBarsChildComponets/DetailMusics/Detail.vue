<template>
  <div class="Detail">
    <div class="TopContent">
      <div class="leftImage">
        <img :src="TopContentlist.coverImgUrl" alt="" />
      </div>
      <div class="rightContent">
        <h2>{{ TopContentlist.name }}</h2>
        <div class="create">
          <div class="creator">
            <img :src="TopContentlist.creator.avatarUrl" alt="" />
            <div class="creatorname">{{ TopContentlist.creator.nickname }}</div>
          </div>
          <div class="createtime">{{ Time }}</div>
        </div>
        <div class="bofang">
          <div class="bofangcontent">&#xea82; 播放全部</div>
        </div>
        <div class="tags">
          <div class="tag">标签:</div>
          <div
            class="Detailtag"
            v-for="(item, index) in TopContentlist.tags"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="message">
          <div class="songscount">歌曲:</div>
          <div class="length">{{ TopContentlist.trackCount }}</div>
          <div class="playcount">播放:</div>
          <div class="playcounts">{{ playCount }}</div>
        </div>
        <div class="introduction">
          <div class="intro">简介:</div>
          <div class="intromessage">{{ TopContentlist.description }}</div>
        </div>
      </div>
    </div>
    <div class="CenterContent">
      <div
        :class="{ active: currentpath == index }"
        @click="qiehuan(index)"
        class="qiehuan"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <div v-show="isShow" class="songs">
      <Songs :songs="BottomContentlist"></Songs>
    </div>
    <div class="BottomContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { requestDetail } from "../../../../../network/requestDetail";
import { requestDetailSongs } from "../../../../../network/requestDetailSongs";
import dayjs from "dayjs";
import Songs from "./DetailChildren/Songs.vue";

export default {
  data() {
    return {
      id: null,
      TopContentlist: [],
      BottomContentlist: [],
      list: ["歌曲列表", "评论", "收藏者"],
      currentIndex: null,
      currentPath: ["/Detail/DetailPinLun", "/Detail/DetailShouCang"],
      isshow: true,
    };
  },
  components: {
    Songs,
  },
  methods: {
    qiehuan(index) {
      if (index == 0) {
        this.$router.push(`/Detail/${this.id}`);
      } else if (index == 1) {
        this.$router.push("/Detail/DetailPinLun");
      } else {
        this.$router.push("/Detail/DetailShouCang");
      }
    },
  },
  // created() {
  //   this.qiehuan(0);
  // },

  activated() {
    this.id = this.$route.params.id;

    requestDetail(this.id).then((res) => {
      this.TopContentlist = res.data.playlist;
    });

    requestDetailSongs(this.id).then((res) => {
      this.BottomContentlist = res.data.songs;
    });
  },
  computed: {
    Time() {
      return (
        dayjs(this.TopContentlist.createTime).format("YYYY-MM-DD") + "创建"
      );
    },
    playCount() {
      return parseInt(this.TopContentlist.playCount) > 10000
        ? parseInt(this.TopContentlist.playCount) > 100000000
          ? Math.ceil(parseInt(this.TopContentlist.playCount) / 100000000) +
            "亿"
          : Math.ceil(parseInt(this.TopContentlist.playCount) / 10000) + "万"
        : parseInt(this.TopContentlist.playCount);
    },
    currentpath() {
      return this.currentPath.indexOf(this.$route.path) + 1;
    },
    isShow() {
      return this.$route.path == `/Detail/${this.id}`
        ? this.isshow
        : !this.isshow;
    },
  },
};
</script>

<style scoped>
.Detail {
  width: 100%;
  height: auto;
  font-family: YouYuan;
}

.BottomContent {
  width: 100%;
  height: auto;
}

.TopContent {
  width: 95%;
  height: 200px;
  margin: 25px auto;
  display: flex;
  background-color: transparent;
}

.CenterContent {
  width: 95%;
  height: 30px;
  margin: 35px auto 0px;
  display: flex;
  background-color: transparent;
  font-family: YouYuan;
}

.qiehuan {
  color: #c8d2c8;
  font-size: 14px;
  padding: 0px 20px;
  cursor: pointer;
}

.active {
  font-size: 20px;
  color: white;
  border-bottom: 2px solid #ec4141;
}

.leftImage {
  width: 200px;
  height: 200px;
  background-color: transparent;
}

.leftImage img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.rightContent {
  width: calc(100% - 215px);
  height: 100%;

  margin-left: 15px;
}

.rightContent h2 {
  width: auto;
  font-weight: 200;
  color: white;
  text-align: left;
}

.create {
  height: 25px;
  margin-top: 8px;
  display: flex;
}

.create .creator {
  width: auto;
  height: 100%;
  display: flex;
  cursor: pointer;
}

.creator img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.creator .creatorname {
  line-height: 25px;
  text-align: center;
  padding: 0px 3px;
  font-size: 12px;
  color: #6099da;
}

.creator .creatorname:hover {
  color: #4da0d9;
}

.create .createtime {
  padding: 0px 5px;
  height: 100%;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  color: #818781;
}

.bofang {
  height: 40px;
  width: 100%;
  margin: 15px 0px;
  display: flex;
}

.bofangcontent {
  height: 40px;
  width: 120px;
  border-radius: 40px;
  text-align: center;
  line-height: 40px;
  background-color: #ec4141;
  font-size: 14px;
  color: white;
  cursor: pointer;
}

.tags {
  width: 100%;
  height: 20px;
  display: flex;
}

.tags .tag {
  width: auto;
  height: 20px;
  font-size: 14px;
  color: white;
  text-align: left;
  line-height: 20px;
}

.Detailtag {
  width: auto;
  height: 20px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  padding: 0px 2px;
  color: #4da0d9;
  cursor: pointer;
}

.message {
  width: 100%;
  height: 20px;
  margin: 5px 0px;
  display: flex;
}

.songscount {
  width: auto;
  height: 20px;
  font-size: 14px;
  color: white;
  text-align: left;
  line-height: 20px;
}

.length {
  color: #818781;
  font-size: 14px;
  width: auto;
  height: 20px;
  line-height: 22px;
  text-align: left;
  padding: 0px 3px;
}

.playcount {
  width: auto;
  height: 20px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  padding: 0px 5px;
  color: white;
}

.playcounts {
  color: #818781;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}
.introduction {
  display: flex;
  height: 20px;
  width: 100%;
  line-height: 20px;
}

.intro {
  width: auto;
  height: 20px;
  font-size: 14px;
  color: white;
  text-align: left;
}

.intromessage {
  width: 140px;
  font-size: 14px;
  line-height: 22px;
  padding: 0px 3px;
  color: #818781;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.songs {
  width: 100%;
  height: auto;
}
</style>
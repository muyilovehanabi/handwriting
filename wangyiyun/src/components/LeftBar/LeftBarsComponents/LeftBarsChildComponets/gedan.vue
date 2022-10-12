<template>
  <div class="gedan">
    <div
      class="highqualitycontent"
      :style="{
        backgroundImage:
          'url(' + highqualitymusic[currentImage].coverImgUrl + ')',
      }"
    >
      <div class="upcontent">
        <div class="content">
          <img :src="highqualitymusic[currentImage].coverImgUrl" alt="" />
          <div class="rightcontent">
            <div class="musiccontent">精品歌单</div>
            <div class="introduction">
              {{ highqualitymusic[currentImage].name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="category">
      <div class="tags">
        <div class="lefttags">{{ currentstatus }} ></div>
        <div class="righttags">
          <div
            :class="{ actives: currentIndex == index }"
            @click="change(index)"
            class="tag"
            v-for="(item, index) in tags"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="center"><musiclist :music="musiclist"></musiclist></div>
    <!-- <div ref="newShow" class="newshows"></div> -->
  </div>
</template>

<script>
import { requesttags } from "../../../../network/requesttags";
import { requestmusiclist } from "../../../../network/requestmusiclist";
import { requesthighquality } from "../../../../network/requesthighquality";
import musiclist from "./common/musiclist.vue";

export default {
  components: {
    musiclist,
  },
  data() {
    return {
      currentIndex: null,
      musiclist: [],
      tags: [],
      highqualitymusic: [],
    };
  },

  methods: {
    // qifei() {},
    // donghua(object, target, callback) {
    //   clearInterval(object.time);
    //   object.time = setInterval(function () {
    //     var step = (target - object.offsetTop) / 5; //如果这个地方不向上取整 那么它最终走不到目标位置导致计时器一直运行
    //     step = step > 0 ? Math.ceil(step) : Math.floor(step);
    //     object.style.top = object.offsetTop + step + "px";
    //     if (object.offsetTop == target) {
    //       clearInterval(object.time);
    //       if (callback) {
    //         callback();
    //       }
    //     }
    //   }, 30);
    // },
    change(index) {
      this.currentIndex = index;
      this.$store.state.index = index;
      requestmusiclist(this.tags[index].name, 50, "hot").then((res) => {
        this.musiclist = res.data.playlists;
      });
    },
  },
  computed: {
    // currentIndex() {
    //   return this.currentpath.indexOf(this.$route.path);
    // },
    currentstatus() {
      return this.currentIndex == null
        ? "全部歌单"
        : this.tags[this.currentIndex].name;
    },

    currentImage() {
      return this.currentIndex == null ? 0 : this.currentIndex;
    },
  },
  created() {
    requesttags().then((res) => {
      this.tags = res.data.tags;
    }), //拿到标签
      requesthighquality(10).then((res) => {
        this.highqualitymusic = res.data.playlists;
      }); //拿到精品歌单
    requestmusiclist("全部", 50, "hot").then((res) => {
      this.musiclist = res.data.playlists;
      console.log(this.musiclist);
    });
  },
  mounted() {
    // this.$bus.$on("qifei", () => {
    //   this.donghua(this.$refs.newShow, -60);
    //   console.log(this.$refs.newShow.offsetTop);
    // });
  },
};
</script>

<style scoped>
/* .newshows {
  position: absolute;
  left: 0px;
  top: 625px;
  width: 100vw;
  height: calc(100vh - 87px);
  background-color: yellow;
  z-index: 5;
} */
.gedan {
  width: 84%;
  height: auto;
  margin: 82px auto;
}

.highqualitycontent {
  height: 210px;
  width: 100%;
  border-radius: 8px;
  background-position: 0 -250px;
  cursor: pointer;
}

.upcontent {
  position: relative;
  height: 210px;
  width: 100%;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
}

.content {
  position: absolute;
  top: 15px;
  width: 100%;
  height: 175px;
  display: flex;
}

.content img {
  height: 175px;
  width: 175px;
  margin-left: 20px;
  float: left;
  border-radius: 8px;
}

.rightcontent {
  float: left;
  margin-left: 8px;
  width: calc(100% - 175px - 20px - 5px);
  height: 175px;
}
.rightcontent .musiccontent {
  width: 125px;
  height: 35px;
  border-radius: 35px;
  background-color: transparent;
  border: 1px solid gold;
  margin-top: 30px;
  text-align: center;
  line-height: 35px;
  color: gold;
  font-family: YouYuan;
}

.rightcontent .introduction {
  height: 20px;
  margin-top: 20px;
  text-align: left;
  font-family: YouYuan;
  color: white;
}

.category {
  position: relative;
  height: 57px;
  width: 100%;
}

.tags {
  position: absolute;
  top: 17px;
  height: 40px;
  width: 100%;
}

.tags .lefttags {
  width: 125px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #4a4a4a;
  background-color: transparent;
  color: white;
  float: left;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-family: YouYuan;
  cursor: pointer;
}

.tags .lefttags:hover {
  background-color: #353535;
}

.righttags {
  display: flex;
  height: 40px;
  line-height: 40px;
  float: right;
  color: #87877a;
}

.righttags .tag {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;

  cursor: pointer;
  font-family: YouYuan;
}

.righttags .tag:hover {
  color: #ec4141;
}

.actives {
  color: #ec4141;
}

.center {
  width: 100%;
  height: auto;
}
</style>
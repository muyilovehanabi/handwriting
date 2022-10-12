<template>
  <div class="geshou">
    <div class="topContent">
      <div class="yuzhong">
        <div class="leftyuzhong">语种:</div>
        <div class="rightyuzhong">
          <div class="xunhuan" v-for="(item, index) in yuzhong" :key="index">
            <div
              @click="selectOne(index)"
              :class="{ active: currentIndexOne == index }"
            >
              {{ yuzhong[index].name }}
            </div>
            <span>|</span>
          </div>
        </div>
      </div>
      <div class="fenlei">
        <div class="leftfenlei">分类:</div>
        <div class="rightfenlei">
          <div class="xunhuans" v-for="(item, index) in fenlei" :key="index">
            <div
              @click="selectTwo(index)"
              :class="{ active: currentIndexTwo == index }"
            >
              {{ fenlei[index].name }}
            </div>
            <span>|</span>
          </div>
        </div>
      </div>
      <div class="shaixuan">
        <div class="leftshaixuan">筛选:</div>
        <div class="rightshaixuan">
          <div class="xunhuanss" v-for="(item, index) in shaixuan" :key="index">
            <div
              @click="selectThree(index)"
              :class="{ active: currentIndexThree == index }"
            >
              {{ shaixuan[index].name }}
            </div>
            <span>|</span>
          </div>
        </div>
      </div>
    </div>
    <artistslist :artist="artists"></artistslist>
  </div>
</template>

<script>
import { requestGeShou } from "../../../../network/requestGeShou";
import artistslist from "./common/artistslist.vue";
export default {
  data() {
    return {
      currentIndexOne: 0,
      currentIndexTwo: 0,
      currentIndexThree: 0,
      artists: [],
      yuzhong: [
        {
          name: "全部",
          id: -1,
        },
        {
          name: "华语",
          id: 7,
        },
        {
          name: "欧美",
          id: 96,
        },
        {
          name: "日本",
          id: 8,
        },
        {
          name: "韩国",
          id: 16,
        },
        {
          name: "其他",
          id: 0,
        },
      ],
      fenlei: [
        {
          name: "全部",
          id: -1,
        },
        {
          name: "男歌手",
          id: 1,
        },
        {
          name: "女歌手",
          id: 2,
        },
        {
          name: "乐队组合",
          id: 3,
        },
      ],
      shaixuan: [
        {
          name: "热门",
          id: -1,
        },
        {
          name: "A",
          id: "a",
        },
        {
          name: "B",
          id: "b",
        },
        {
          name: "C",
          id: "c",
        },
        {
          name: "D",
          id: "d",
        },
        {
          name: "E",
          id: "e",
        },
        {
          name: "F",
          id: "f",
        },
        {
          name: "G",
          id: "g",
        },
        {
          name: "H",
          id: "h",
        },
        {
          name: "I",
          id: "i",
        },
        {
          name: "J",
          id: "j",
        },
        {
          name: "K",
          id: "k",
        },
        {
          name: "L",
          id: "l",
        },
        {
          name: "M",
          id: "m",
        },
        {
          name: "N",
          id: "n",
        },
        {
          name: "O",
          id: "o",
        },
        {
          name: "P",
          id: "p",
        },
        {
          name: "Q",
          id: "q",
        },
        {
          name: "R",
          id: "r",
        },
        {
          name: "S",
          id: "s",
        },
        {
          name: "T",
          id: "t",
        },
        {
          name: "U",
          id: "u",
        },
        {
          name: "V",
          id: "v",
        },
        {
          name: "W",
          id: "w",
        },
        {
          name: "X",
          id: "x",
        },
        {
          name: "Y",
          id: "y",
        },
        {
          name: "Z",
          id: "z",
        },
        {
          name: "#",
          id: 0,
        },
      ],
    };
  },
  components: {
    artistslist,
  },
  created() {
    requestGeShou(-1, -1, -1, 1).then((res) => {
      this.artists = res.data.artists;
      this.$store.state.IndexOne = -1;
      this.$store.state.IndexTwo = -1;
      this.$store.state.IndexThree = -1;
    });
  },
  methods: {
    selectOne(index) {
      this.currentIndexOne = index;
      this.$store.state.IndexOne = this.yuzhong[this.currentIndexOne].id;
      requestGeShou(
        this.yuzhong[this.currentIndexOne].id,
        this.fenlei[this.currentIndexTwo].id,
        this.shaixuan[this.currentIndexThree].id,
        1
      ).then((res) => {
        this.artists = res.data.artists;
      });
    },
    selectTwo(index) {
      this.currentIndexTwo = index;
      this.$store.state.IndexTwo = this.fenlei[this.currentIndexTwo].id;

      requestGeShou(
        this.yuzhong[this.currentIndexOne].id,
        this.fenlei[this.currentIndexTwo].id,
        this.shaixuan[this.currentIndexThree].id,
        1
      ).then((res) => {
        this.artists = res.data.artists;
      });
    },
    selectThree(index) {
      this.currentIndexThree = index;
      this.$store.state.IndexThree = this.shaixuan[this.currentIndexThree].id;
      requestGeShou(
        this.yuzhong[this.currentIndexOne].id,
        this.fenlei[this.currentIndexTwo].id,
        this.shaixuan[this.currentIndexThree].id,
        1
      ).then((res) => {
        this.artists = res.data.artists;
      });
    },
  },
  mounted() {
    this.$bus.$on("changechange", (data) => {
      this.artists.push(...data);
    });
  },
  beforeDestroy() {
    this.$bus.$off("changechange");
  },
};
</script>

<style scoped>
.geshou {
  width: 84%;
  height: auto;
  margin: 80px auto;
  background-color: transparent;
}

.topContent {
  width: 82%;
  height: auto;
}

.yuzhong,
.fenlei {
  width: 100%;
  height: 35px;
  display: flex;
  line-height: 35px;
  font-size: 12px;
}

.shaixuan {
  width: 100%;
  height: 35px;
  display: flex;
  line-height: 35px;
  font-size: 12px;
}

.leftyuzhong {
  color: #d0d0d0;

  cursor: pointer;
}

.rightyuzhong {
  display: flex;
}

.rightyuzhong .xunhuan {
  width: auto;
  display: flex;
  color: #7a8181;
}

.rightyuzhong .xunhuan > div {
  width: 70px;
  font-size: 12px;

  text-align: center;
  cursor: pointer;
}

.leftfenlei {
  color: #d0d0d0;
}

.rightyuzhong .xunhuan > span {
  color: #353535;
  font-size: 12px;
}

.rightfenlei {
  display: flex;
}

.rightfenlei .xunhuans {
  width: auto;
  color: #7a8181;
}

.rightfenlei .xunhuans > div {
  float: left;
  width: 70px;
  font-size: 12px;

  text-align: center;
  cursor: pointer;
}

.rightfenlei .xunhuans > span {
  color: #353535;
  font-size: 12px;
}

.leftshaixuan {
  width: 70px;
  text-align: left;
  color: #d0d0d0;
  cursor: pointer;
}

.rightshaixuan .xunhuanss {
  float: left;
  display: flex;
  width: auto;
  color: #7a8181;
}

.rightshaixuan .xunhuanss > div {
  width: 48px;
  font-size: 12px;

  text-align: center;
  cursor: pointer;
}

.rightshaixuan .xunhuanss > span {
  color: #353535;
  font-size: 12px;
}

.active {
  color: #ec4141;
}
</style>
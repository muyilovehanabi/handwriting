<template>
  <div class="showcontent">
    <div class="LeftBar">
      <router-link class="find" active-class="xuanzhong" to="/find"
        >发现音乐</router-link
      >
      <router-link class="boke" active-class="xuanzhong" to="/boke"
        >播客</router-link
      >
      <router-link class="shipin" active-class="xuanzhong" to="/shipin"
        >视频</router-link
      >
      <router-link class="guanzhu" active-class="xuanzhong" to="/guanzhu"
        >关注</router-link
      >
      <router-link class="zhibo" active-class="xuanzhong" to="/zhibo"
        >直播</router-link
      >
      <router-link class="FM" active-class="xuanzhong" to="/FM"
        >私人FM</router-link
      >
    </div>
    <div class="rightshow" ref="gundong">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { requestGeShou } from "../../network/requestGeShou";

export default {
  data() {
    return {
      height: 1092,
      page: 2,
      IndexOne: -1,
      IndexTwo: -1,
      IndexThree: -1,
    };
  },
  mounted() {
    //给首页的scroll绑定防抖
    this.$refs.gundong.addEventListener(
      "scroll",
      this.debounce(this.scrollToTop, 200)
    );

    // this.$bus.$on("submitHeight", (Height) => {
    //   this.height = Height;
    // });
  },
  // beforeDestroy() {
  //   this.$refs.gundong.removeEventListener("scroll", this.debounce);
  // },

  methods: {
    debounce(fn, delay) {
      let timeout = null;
      let count = 0;
      return function () {
        if (timeout != null) clearTimeout(timeout);
        if (count == 0) {
          fn.apply(this);
          count++;
        } else {
          timeout = setTimeout(fn, delay);
          count++;
        }
      };
    },

    //发起新的数据请求
    scrollToTop() {
      if (this.$refs.gundong.scrollTop >= this.height) {
        requestGeShou(
          this.$store.state.IndexOne,
          this.$store.state.IndexTwo,
          this.$store.state.IndexThree,
          this.page
        ).then((res) => {
          // this.$store.state.newArtist = res.data.artists;
          this.$bus.$emit("changechange", res.data.artists);
        });

        this.IndexOne = this.$store.state.IndexOne;
        this.IndexTwo = this.$store.state.IndexTwo;
        this.IndexThree = this.$store.state.IndexThree;
        this.page++;
        this.height = this.height + 1092;
        console.log(this.page);
      } else {
        if (
          this.IndexOne != this.$store.state.IndexOne ||
          this.IndexTwo != this.$store.state.IndexTwo ||
          this.IndexThree != this.$store.state.IndexThree
        ) {
          this.page = 2;
          this.height = 1092;
          this.IndexOne = this.$store.state.IndexOne;
          this.IndexTwo = this.$store.state.IndexTwo;
          this.IndexThree = this.$store.state.IndexThree;
          console.log(this.page);
        }
      }
    },
  },
};
</script>

<style scoped>
.showcontent {
  position: fixed;
  bottom: 90px;
  width: 100%;
  height: calc(100vh - 73px - 90px);
}

.rightshow {
  width: calc(100% - 248px);
  height: 100%;
  float: right;
  background-color: #2b2b2b;
  overflow: scroll;
}

.rightshow::-webkit-scrollbar {
  display: none;
}

.showcontent .LeftBar {
  position: fixed;
  width: 248px;
  border-right: 2px solid #454545;
  height: 100%;
  background-color: #2b2b2b;
  left: 0px;
  overflow: scroll;
  z-index: 995;
}

.LeftBar::-webkit-scrollbar {
  display: none;
}

.find {
  display: block;
  width: 215px;
  padding-left: 10px;
  height: 45px;
  margin-top: 15px;
  float: right;
  text-align: left;
  line-height: 45px;
  color: #d2d2d2;
  border-radius: 5px;
  text-decoration: none;
  font-family: YouYuan;
}

.find:hover {
  background-color: #333333;
  cursor: pointer;
}

.boke:hover {
  background-color: #333333;
  cursor: pointer;
}

.shipin:hover {
  background-color: #333333;
  cursor: pointer;
}

.guanzhu:hover {
  background-color: #333333;
  cursor: pointer;
}

.zhibo:hover {
  background-color: #333333;
  cursor: pointer;
}

.FM:hover {
  background-color: #333333;
  cursor: pointer;
}

.xuanzhong {
  font-size: 18px;
  background-color: #333333;
  cursor: pointer;
}

.boke,
.shipin,
.guanzhu,
.zhibo,
.FM {
  display: block;
  width: 215px;
  padding-left: 10px;
  height: 45px;
  font-family: YouYuan;
  float: right;
  text-align: left;
  line-height: 45px;
  color: #d2d2d2;
  border-radius: 5px;
  text-decoration: none;
}
</style>
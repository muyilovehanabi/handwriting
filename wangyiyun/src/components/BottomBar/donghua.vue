<template>
  <div ref="newShow" class="newshows">
    <div class="changbi" :class="{ active: isPlay == true }">
      <img src="../../assets/Image/1.png" alt="" />
    </div>
    <div class="fourteen" :class="{ activess: isPlay == true }">
      <div class="thirteen">
        <div class="twlve">
          <div class="eleven">
            <div class="ten">
              <div class="nine">
                <div class="eight">
                  <div class="seven">
                    <div class="lunkuosix">
                      <div class="lunkuofive">
                        <div class="lunkuossss">
                          <div class="lunkuosss">
                            <div class="lunkuoss">
                              <div class="lunkuos">
                                <div class="lunkuo">
                                  <div class="lunzi">
                                    <img :src="url" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      <div class="musicname">{{ Name }}</div>
      <div class="artistname">{{ Ar }}</div>
    </div>
    <div class="frame">
      <div class="lyricframe">
        <div class="lyric" ref="lyrics">
          <div
            class="lyricRow"
            v-for="(item, index) in lyric"
            :key="index"
            :style="{ 'font-size': index == currentRow ? '16px' : '14px' }"
            :class="{ activessss: index == currentRow }"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: false,
      play: null,
      musiclist: [],
      currentIndex: null,
      url: "",
      time: null,
      id: "",
      lyric: [],
      Name: "",
      Ar: "",
      currentTime: null,
      currentRow: null,
    };
  },
  methods: {
    search() {},
    qi() {},
    qifei() {},
    qidong() {},
    qidongdong() {},
    formatLyric() {},
    lyricmove() {},
    donghua(object, target, callback) {
      clearInterval(object.time);
      object.time = setInterval(function () {
        var step = (target - object.offsetTop) / 5;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        object.style.top = object.offsetTop + step + "px";
        if (object.offsetTop == target) {
          clearInterval(object.time);
          if (callback) {
            callback();
          }
        }
      }, 30);
    },
  },

  mounted() {
    this.$bus.$on("qifei", (flag) => {
      if (flag == 0) {
        this.donghua(this.$refs.newShow, 0);
      } else if (flag == 1) {
        this.donghua(this.$refs.newShow, 704.2);
      }
    });

    this.$bus.$on("qidong", (isPlay) => {
      this.isPlay = isPlay;

      console.log(this.isPlay);
    });

    this.$bus.$on("qidongdong", (isPlay, totalTime) => {
      this.isPlay = isPlay;
      this.time = totalTime;
    });

    this.$bus.$on("qi", (SongSong, index) => {
      this.musiclist = SongSong;
      this.currentIndex = index;
      this.url = this.musiclist[this.currentIndex].al.picUrl;
      this.id = this.musiclist[this.currentIndex].id;
      this.Name = this.musiclist[this.currentIndex].name;
      this.Ar = this.musiclist[this.currentIndex].ar[0].name;
    });

    this.$bus.$on("search", (SongSong, index) => {
      this.musiclist = SongSong;
      this.currentIndex = index;
      this.url = this.musiclist[this.currentIndex].album.artist.img1v1Url;
      this.id = this.musiclist[this.currentIndex].id;
      this.Name = this.musiclist[this.currentIndex].name;
      this.Ar = this.musiclist[this.currentIndex].artists[0].name;
    });

    this.$bus.$on("formatLyric", (text) => {
      if (this.lyric != null) {
        this.lyric = [];
        let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
        let row = arr.length; //获取歌词行数
        for (let i = 0; i < row; i++) {
          let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
          let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
          let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
          //再对剩下的歌词时间进行处理
          temp_arr.forEach((element) => {
            let obj = {};

            let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
            let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
            obj.time = s;
            obj.text = text;
            this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
          });
        }
      } else {
        let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
        let row = arr.length; //获取歌词行数
        for (let i = 0; i < row; i++) {
          let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
          let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
          let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
          //再对剩下的歌词时间进行处理
          temp_arr.forEach((element) => {
            let obj = {};

            let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
            let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
            obj.time = s;
            obj.text = text;
            this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
          });
        }
      }
    });
    this.$bus.$on("lyricmove", (time) => {
      this.currentTime = parseInt(time);
    });
  },
  watch: {
    currentTime() {
      this.lyric.forEach((element, index) => {
        if (this.currentTime == element.time) {
          this.$refs.lyrics.style.top = -index * 27 + 20 + "px";
          this.currentRow = index;
        }
      });
    },
  },
};
</script>

<style scoped>
.newshows {
  position: fixed;
  left: 0px;
  top: calc(100vh - 87px);
  width: 100vw;
  height: calc(100vh - 87px);
  background-color: #2b2b2b;
  z-index: inherit;
}

.lunzi {
  width: 200px;
  height: 200px;
  border: 8px solid #222324;
  border-radius: 50%;
  background-color: #2b2b2b;
}

.lunzi img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.lunkuo {
  width: 216px;
  height: 216px;
  border: 1px solid #696969;
  border-radius: 50%;
  background-color: transparent;
}

.lunkuos {
  width: 218px;
  height: 218px;
  border: 1px solid #222324;
  border-radius: 50%;
  background-color: transparent;
}

.lunkuoss {
  width: 220px;
  height: 220px;
  border: 1px solid #696969;
  border-radius: 50%;
  background-color: transparent;
}

.lunkuosss {
  width: 222px;
  height: 222px;
  border: 1px solid #222324;
  border-radius: 50%;
  background-color: transparent;
}

.lunkuossss {
  width: 224px;
  height: 224px;
  border: 1px solid #696969;
  border-radius: 50%;
  background-color: transparent;
}

.lunkuofive {
  width: 226px;
  height: 226px;
  border: 1px solid #222324;
  border-radius: 50%;
  background-color: transparent;
}

.lunkuosix {
  width: 228px;
  height: 228px;
  border: 1px solid #696969;
  border-radius: 50%;
  background-color: transparent;
}

.seven {
  width: 230px;
  height: 230px;
  border: 1px solid #222324;
  border-radius: 50%;
  background-color: transparent;
}

.eight {
  width: 232px;
  height: 232px;
  border: 1px solid #696969;
  border-radius: 50%;
  background-color: transparent;
}

.nine {
  width: 234px;
  height: 234px;
  border: 1px solid #222324;
  border-radius: 50%;
  background-color: transparent;
}

.ten {
  width: 236px;
  height: 236px;
  border: 1px solid #696969;
  border-radius: 50%;
  background-color: transparent;
}

.eleven {
  width: 238px;
  height: 238px;
  border: 1px solid #222324;
  border-radius: 50%;
  background-color: transparent;
}

.twlve {
  width: 240px;
  height: 240px;
  border: 1px solid #696969;
  border-radius: 50%;
  background-color: transparent;
}

.thirteen {
  width: 242px;
  height: 242px;
  border: 4px solid #222324;
  border-radius: 50%;
  background-color: transparent;
}

.fourteen {
  position: absolute;
  top: 140px;
  left: 155px;
  width: 250px;
  height: 250px;
  border: 8px solid #808080;
  border-radius: 50%;
  background-color: transparent;
  animation-play-state: paused;
}

.actives {
  animation: fadenum 20s linear paused;
}

.activess {
  animation: fadenum 30s linear infinite;
}

@keyframes fadenum {
  100% {
    transform: rotate(360deg);
  }
}

.changbi {
  position: absolute;

  top: 30px;
  left: 260px;
  width: 40px;
  height: 40px;
  z-index: 5;
  transition: all 0.5s;
}

.changbi img {
  width: 200px;
  height: 100px;
}

.active {
  transform: rotate(33deg);
}

.title {
  position: absolute;
  width: 220px;
  height: 110px;
  background-color: transparent;
  top: 30px;
  left: 650px;
}

.musicname {
  width: 220px;
  height: 55px;
  color: white;
  font-size: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  line-height: 60px;
}

.artistname {
  width: 220px;
  height: 55px;
  text-align: center;
  line-height: 45px;
  color: #676767;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.frame {
  width: 640px;
  height: 300px;

  position: absolute;
  left: 450px;
  top: 180px;
}

.lyricframe {
  position: relative;
  width: 640px;
  height: 100%;
  background-color: transparent;
  overflow: hidden;
}

.lyric {
  position: absolute;
  width: 440px;
  height: auto;
  top: 200px;
  left: 91px;
  font-family: YouYuan;
  /* overflow: scroll; */
}

.lyricRow {
  width: 100%;
  height: 30px;
  text-align: center;
  color: #676767;
  font-size: 14px;
  line-height: 30px;
}

.activessss {
  color: white;
}
</style>
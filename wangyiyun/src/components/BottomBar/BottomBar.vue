<template>
  <div class="bottombar">
    <div class="musicpicture" @click="fly">
      <img :src="SS" alt="" />
    </div>
    <div class="musicArtist">
      <div class="musicname">{{ Name }}</div>
      <div class="Artist">{{ Ar }}</div>
    </div>
    <div class="rightbottombar">
      <div class="controlvolume">
        &#xe8b8;
        <div class="volume">
          <input
            type="range"
            class="voice"
            ref="ranges"
            @input="Change"
            @change="Change"
            min="0"
            max="100"
            value="0"
            step="1"
          />
        </div>
        <div class="triangle"></div>
      </div>
      <!-- <div v-if="istrue == false" @click.stop="jingyin" class="controlvolume">
        &#xe61e;
        <div class="volume" @mousedown.stop>
          <input
            type="range"
            class="voice"
            ref="ranges"
            @input.stop="Change"
            @change.stop="Change"
            min="0"
            max="100"
            value="0"
            step="1"
          />
        </div>
        <div class="triangle"></div>
      </div> -->
    </div>
    <div :key="key" class="yinpin">
      <audio
        ref="audio"
        style="display: none"
        :src="Song"
        autoplay="autoplay"
        controls="controls"
        @timeupdate="update"
        @canplay="loadingfinish"
      ></audio>

      <div v-if="isPlay == false" @click="play" class="Pause">
        <span class="pause">&#xe63f;</span>
      </div>

      <div v-if="isPlay == true" @click="pause" class="Play">
        <span class="play">&#xe61d;</span>
      </div>
      <div class="leftTime">{{ currenttime }}</div>
      <input
        type="range"
        ref="range"
        @input="onChange"
        @change="onChange"
        min="0"
        max="360"
        value="0"
        class="range"
      />
      <div class="rightTime">{{ totaltime }}</div>
    </div>
  </div>
</template>

<script>
import { requestsongs } from "../../network/requestsongs";

export default {
  data() {
    return {
      song: [],
      songs: "",
      id: "",
      key: 0,
      isPlay: false,
      currentTime: 0,
      totalTime: 0,
      S: [],
      Index: null,
      SS: "",
      Name: "",
      Ar: "",
      flag: 0,
      istrue: true,
    };
  },
  components: {},
  created() {},

  methods: {
    fly() {
      if (this.flag == 0) {
        this.flag++;
        this.$bus.$emit("qifei", this.flag);
      } else if (this.flag == 1) {
        this.flag--;
        this.$bus.$emit("qifei", this.flag);
      }
    },

    changekey(id) {},
    musicPicture(SongSong) {},
    Picture() {},
    play() {
      const audio = this.$refs.audio;
      audio.play();
      this.isPlay = true;

      this.$bus.$emit("qidong", this.isPlay);
    },
    pause() {
      const audio = this.$refs.audio;
      audio.pause();
      this.isPlay = false;
      this.$bus.$emit("qidong", this.isPlay);
    },

    // audio--进度变化的时候的回调--改变文字
    update() {
      const audio = this.$refs.audio;
      const currentTime = audio.currentTime; // 当前播放时间
      this.currentTime = currentTime;
      this.$bus.$emit("lyricmove", this.currentTime);
      // 改变进度条的值
      const range = this.$refs.range;
      range.value = ((this.currentTime / this.totalTime) * 360).toFixed(1);
      // 进度条的值改变的时候，颜色也跟着变化
      const persentage =
        ((this.currentTime / this.totalTime) * 100).toFixed(1) + "%";
      this.$refs.range.style.backgroundSize = `${persentage} 100%`;
    },

    loadingfinish() {
      const totalTime = this.$refs.audio.duration;
      this.totalTime = totalTime;
    },

    onChange() {
      let value = this.$refs.range.value;
      const persentage = ((value / 360) * 100).toFixed(1) + "%";
      this.$refs.range.style.backgroundSize = `${persentage} 100%`;
      // 控制音频播放
      const timeToGo = (value / 360) * this.totalTime;
      const audio = this.$refs.audio;
      audio.currentTime = timeToGo;
    },

    Change() {
      let value = this.$refs.ranges.value;

      const persentage = ((value / 100) * 100).toFixed(1) + "%";
      this.$refs.ranges.style.backgroundSize = `${persentage} 100%`;

      const volume = value / 100;
      const audio = this.$refs.audio;
      audio.volume = volume;
    },

    jingyin() {
      this.istrue = !this.istrue;
    },

    formatTime(value) {
      let second = 0;
      let minute = 0;
      minute = parseInt(value / 60);
      second = parseInt(value % 60);
      // 补0
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return minute + ":" + second;
    },
  },

  mounted() {
    this.$refs.audio.volume = 0;

    this.$bus.$on("changekey", (id) => {
      this.id = id;

      this.isPlay = true;
      this.$bus.$emit("qidongdong", this.isPlay, this.totalTime);
    });

    this.$bus.$on("musicPicture", (SongSong, index) => {
      this.S = SongSong;
      this.Index = index;
      this.SS = this.S[this.Index].al.picUrl;
      this.Name = this.S[this.Index].name;
      this.Ar = this.S[this.Index].ar[0].name;
      console.log(this.SS);
    });

    this.$bus.$on("Picture", (SongSong, index) => {
      this.S = SongSong;
      this.Index = index;
      this.SS = this.S[this.Index].album.artist.img1v1Url;
      this.Name = this.S[this.Index].name;
      this.Ar = this.S[this.Index].artists[0].name;
    });

    requestsongs(this.id, 320000).then((res) => {
      this.song = res.data.data;

      this.songs = this.song[0].url;
    });

    setTimeout(() => {
      this.$refs.range.value = 0;
      this.$refs.ranges.value = 0;
    }, 1);
  },

  watch: {
    id: {
      handler(newvalue, oldvalue) {
        requestsongs(newvalue, 320000).then((res) => {
          this.song = res.data.data;
          console.log(this.song[0]);
          this.songs = this.song[0].url;
          console.log(this.songs);
        });
      },
    },

    currentTime: {
      handler(newvalue, oldvalue) {
        if (newvalue == this.totalTime) {
          this.isPlay = false;
          this.$bus.$emit("qidongdong", this.isPlay);
        }
      },
    },
  },

  computed: {
    Song() {
      return this.songs;
    },

    currenttime() {
      return this.formatTime(this.currentTime);
    },

    totaltime() {
      return this.formatTime(this.totalTime);
    },
  },
};
</script>

<style scoped>
.bottombar {
  position: fixed;

  bottom: 0px;
  width: 100%;
  height: 87px;
  background-color: #212124;
  border-top: 3px solid #454545;
  z-index: 6;
}

.musicpicture {
  width: 60px;
  height: 60px;
  float: left;
  margin-top: 10px;
  margin-left: 15px;
  background-color: transparent;
  cursor: pointer;
}

.musicpicture img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}

.musicArtist {
  width: 200px;
  height: 60px;
  float: left;
  margin-top: 10px;
  margin-left: 8px;
  background-color: transparent;
}

.musicname {
  width: 200px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  line-height: 42px;
  font-size: 14px;
  color: white;
}

.Artist {
  width: 200px;
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 12px;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.yinpin {
  width: 40%;
  height: 100%;
  margin: 0px auto;
  background-color: transparent;
  position: relative;
}

audio {
  width: 100%;
  height: 100%;
  margin: -15px auto;
  outline: none;
}

.Pause {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2a2a2d;
  top: 10px;
  left: 282px;
}

.pause {
  display: block;
  width: 45px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-size: 22px;
  padding-left: 5px;
  color: white;
  cursor: pointer;
}

.pause:hover {
  background-color: #38383a;
}

.Play {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2a2a2d;
  top: 10px;
  left: 282px;
}

.play {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-size: 22px;

  color: white;
  cursor: pointer;
}

.play:hover {
  background-color: #38383a;
}

.yinpin .range {
  position: absolute;
  outline: none;
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 80% !important;
  background: -webkit-linear-gradient(#ec4141, #ec4141) no-repeat, #dddddd; /*背景颜色，俩个颜色分别对应上下*/
  background-size: 0% 100%; /*设置左右宽度比例，这里可以设置为拖动条属性*/
  height: 4px; /*横条的高度，细的真的比较好看嗯*/
  border-radius: 4px;
  bottom: 15px;
  left: 10%;
  background-color: #4c4c4e;
}
/*拖动块的样式*/
.yinpin .range::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 10px; /*拖动块高度*/
  width: 10px; /*拖动块宽度*/
  border-radius: 50%;
  background: #ec4141; /*拖动块背景*/
}

.leftTime {
  position: absolute;
  bottom: 8px;
  left: 0px;
  width: 10%;
  height: 20px;
  background-color: transparent;
  text-align: center;
  line-height: 20px;
  color: white;
  font-size: 12px;
}

.rightTime {
  position: absolute;
  bottom: 8px;
  right: 0px;
  width: 10%;
  height: 20px;
  background-color: transparent;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: white;
}

.rightbottombar {
  width: 100px;
  height: 40px;
  float: right;
  margin-top: 30px;
  margin-right: 40px;
}

.controlvolume {
  width: 50%;
  height: 40px;
  float: left;
  text-align: center;
  line-height: 40px;
  font-size: 26px;
  cursor: pointer;
  color: #a6a6a7;
  position: relative;
}

.volume {
  width: 30px;
  height: 120px;
  position: absolute;
  top: -125px;
  right: 10px;
  border-radius: 5px;
  border: 2px solid #303030;
  background-color: #252525;
  display: none;
}

.triangle {
  position: absolute;
  top: -1px;
  right: 20px;
  width: 0px;
  height: 0px;
  border: 6px solid transparent;
  border-top-color: #303030;
  display: none;
}

.controlvolume:hover {
  color: white;
}

.controlvolume:hover .volume {
  display: block;
}

.controlvolume:hover .triangle {
  display: block;
}

.voice {
  transform: rotate(-90deg);
}

.voice {
  outline: none;
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 100px;
  background: -webkit-linear-gradient(#ec4141, #ec4141) no-repeat, #dddddd; /*背景颜色，俩个颜色分别对应上下*/
  background-size: 0% 100%; /*设置左右宽度比例，这里可以设置为拖动条属性*/
  height: 4px; /*横条的高度，细的真的比较好看嗯*/
  border-radius: 2px;
  margin-top: 60px;
  margin-left: -34.5px;
  background-color: #4c4c4e;
  cursor: pointer;
}

.voice::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 10px; /*拖动块高度*/
  width: 10px; /*拖动块宽度*/
  border-radius: 50%;

  background: #ec4141; /*拖动块背景*/
}
</style>
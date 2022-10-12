<template>
  <div class="searchmusic">
    <div class="searchcenter">
      <div class="top">搜索 {{ value }}</div>
      <div class="centerbar">
        <div class="bar">
          <div class="title" v-for="(item, index) in titles" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="number">找到了{{ songs.length }}首单曲</div>
      </div>
      <div class="playall">
        <div class="play">
          <div class="plays">播放全部</div>
        </div>
      </div>
      <div class="songs">
        <table border="0" cellspacing="0">
          <thead>
            <th></th>
            <th>操作</th>
            <th>标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时间</th>
          </thead>
          <tbody>
            <tr
              @dblclick="chuansong(item.id, index)"
              v-for="(item, index) in songs"
              :key="index"
              :class="{ active: currentIndex == item.id }"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <span class="caozuoleft">&#xe616;</span>
                <span class="caozuoright">&#xe7f0;</span>
              </td>
              <td>{{ item.name }}</td>
              <td>
                <span style="padding: 0px 3px">{{ item.artists[0].name }}</span>
              </td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | Time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { requestLyric } from "../../../network/requestLyric";

export default {
  data() {
    return {
      titles: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌单",
        "歌词",
        "播客",
        "声音",
        "用户",
      ],
      songs: [],
      value: "",
      currentIndex: null,
    };
  },
  methods: {
    searchmusic() {},
    chuansong(id, index) {
      this.currentIndex = id;
      this.$bus.$emit("changekey", id);
      this.$bus.$emit("Picture", this.songs, index);
      this.$bus.$emit("search", this.songs, index);
      requestLyric(id).then((res) => {
        console.log(res);
        this.$bus.$emit("formatLyric", res.data.lrc.lyric);
      });
    },
  },
  mounted() {
    this.$bus.$on("searchmusic", (songs, value) => {
      this.songs = songs;
      this.value = value;
    });
  },
  filters: {
    Time(value) {
      return dayjs(value).format("mm:ss");
    },
    set(value) {
      return index > 10 ? value : "0" + value;
    },
  },
};
</script>

<style scoped>
.searchmusic {
  width: 100%;
  height: 100%;
  background-color: #2b2b2b;
  font-family: YouYuan;
  color: #b6b6b6;
}

.searchcenter {
  width: 95%;
  height: auto;
  margin: 0px auto;
}

.top {
  color: #b6b6b6;
  font-size: 22px;
  height: 80px;
  width: 100%;
  text-align: left;
  line-height: 80px;
}

.centerbar {
  width: 100%;
  height: 30px;
}

.bar {
  width: 70%;
  height: 100%;
  float: left;
  display: flex;
}

.title {
  padding: 15px;
  font-size: 14px;
  line-height: 1px;
  text-align: center;
  cursor: pointer;
}

.title:nth-child(1) {
  padding-left: 0px;
  text-align: left;
  line-height: 1px;
}

.number {
  width: 30%;
  height: 100%;
  float: right;
  font-size: 14px;
  color: #b6b6b6;
  line-height: 30px;
  text-align: right;
}

.playall {
  width: 100%;
  height: 40px;
  margin-top: 15px;
}

.play {
  width: 100px;
  height: 40px;
  border-radius: 40px;
  background-color: #ec4141;
}

.plays {
  width: 100px;
  height: 40px;
  border-radius: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
  cursor: pointer;
  background-color: transparent;
}

.plays:hover {
  background-color: #d93f3f;
}

.songs {
  width: 100%;
  height: auto;
  margin-top: 15px;
}

.active {
  background-color: #373737;
}

table {
  width: 100%;
  height: auto;
  border: 0px;

  font-family: YouYuan;
}

table thead {
  width: 100%;
  height: 40px;
}

table thead th {
  text-align: left;
  line-height: 40px;
  font-size: 12.5px;
  color: #808080;
}

.caozuoleft {
  font-size: 16px;
  color: #808080;
}

.caozuoleft:hover {
  color: white;
}

.caozuoright {
  font-size: 16px;
  color: #808080;
  padding-left: 12px;
}

.caozuoright:hover {
  color: white;
}

table thead th:nth-child(1) {
  width: 5%;
}

table thead th:nth-child(2) {
  width: 5%;
}

table thead th:nth-child(3) {
  width: 35%;
}

table thead th:nth-child(4) {
  width: 25%;
}

table thead th:nth-child(5) {
  width: 20%;
}

table thead th:nth-child(6) {
  width: 10%;
  color: #808080;
}

table tbody {
  width: 100%;
  height: auto;
}

table tbody tr {
  text-align: left;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: white;
  cursor: pointer;
}

table tbody tr:hover {
  background-color: #373737;
}

/*设置奇数行颜色*/
table tbody tr:nth-child(odd) {
  background-color: #2f2f2f;
}

table tbody tr td:nth-child(1) {
  width: 64.4px;
  color: #808080;
  text-align: center;
}

table tbody tr td:nth-child(2) {
  width: 64.4px;
  color: #808080;
}

table tbody tr td:nth-child(3) {
  width: 450.8px;
}
table tbody tr td:nth-child(4) {
  width: 322px;
  color: #808080;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  /* display: block; */
}

table tbody tr td:nth-child(5) {
  width: 309.11px;
  color: #808080;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

table tbody tr td:nth-child(6) {
  width: 74.29px;
  color: #808080;
  padding-left: 3px;
}
</style>
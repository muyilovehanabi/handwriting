<template>
  <div>
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
            <span
              style="padding: 0px 3px"
              v-for="(items, indey) in item.ar"
              :key="indey"
              >{{ items.name }}</span
            >
          </td>
          <td>{{ item.al.name }}</td>
          <td>{{ item.dt | Time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { requestLyric } from "../../../../../../network/requestLyric";

export default {
  props: {
    songs: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },

  data() {
    return {
      currentIndex: null,
    };
  },
  methods: {
    chuansong(id, index) {
      this.$bus.$emit("changekey", id);
      this.currentIndex = id;
      const SongSong = this.songs;
      this.$bus.$emit("musicPicture", SongSong, index);
      this.$bus.$emit("qi", SongSong, index);

      requestLyric(id).then((res) => {
        console.log(res);
        this.$bus.$emit("formatLyric", res.data.lrc.lyric);
      });
    },
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
.active {
  background-color: #373737;
}

div {
  width: 100%;
  height: auto;
  background-color: transparent;
  margin-top: 15px;
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
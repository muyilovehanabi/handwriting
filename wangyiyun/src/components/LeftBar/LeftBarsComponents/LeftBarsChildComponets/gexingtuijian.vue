<template>
  <div class="gexing">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img style="width: 100%; height: 200px" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { requestsearch } from "../../../../network/requestsearch";

export default {
  data() {
    return {
      bannerList: [],
    };
  },
  created() {
    requestsearch(0).then((res) => {
      this.bannerList = res.data.banners;
    });
  },
};
</script>
<style scoped>
.gexing {
  width: 80%;
  height: auto;
  margin: 80px auto;
}

.el-carousel__item {
  border-radius: 8px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
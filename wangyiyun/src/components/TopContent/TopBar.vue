<template>
  <div class="BackGround">
    <div class="content">
      <div class="logo" @click="logo">
        <img src="../../assets/Image/logo.jpg" />
        <span>网易云音乐</span>
      </div>
      <div class="SearchPart">
        <div class="left" @click="fanhui">&#xe659;</div>
        <div class="right" @click="qianjin">&#xe62d;</div>
        <div class="search">&#xf00a8;</div>
        <input type="text" @keyup.enter="search" ref="sousuo" />
        <div class="micro">&#xe6a8;</div>
      </div>
      <div class="rightpart">
        <div class="yonghu"></div>
        <div class="detail" @click="login">请先登录</div>
        <div class="change">&#xe623;</div>
        <div class="set">&#xe752;</div>
        <div class="message">&#xe621;</div>
      </div>
    </div>
    <div v-if="show == true" class="login">
      <div class="shang">
        <div class="guanbi" @click="guanbi">X</div>
      </div>
      <div class="zhongjian">
        <div class="logo">
          <img src="../../assets/Image/redlogo.png" />
          <div class="shuru">
            <input
              ref="zhanghao"
              class="phonenumber"
              type="text"
              placeholder="请输入手机号"
            />
            <input
              ref="mima"
              class="password"
              type="password"
              placeholder="请输入密码"
            />
            <div @click="zhengshidenglu" class="zhengshidenglu">登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestSousuo } from "../../network/requestSousuo";
import { requestyonghu } from "../../network/requestyonghu";

export default {
  data() {
    return {
      boolean: false,
      booleans: true,
      show: false,
      searchsongs: [],
    };
  },
  methods: {
    logo() {
      this.$router.push("/find/gexingtuijian");
    },
    fanhui() {
      this.$router.back();
    },
    qianjin() {
      this.$router.go(1);
    },

    search() {
      this.$router.push("/search");
      let value = this.$refs.sousuo.value;

      requestSousuo(value, 1).then((res) => {
        this.searchsongs = res.data.result.songs;
        this.$bus.$emit("searchmusic", this.searchsongs, value);
      });
    },
    login() {
      if (this.show == false) {
        this.show = !this.show;
      }
    },
    guanbi() {
      this.show = !this.show;
    },
    zhengshidenglu() {
      let phone = this.$refs.zhanghao.value;
      let password = this.$refs.mima.value;

      requestyonghu(phone, password).then((res) => {
        console.log(res);
      });
    },
  },

  created() {
    this.logo();
  },
};
</script>

<style scoped>
.BackGround {
  width: 100%;
  height: 70px;
  background-color: #222225;
  border-bottom: 3px solid #9c1a1a;
  position: fixed;
  top: 0px;
  z-index: 3;
}

.content {
  position: relative;
  width: calc(100% - 50px);
  height: 30px;
  margin-top: 20px;
  margin-left: 25px;
  margin-right: 25px;
}

.content .logo {
  position: relative;
  width: 138px;
  height: 30px;
  background-color: #222225;
  margin-left: 0px;
  color: white;
}

.content .logo:hover {
  cursor: pointer;
}

.content .logo img {
  height: 30px;
  width: 30px;
  background-color: #222225;
  position: absolute;
  left: 0px;
}

.content .logo span {
  position: absolute;
  font-size: 20px;
  line-height: 32px;
  font-family: YouYuan;
  left: 36px;
}

.SearchPart {
  position: absolute;
  display: flex;
  width: 315px;
  left: 258px;
  top: 0px;
  height: 30px;
}

.SearchPart .left {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1f1f22;
  text-align: center;
  line-height: 30px;
  color: white;
  font-size: 12px;
}

.SearchPart .right {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1f1f22;
  text-align: center;
  line-height: 30px;
  color: white;
  font-size: 12px;
  margin-left: 35px;
}

.SearchPart .left:hover {
  cursor: pointer;
}
.SearchPart .right:hover {
  cursor: pointer;
}

.SearchPart .search {
  margin-left: 30px;
  height: 30px;
  width: 30px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: #2b2b2e;
  text-align: right;
  line-height: 30px;
  font-size: 12px;
  color: white;
}

.SearchPart .search:hover {
  color: #b2b2b3;
  cursor: pointer;
}

.SearchPart input {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid #2b2b2e;
  width: 158px;
  outline: none;
  background-color: #2b2b2e;
  caret-color: white;
  padding-left: 5px;
  color: white;
}

.SearchPart .micro {
  margin-left: 25px;
  font-size: 14px;
  color: white;
  width: 16px;
  line-height: 30px;
}

.SearchPart .micro:hover {
  cursor: pointer;
}

.content .rightpart {
  position: absolute;

  height: 30px;
  top: 0px;
  right: 0px;
  width: 385px;
  display: flex;
}

.content .rightpart .yonghu {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
}

.content .rightpart .yonghu:hover {
  cursor: pointer;
}

.content .rightpart .detail {
  position: relative;
  margin-left: 10px;
  width: 130px;
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-family: YouYuan;
  font-size: 12px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content .rightpart .detail:hover {
  cursor: pointer;
}

.login {
  position: fixed;
  top: 120px;
  right: 590px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  z-index: 999;
}

.login .shang {
  width: 100%;
  height: 40px;
  margin-top: 0px;
}

.guanbi {
  width: 30px;
  height: 30px;
  text-align: center;
  padding-right: 5px;
  line-height: 38px;
  font-size: 20px;
  color: #999999;
  cursor: pointer;
  float: right;
}

.guanbi:hover {
  color: #6f6f6f;
}

.zhongjian {
  width: 80%;
  height: 400px;
  margin: 0px auto;
}

.zhongjian .logo {
  width: 100%;
  height: 60px;
}

.logo img {
  width: 60px;
  height: 60px;
  margin: 0px auto;
}

.shuru {
  width: 100%;
  height: 80px;
  margin-top: 40px;
}

.shuru input {
  outline: none;
  width: calc(100% - 5px);
  height: 40px;
  padding-left: 5px;
  caret-color: darkgray;
}

.shuru .phonenumber {
  border: 1px solid #6f6f6f;
  border-bottom: 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.shuru .password {
  border: 1px solid #6f6f6f;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.shuru div {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-top: 50px;
  background-color: #ff3a3a;
  font-family: YouYuan;
  font-size: 18px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.zhengshidenglu:hover {
  background-color: #e53434;
}

.change {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 18px;
  line-height: 30px;
  color: #b2b2b3;
}

.change:hover {
  color: white;
  cursor: pointer;
}

.set,
.message {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 18px;
  line-height: 30px;
  color: #b2b2b3;
}

.rightpart .message {
  line-height: 34px;
}

.set:hover {
  color: white;
  cursor: pointer;
}

.message:hover {
  color: white;
  cursor: pointer;
}
</style>
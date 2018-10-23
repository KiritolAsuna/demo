<template>
  <div>
    <div v-if="a">
      <head-vue head="会员详情"></head-vue>
      <ul>
        <li>用户名:{{nm.username}}</li>
        <li>账号:{{nm.login}}</li>
        <li>性别:{{nm.sex}}</li>
      </ul>
      <p>购物历史:</p>
      <ul>
        <li v-for="(aa,index) in nn" :key="index">共购买:<span>{{aa.zhaiyao}}</span>{{nm.shopcar[aa.id]}}台</li>
      </ul>
    </div>
    <div v-if="b">
      <head-vue head="会员登录"></head-vue>
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" ref="a">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" ref="b">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="aa">登录</button>
        <div class="link-area">
          <router-link id='reg' :to="{name:'zhuce'}"><span>注册账号</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "./user.js";
export default {
  data() {
    return {
      con: [],
      a: false,
      b: true,
      nm: [],
      nn: []
    };
  },
  created() {
    // console.log(user.getusers());
    // console.log(JSON.stringify(user.getusers()) == "{}");
    if (JSON.stringify(user.getusers()) == "{}") {
      this.a = false;
      this.b = true;
    } else {
      this.a = true;
      this.b = false;
    }
    this.nm = user.getusers();
    // console.log(this.nm);
    // console.log(this.nm.shopcar);
    let hh = this.nm.shopcar;
    let mm = this.nn;
    // console.log(hh);
    // console.log(mm);

    for (var i in hh) {
      // console.log(i);
      // console.log(hh[i]);
      this.$ajax.get("http://127.0.0.1:3000/phones/" + i).then(res => {
        this.nn.push(res.data[0]);
      });
    }
    this.$ajax.get("http://localhost:3000/users").then(res => {
      this.con = res.data;
      // console.log(this.con);
    });
  },
  methods: {
    aa() {
      for (var i in this.con) {
        // console.log(i);
        // console.log(this.con[i].login);
        if (
          this.con[i].login == this.$refs.a.value &&
          this.con[i].password == this.$refs.b.value
        ) {
          // console.log(this.con[i].login);
          // console.log(this.$refs.a.value);
          user.save(this.con[i]);
          this.a = true;
          this.b = false;
          this.$router.go(0);
        }
      }
    }
  }
};
</script>

<style scoped>
#login {
  height: 50px;
}
ul li {
  list-style: none;
  padding: 10px;
  margin: 5px;
}
ul{
  padding: 0px;
}
</style>

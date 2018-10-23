<template>
    <div id="a">
        <head-vue head="注册用户"></head-vue>
        <div>
            用户名：<input type="text" maxlength="8" placeholder="用户名1-8个字符" ref="a">
            账号：<input type="text" maxlength="8" placeholder="账号1-8个字符" ref="b">
            密码：<input type="text" minlength="6" placeholder="密码为1-6个字符" ref="c">
            确认密码：<input type="text" minlength="6" placeholder="密码为1-6个字符" ref="d">
            性别：
            <mt-checklist :max='1' v-model="value" :options="options" ref="f"></mt-checklist>
            <button id="bn" class="mui-btn mui-btn-warning mui-btn-block" @click="aa">注册</button>
        </div>
    </div>
</template>

<script>
import user from './user.js'
export default {
  data() {
    return {
      value: [],
      options: ["男", "女"],
      user: {
        username: "",
        login: "",
        sex: "",
        password: "",
        shopcar:{},
      },
      content: [],
      isf: true
    };
  },
  created() {
    // console.log(this.value);
    this.$ajax.get("http://localhost:3000/users").then(res => {
      //   console.log(res.data);
      this.content = res.data;
    //   console.log(this.content);
    });
  },
  methods: {
    aa() {
      this.isf = true;
      //   console.log(this.$refs.f.value);
      //   console.log(this.$refs.a.value);
      if (this.$refs.a.value == "") {
        alert("用户名不能为空");
        return;
      }
      if (this.$refs.b.value == "") {
        alert("账号不能为空");
        return;
      }
      if (this.$refs.c.value == "") {
        alert("密码不能为空");
        return;
      }
      if (this.$refs.d.value == "") {
        alert("确认密码不能为空");
        return;
      }
      if (this.$refs.f.value == "") {
        alert("性别不能为空");
        return;
      }
      if (this.$refs.c.value !== this.$refs.d.value) {
        alert("两次密码输入不一致");
        return;
      }
      this.user.username = this.$refs.a.value;
      this.user.sex = this.$refs.f.value;
      this.user.login = this.$refs.b.value;
      this.user.password = this.$refs.c.value;
      //   console.log(this.user.login);
      //   console.log(this.$refs.b.value);
      for (var i in this.content) {
        // console.log(i);
        // console.log(this.content[i]);
        // console.log(this.content[i].login);
        if (this.content[i].login == this.$refs.b.value) {
          alert("用户名或账号已存在");
          this.isf = false;
        }
      }
      if (this.isf) {
        // console.log("aa");
        alert("注册成功");
        this.$ajax
          .post(
            "http://localhost:3000/zhuce","content=" + JSON.stringify(this.user)
          )
          .then(res => {
            // console.log(res.data);
          });
          user.save(this.user);
          this.$router.push({name:'huiyuan'});
      }
    }
  }
};
</script>

<style scoped>
#a {
  margin-bottom: 50px;
}
#bn {
  width: 98%;
  margin: 3px;
}
</style>
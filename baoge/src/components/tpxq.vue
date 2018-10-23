<template>
  <div>
    <head-vue :head="name"></head-vue>
    <div id="a">
      <vue-preview :slides="con" width="150" class='a noname mui-table-view mui-grid-view mui-grid-9'>
        <img class="img" width="150" height="150">
      </vue-preview>
    </div>
    <div id="b">
      <p>{{ct.title}}</p>
      <p>性别:{{ct.sex}}</p>
      <p>{{ct.content}}</p>
      <div>
        <input v-model="co.content" type="text" placeholder="输入评论">
        <button @click="pinglun" class="mui-btn mui-btn-primary" id="button" :disabled='isdisabled'>发表评论</button>
        <br />
        <p style="text-align: right;padding-right:5px;">共{{count}}条</p>
        <ul class="mui-table-view">
          <li v-for='(m,index) in msg' :key="index" class="mui-table-view-cell">
            {{m.name}}:{{m.content}}<span id="span">{{m.time}}</span>
          </li>
        </ul>
        <button id="button" @click="loadnext">加载更多</button>
      </div>
    </div>
  </div>
</template>

<script>
import user from './user.js';
export default {
  data() {
    return {
      ct: [],
      con: [{}, {}, {}],
      id1: "",
      name: "",
      count: "",
      msg: [],
      page: 5,
      co: {
        name: "匿名用户",
        dm_name: this.$route.params.name,
        content: "",
        time: ""
      },
      isdisabled: true
    };
  },
  created() {
    if (JSON.stringify(user.getusers()) == "{}") {
      
      this.co.name="匿名用户";
      // console.log(this.co.name);
    }else{
      this.co.name=user.getusers().username;
       console.log(this.co.name);
    }
    let id = this.$route.params.id;
    this.id1 = this.$route.params.ids;
    this.name = this.$route.params.name;
    // console.log(this.name);
    this.$ajax.get("http://127.0.0.1:3000/dm_list/" + id).then(res => {
      // console.log(res);
      this.ct = res.data[0].names[this.id1];
      // console.log(this.ct);
      this.ct.pic.forEach((ele, i) => {
        this.con[i].src = ele;
        this.con[i].msrc = ele;
        this.con[i].w = 400;
        this.con[i].h = 400;
      });
      // console.log(this.con);
    });
    this.loadfirst();
  },
  methods: {
    handleClose() {},
    loadfirst() {
      this.$ajax
        .get("http://127.0.0.1:3000/pl/?name=" + this.name + "&&page=5")
        .then(res => {
          this.count = res.data.count;
          // console.log(this.count);
          this.msg = res.data.msg;
          // console.log(this.msg);
        });
    },
    loadnext() {
      this.$ajax
        .get(
          "http://127.0.0.1:3000/pl/?name=" +
            this.name +
            "&&page=" +
            (this.page = this.page + 5)
        )
        .then(res => {
          this.count = res.data.count;
          // console.log(this.count);
          this.msg = res.data.msg;
          // console.log(this.msg);
        });
    },
    pinglun() {
      var d = new Date(Date.now());
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      this.co.time =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds;

      this.$ajax
        .post(
          "http://127.0.0.1:3000/fabiao",
          "content=" + JSON.stringify(this.co)
        )
        .then(res => {
          console.log(res);
          this.loadfirst();
          this.co.content = "";
        });
    }
  },
  watch: {
    co: {
      handler: function(val, oldVal) {
        if (this.co.content.length > 0) {
          this.isdisabled = false;
        } else {
          this.isdisabled = true;
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
ul li {
  list-style-type: none;
}
ul {
  padding: 0px;
  margin: 0px;
}
li {
  line-height: 40px;
  font-size: 20px;
}
#a {
  width: 100%;
  text-align: center;
  overflow: hidden;
}
#b {
  text-align: left;
  background-color: white;
  padding-bottom: 45px;
}
p {
  color: #000000;
}
#span {
  float: right;
  padding-right: 5px;
  font-size: 20px;
  color: brown;
}
#button {
  width: 100%;
  height: 50px;
}
</style>
<template>
  <div>
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
</template>

<script>
import user from "./user.js";
export default {
  data() {
    return {
      name: "",
      count: "",
      msg: [],
      page: 5,
      co: {
        name: "匿名用户",
        good_id: this.cid,
        content: "",
        time: ""
      },
      isdisabled: true
    };
  },
  props: ["cid"],
  created() {
    this.loadfirst();
    if (JSON.stringify(user.getusers()) == "{}") {
      this.co.name = "匿名用户";
      // console.log(this.co.name);
    } else {
      this.co.name = user.getusers().username;
      //  console.log(this.co.name);
    }
  },
  methods: {
    handleClose() {},
    loadfirst() {
      this.$ajax
        .get("http://127.0.0.1:3000/comment/?id=" + this.cid + "&&" + "page=5")
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
          "http://127.0.0.1:3000/comment/?id=" +
            this.cid +
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
          "http://127.0.0.1:3000/comment",
          "content=" + JSON.stringify(this.co)
        )
        .then(res => {
          // console.log(res);
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
#button {
  width: 100%;
  height: 50px;
}
#span {
  float: right;
  padding-right: 5px;
  font-size: 20px;
  color: brown;
}
</style>
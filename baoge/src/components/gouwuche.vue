<template>
  <div id="a">
    <head-vue head="购物车"></head-vue>
    <ul>
      <li v-for='(good,index) in goods' :key="index" class="mui-table-view-cell">
        <mt-switch v-model="good.isp" @change="handleChange" id="mt"></mt-switch>
        <img :src="good.img" alt="">
        <br />
        <span>{{good.zhaiyao}}</span>
        <br />
        <div>
          <span>¥：{{good.price}}</span>
          <span id="sp" @click="jian(index)">-</span>
          <span id="sp">{{good.num}}</span>
          <span id="sp" @click="jia(index)">+</span>
          <button id="bu" @click="del(index)">删除</button>
        </div>
      </li>
    </ul>
    <div id="b">
      <p>总计(不含运费)</p>
      <span>已选择商品{{count.num}}件，总价{{count.price}}元</span>
      <button @click="bb">结算</button>
    </div>
  </div>
</template>

<script>
import shopcart from "./shopcart.js";
import connect from "./connect.js";
import user from "./user.js";
export default {
  data() {
    return {
      goods: [],
      id: []
    };
  },
  created() {
    if (JSON.stringify(user.getusers()) == "{}") {
      alert("请先登录");
      this.$router.push({ name: "huiyuan" });
    }
    let gd = shopcart.getprods();
    // console.log(gd);
    for (var k in gd) {
      // console.log(k);
      // console.log(gd[k]);
      this.$ajax.get("http://127.0.0.1:3000/phones/" + k).then(res => {
        // console.log(res);
        this.goods.push(res.data[0]);
        this.id.push(res.data[0].id);
        // console.log(this.goods);
        this.goods.forEach((ele, index) => {
          if (gd[ele.id]) {
            // ele.num = gd[ele.id];
            // ele.isp = true;
            this.$set(ele, "num", gd[ele.id]);
            this.$set(ele, "isp", true);
          }
        });
        // console.log(this.goods);
      });
      // console.log(this.goods);
    }
    // console.log(this.goods);
    // console.log(this.id);
  },
  methods: {
    handleChange() {},
    jia(a) {
      this.goods[a].num++;
      connect.$emit("addshop", 1);
      shopcart.aou({
        id: this.goods[a].id,
        num: 1
      });
    },
    jian(a) {
      if (this.goods[a].num <= 1) return;
      this.goods[a].num--;
      connect.$emit("addshop", -1);
      shopcart.aou({
        id: this.goods[a].id,
        num: -1
      });
    },
    del(a) {
      let gg = this.goods[a];
      shopcart.del(gg.id);
      connect.$emit("addshop", -gg.num);
      this.goods.splice(a, 1);
    },
    bb() {
      let aa = this.id;
      let bb = shopcart.getprods();
      // console.log(bb);
      // console.log(aa);
      aa.forEach(ele => {
        // console.log(ele);
        // console.log(bb[ele]);
        user.aou({
          id: ele,
          num: bb[ele]
        });
      });
      this.goods = [];
      shopcart.qk();
      this.$router.go(0);
      let cc = user.getusers().shopcar;
      let dd = user.getusers().login;
      // console.log(cc);
      // console.log(dd);
      let ff = { cc, dd };
      // console.log(ff);
      this.$ajax
        .post("http://localhost:3000/addshop", "content=" + JSON.stringify(ff))
        .then(res => {
          // console.log(res.config.data);
          console.log(res);
        });
    }
  },
  computed: {
    count() {
      let num = 0;
      let price = 0;
      this.goods.forEach(ele => {
        // console.log(ele);
        if (ele.isp) {
          price += ele.num * ele.price;
          num += ele.num;
        }
      });
      return { num, price };
    }
  }
};
</script>

<style scoped>
ul li {
  list-style: none;
  height: 180px;
}
ul {
  padding: 0px;
}
img {
  width: 100px;
}
#a {
  margin-bottom: 50px;
  background-color: white;
}
#b {
  background-color: thistle;
}
#sp {
  border: 1px solid dimgray;
  width: 25px;
  text-align: center;
  display: inline-block;
}
#bu {
  height: 30px;
  width: 45px;
  padding: 1px;
}
#mt {
  float: left;
}
</style>

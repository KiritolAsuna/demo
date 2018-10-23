<template>
  <div id="div">
    <head-vue head="商品详情"></head-vue>
    <div>
      <mt-swipe :auto="4000" class='swipe'>
        <mt-swipe-item v-for="(img,index) in con.content_img" :key="index"><a href="#"><img :src="img"></a></mt-swipe-item>
      </mt-swipe>
    </div>
    <div id="a">
      <p id="as">{{con.zhaiyao}}</p>
      <span id="sp1">现价:{{con.price}}</span>
      <span id="sp2">原价:{{con.oldprice}}</span>
      <br />
      <span>购买数量:</span>
      <span class="span" @click="jian">-</span>
      <span class="span">{{num}}</span>
      <span class="span" @click="jia">+</span>
      <br />
      <button class="mui-btn mui-btn-success" @click="addshop">放入购物车</button>
    </div>
    <div id="b">
      <p>商品参数</p>
      <p>商品货号:{{con.idcoude}}</p>
      <p>库存情况:{{con.num}}</p>
      <p>上架时间:{{con.time}}</p>
    </div>
    <div id="c">
      <button @click="twxq" class="mui-btn mui-btn-danger">图文详情</button>
      <br />
      <button @click="sppl" class="mui-btn mui-btn-royal">商品评论</button>
    </div>
  </div>
</template>

<script>
import connect from "./connect.js";
import shopcart from "./shopcart.js";
export default {
  data() {
    return {
      id: "",
      con: [],
      num: 1,
      yx: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    this.$ajax.get("http://127.0.0.1:3000/phones/" + this.id).then(res => {
      this.con = res.data[0];
      //   console.log(this.con);
    });
  },
  methods: {
    jia() {
      if (this.num >= this.con.num) return;
      this.num++;
    },
    jian() {
      if (this.num <= 1) return;
      this.num--;
    },
    addshop() {
      // console.log("aa");

      connect.$emit("addshop", this.num);
      shopcart.aou({ id: this.con.id, num: this.num });
      // console.log(shopcart.getprods());
    },
    twxq() {
      let id = this.$route.params.id;
      // console.log(id);
      this.$router.push({ name: "gcontent", query: { id: id } });
    },
    sppl() {
      let id = this.$route.params.id;
      // console.log(id);
      this.$router.push({ name: "gpl", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 238px;
}
.mint-swipe img {
  height: 100%;
  width: 100%;
}
#div {
  margin-bottom: 50px;
}
#a {
  margin-top: 5px;
  padding: 5px;
  text-align: center;
  background-color: white;
  border: 1px solid #000;
}
#b {
  margin-top: 5px;
  padding: 5px;
  background-color: white;
  border: 1px solid #000;
}
#c {
  padding-left: 10px;
  padding-right: 10px;
  background-color: white;
  border: 1px solid #000;
}
#c button {
  width: 98%;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 24px;
}
#as {
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-align: center;
}
#sp1 {
  color: red;
  margin-right: 10px;
}
#sp2 {
  text-decoration-line: line-through;
}
.span {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 25px;
  margin-bottom: 5px;
}
#p {
  float: left;
}
</style>
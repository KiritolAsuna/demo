<template>
    <div id="aaa">
        <head-vue head="商品列表"></head-vue>
        <div class="mui-content" style="background-color:#fff" id="aa">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="isauto">
                <ul class="mui-table-view mui-grid-view" id="d">
                    <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for='item in data' :key="item.id" id="li">
                        <router-link :to="{name:'jpxq',params:{id:item.id}}">
                            <img class="mui-media-object" :src='item.img'>
                            <p id="as">{{item.zhaiyao}}</p>
                            <span id="sp1">¥:{{item.price}}</span>
                            <span id="sp2">¥:{{item.oldprice}}</span>
                            <br />
                            <span id="sp3">热卖中</span>
                            <span id="sp4">剩余:{{item.num}}</span>
                        </router-link>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
      data: [],
      allLoaded: false,
      isauto: false
    };
  },
  created() {
    this.loadmore();
  },
  methods: {
    loadBottom() {
      this.loadnext();
      // console.log("出发了");
    },
    loadmore() {
      this.$ajax
        .get("http://127.0.0.1:3000/phonesList/" + this.count)
        .then(res => {
          this.data = res.data;
          // console.log(this.data);
        });
    },
    loadnext() {
      this.count=this.count+6;
      this.$ajax
        .get("http://127.0.0.1:3000/phonesList/" + this.count)
        .then(res => {
          this.data = this.data.concat(res.data);
          // console.log(res.data);
          if(res.data.length<6)
          {
              this.allLoaded=true;
          }
          this.$refs.loadmore.onBottomLoaded();
        //   console.log(this.data);
        });
    }
  }
};
</script>

<style scoped>
#aaa{
  height: 772px;
  overflow: auto;
}
span {
  font-size: 14px;
}
#d {
  margin: 0px;
  padding: 5px;
}
#li {
  width: 48%;
  border: 3px solid #333;
  margin: 2px;
}
#aa {
  margin-bottom: 50px;
}
#as {
  font-weight: bold;
  color: black;
}
#sp1 {
  color: red;
  margin-right: 10px;
}
#sp2 {
  text-decoration-line: line-through;
}
#sp3 {
  color: red;
  margin-right: 10px;
}
#sp4 {
  color: red;
}
</style>
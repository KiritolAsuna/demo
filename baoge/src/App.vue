<template>
	<div>
		<mt-header title="我的项目"></mt-header>
		<router-view></router-view>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" :to='{name:"Home"}'>
				<span class="mui-icon icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" :to='{name:"huiyuan"}'>
				<span class="mui-icon icon-huiyuan"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" :to='{name:"gouwuche"}'>
				<span class="mui-icon icon-qicheqianlian-"><span class="mui-badge">{{nm}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" :to='{name:"chazhao"}'>
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
import connect from "./components/connect.js";
import shopcart from "./components/shopcart.js";
export default {
  data() {
    return {
      nm: shopcart.gettc()
    };
  },
  created() {
    connect.$on("addshop", num => {
      //   console.log(num);
      //   console.log("ji");
      this.nm = this.nm + num;
      //   console.log(this.nm);
    });
  }
};
</script>

<style>
</style>

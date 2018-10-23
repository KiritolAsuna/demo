<template>
	<div>
		<head-vue head="新闻"></head-vue>
		<ul class="mui-table-view">
			<li v-for="(news,index) in list.list" :key="index" class="mui-table-view-cell mui-media">
				<router-link :to='{name:"news",query:{id:index}}'>
					<div>
						<p v-text="news.title"></p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.$ajax.get("http://127.0.0.1:3000/news").then(res => {
      // console.log(res);
      this.list = res.data.result;
      console.log(this.list);
    });
  }
};
</script>

<style  scoped>
</style>

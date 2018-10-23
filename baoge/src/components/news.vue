<template>
    <div id="xinwen">
        <head-vue head="新闻详情页"></head-vue>
        <div id="tp" v-if="news.pic!==''?true:false">
            <img v-bind:src="news.pic" id="tp1">
        </div>
        <p id="biaoti">{{news.title}}</p>
        <p>新闻内容：{{news.content}}</p>
        <p>新闻时间：{{news.time}}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      id: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$ajax.get("http://127.0.0.1:3000/news").then(res => {
      // console.log(res);
      this.news = res.data.result.list[this.id];
      // console.log(this.news);
    });
  }
};
</script>

<style  scoped>
#tp {
  height: 90%;
  width: 100%; 
  text-align: center;
}
#tp1{
    height: 50%;
    width: 50%;
    min-width: 300px; 
}
#xinwen{
    padding-bottom: 50px;
}
#biaoti{
font-size:24px;
font-weight: bold;
line-height:30px;
color: #000000;
text-align: center;
}
</style>

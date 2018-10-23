<template>
  <div>
    <mt-swipe :auto="4000" class='swipe'>
      <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a href="#"><img :src="img.img"></a></mt-swipe-item> 
    </mt-swipe>
           <div>
               <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to='{name:"xinwen"}'>
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to='{name:"tupian",params:{id:0}}'>
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to='{name:"jingpin"}'>
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">精品展示</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to='{name:"liuyan"}'>
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to='{name:"chazhao"}'>
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">搜索资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to='{name:"lianxi"}'>
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul> 
		    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
         imgs:[],
     }
    },
    created(){
	this.$ajax.get('http://127.0.0.1:3000/lunbo')
			.then(res=>{this.imgs=res.data;})
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe{
	height: 190px;
}
.mint-swipe img{
	height: 100%;
	width: 100%;
}
.mui-table-view mui-grid-view mui-grid-9{
	background-color: white;
	border:0;
	margin-top: 0px;
}
.mui-table-view mui-grid-view mui-grid-9 li{
	border:0px;
}
 .mui-icon-home:before,.mui-icon-email:before ,.mui-icon-chatbubble:before,.mui-icon-location:before,.mui-icon-search:before,.mui-icon-phone:before{content: '';
}
.mui-icon-home{
	background-image: url('../assets/1.png');
	background-repeat: round;
}
.mui-icon-email{
	background-image: url('../assets/2.png');
	background-repeat: round;
}
.mui-icon-chatbubble{
	background-image: url('../assets/3.png');
	background-repeat: round;
}
.mui-icon-location{
	background-image: url('../assets/4.png');
	background-repeat: round;
}
.mui-icon-search{
	background-image: url('../assets/5.png');
	background-repeat: round;
}
.mui-icon-phone{
	background-image: url('../assets/6.png');
	background-repeat: round;
}
.mui-icon{
	height: 50px;
	width: 50px;
}
</style>

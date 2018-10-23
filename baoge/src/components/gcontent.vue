<template>
    <div id="a">
        <head-vue head="图文详情"></head-vue>
        <div class="mui-card-header">{{good.title}}</div>
        <div class="mui-card-header mui-card-media">
            <li class="ab" v-for='(i,index) in good.content_img' :key='index'>
                <img class='pic' :src="i" alt="">
            </li>
        </div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>{{good.zhaiyao}}</p>

                <div style="color: #333;white-space: pre-wrap" v-text='good.content'></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      good: []
    };
  },
  created() {
    this.$ajax.get("http://127.0.0.1:3000/phones/" + this.id).then(res=>{
        this.good=res.data[0];
    })
  }
};
</script>

<style scoped>
.pic {
  width: 50% !important;
  height: 50% !important;
}
.ab {
  text-align: center;
}
#a{
    margin-bottom: 40px;
}
</style>
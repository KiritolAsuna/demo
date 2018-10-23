<template>
  <div>
    <head-vue head="图片分享"></head-vue>
    <div>
      <ul id="ul">
        <li id="li" v-for="(li,index) in list" :key="index">
          <router-link :to="{name:'tupian',params:{id:li.id}}"><a @click='tz(index)'>{{li.title}}</a></router-link>
        </li>
      </ul>
    </div>
    <div id="d1">
      <ul id="ul1" v-for="cont in ct" :key="cont.id">
        <li id="li1" v-for="(p,id) in cont.names" :key="id">
          <p id="p1">{{p.name}}</p>
          <router-link :to="{name:'tpxq',params:{id:cont.id,ids:id,name:p.name}}"><img id="img" v-lazy="p.pic[0]" :src='p.pic[0]'></router-link>
          <p id="p">{{p.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      ct: []
    };
  },
  methods: {
    tz(index) {
      this.$ajax.get("http://127.0.0.1:3000/dm_list/" + index).then(res => {
        // console.log(res);
        this.ct = [];
        this.ct = res.data;
        // console.log(this.ct);
      });
    }
  },
  created() {
    let id = this.$route.params.id;
    // console.log(this.id);
    this.$ajax.get("http://127.0.0.1:3000/dm_list").then(res => {
      // console.log(res);
      this.list = res.data;
      // console.log(this.list);
    });
    this.tz(id);
  },
  updated: function() {},
  computed: {}
};
</script>

<style scoped>
ul li {
  list-style-type: none;
}
#ul {
  margin: 0px;
  padding: 0px;
  white-space: nowrap;
  overflow: auto;
}
#li {
  display: inline-block;
  margin-right: 10px;
  height: 30px;
  font-size: 20px;
  padding-top: 5px;
}
#ul1 {
  margin: 0px;
  padding: 0px;
}
#img {
  min-width: 150px;
  width: 100%;
  min-height: 150px;
  height: 100%;
}
#p {
  background-color: floralwhite;
  color: black;
}
#p1 {
  padding: 0px;
  margin: 0px;
  color: black;
  position: absolute;
  background-color: aliceblue;
}
#d1 {
  width: 100%;
  position: absolute;
  margin-bottom: 50px;
}
#li1 {
  position: relative;
}
</style>

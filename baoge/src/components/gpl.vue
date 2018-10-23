<template>
  <div>
    <head-vue head="商品评论"></head-vue>
    <pl-vue :cid='$route.query.id'></pl-vue>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // console.log(this.id);
  }
};
</script>

<style scoped>
</style>
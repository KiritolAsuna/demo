<template>
	<div>
		<header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="houtui"></a>
			<h1 class="mui-title">{{head}}</h1>
		</header>
	</div>
</template>

<script>
export default {
  name: "header1",
  props: ["head"],
  methods: {
    houtui() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.mui-bar {
  position: static;
}
</style>

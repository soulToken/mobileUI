<template>
<div >
<img :src="img" alt="" style="width:100%;">
</div>
  
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      img: require("../assets/images/4.png")
    };
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity_content {
  width: 100%;
}
.activity_content img {
  width: 100%;
  display: block;
}
</style>


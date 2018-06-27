<template>
    <div class="container">
        <img :src="img" style="width:100%;" alt="">
    </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      img: require("../../assets/images/noFound.png")
    };
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f8faf9;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
</style>


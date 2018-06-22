<template>
<div>
<div class="activity_content">
      <img :src="items[0].src" alt="">
</div>
<div class="activity_content" style="position:relative;">
      <img :src="items[1].src" alt="">
      <a href="javascript:;" style="position:absolute;right:6.67%;top:12.8%;width:25.33%;height:5%;" @click="onClickOne"></a>
      <a href="javascript:;" style="position:absolute;right:6.67%;top:25.04%;width:25.33%;height:5%;" @click="onClickTwo"></a>
</div>
</div>
  
</template>
<script>
import { Search } from "vant";
import { Button } from "vant";
import { Toast } from "vant";
import { searchClient } from "../api/api";
import { Actionsheet } from "vant";
//   import * as api from "../api/api";

export default {
  name: "HelloWorld",
  data() {
    return {
      items: [
        {
          src: require("../assets/images/1.png")
        },
        {
          src: require("../assets/images/2.png")
        }
      ]
    };
  },
  mounted() {},
  computed: {},
  methods: {
    onClickOne() {
      this.$router.push({ name: "Package1" });
    },
    onClickTwo() {
      this.$router.push({ name: "Package2" });
    },
    onClickThree(item) {
      Toast(item.name);
    },
    shower() {
      this.show = true;
    }
  }
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


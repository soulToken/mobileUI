<template>
<div>
<div style="width:100%;padding-bottom:10px;" v-if="html">
    <img :src="clisPic" alt="" style="width:100%;display:block;" @click="showPic">
    <span style="  margin-left:10px;color:red;">￥</span><span v-html="clisPrice" class="price"></span>
    <br/>
    <span v-html="clisName" class="name"></span>
</div>


<div style="background:#f8f8f8;text-align:center;line-height:40px;height:40px;color:#929292;" v-if="html">
    ---------服务详情----------
</div>
<div v-html="html" style="padding-left:10px;padding-right:10px;" v-if="html">
</div>
<van-popup v-model="show">
  <van-loading type="spinner" color="white" />
</van-popup>

<p v-if="!html"  style="position:absolute;top:50%;text-align:center;width:100%">
  暂无相关数据
</p>


</div>
  
</template>
<script>
import { Search } from "vant";
import { Button } from "vant";
import { Toast } from "vant";
import { getServiceDetail } from "../api/api";
import { Actionsheet } from "vant";
import { Card } from "vant";
import { Popup } from "vant";
import { Loading } from "vant";
import { ImagePreview } from "vant";

export default {
  name: "HelloWorld",
  data() {
    return {
      getServiceDetail: getServiceDetail,
      html: "",
      message: "",
      clisName: "",
      clisPic: "",
      clisPrice: "",
      show: true
    };
  },
  created() {
    console.log(this.$route.query.id);
    var self = this;
    var params = {
      serverItemId: this.$route.query.id || "1"
    };
    this.getServiceDetail(params)
      .then(function(data) {
        self.show = false;
        if (data.data.resultCode == "1000") {
          self.html = data.data.result.serverDetail;
          var result = data.data.result;
          self.clisName = result.clisName;
          self.clisPic = result.clisPic;
          self.clisPrice = result.clisPrice;
        }
      })
      .catch(function() {
        self.show = false;
      });
  },
  mounted() {},

  methods: {
    showPic() {
      //     ImagePreview([
      //       this.clisPic
      // ]);
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
.price {
  line-height: 40px;
  font-size: 26px;
  color: red;
  margin-top: 10px;
}
.name {
  margin-left: 10px;
  line-height: 20px;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>


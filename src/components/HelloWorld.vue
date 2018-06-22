<template>
  <div>
    <!-- 搜索查找 -->
    <van-search v-model="value" show-action @search="onSearch">
      <div slot="action" @click="onSearch" style="padding-left:10px;padding-right:10px;text-align:center;">搜索</div>
    </van-search>


<icon name="创建任务模板" width="20px" height="20px"></icon> 

      <cube-button @click="showDialog">show dialog</cube-button>
    <!-- 按钮
 <van-button size="large" style="position:absolute;bottom:0;left:5%;width:90%;">新增机构</van-button> -->
    <!-- 查找列表 -->
    <van-cell-group>
      <van-cell v-if="item.provice&&item.clinicName&&items.length&&items.length>0" v-for="(item,index) in items" :label="item.area"
        :title="item.clinicName" is-link :key="item.id" @click="goWhere(index,item)" />
      <van-cell v-if="items.length==0&&none" style="text-align:center;!important" value="暂无当前诊所" />
    </van-cell-group>
    <!-- 弹出层 -->
    <van-popup v-model="show" :close-on-click-overlay="false">
      <van-loading type="spinner" color="white" />
    </van-popup>
  </div>
</template>
<script>
import { Search } from "vant";
import { Button } from "vant";
import { Toast } from "vant";
import { searchClient,mock } from "../api/api";
// import {
//   /* eslint-disable no-unused-vars */
//   Style,
//   Button
// } from 'cube-ui'
import * as api from "../api/api";

export default {
  name: "HelloWorld",
  data() {
    return {
      value: "",
      items: [],
      show: false,
      api: api,
      searchClient: searchClient,
      none: false
    };
  },
  mounted() {
       mock().then(function(res){
           console.log(res.data)
       })
  },
  computed: {},
  methods: {
    onSearch() {
      var self = this;
      if (!this.value.trim()) {
        Toast("请先输入机构名称在查找哦");
        return;
      }
      const params = {
        clinicName: this.value.trim()
      };
      this.show = true;
      this.searchClient(params)
        .then(function(res) {
          self.show = false;
          if (res.data) {
            self.items = [res.data];
          } else {
            Toast("没有查找到该诊所");
          }
        })
        .catch(function(res) {
          self.show = false;
          Toast("网络错误");
        });
    },
    goWhere(index, item) {
      if (item) {
        window.localStorage.setItem("params", JSON.stringify(item));
      }
      this.$router.push({
        name: "vans",
        params: item
      });
    },
  //cube-ui 框架
     showDialog() {
        this.$createDialog({
          type: 'alert',
          title: 'Alert',
          content: 'dialog content'
        }).show()
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-popup {
  background: rgba(0, 0, 0, 0.7);
}
</style>


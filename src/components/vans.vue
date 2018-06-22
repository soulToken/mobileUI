<template>
  <div>
    <van-nav-bar title="机构信息修改" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-panel title="机构头像:" desc="点击图标修改或上传头像" status="">
      <div style="padding:10px;position:relative;">
        <!-- <van-button type="default" style="position:absolute;left:10px;top:10px;">点击修改</van-button>  -->
        <!-- <img   v-if="picUrl" :src="picUrl" alt="" style="width:100px;height:100px;padding:10px;border:1px solid #eee; border-radius:10px;position:absolute;left:10px;top:55px;" @click="showHeadUrl"> -->

        <!-- 上传图片 -->
        <!-- <van-uploader :after-read="onRead" style="position:absolute;left:10px;top:10px;width:88px;height:45px;">
      <van-icon name="photograph" />
    </van-uploader> -->
        <el-upload class="upload-demo" :action="upLoadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList1"
          :on-success="handleSuccess" :limit="1" :on-exceed="handleExceed" list-type="picture">
          <el-button size="small" type="primary">点击上传头像</el-button>
        </el-upload>

      </div>
    </van-panel>

    <van-popup v-model="show" position="bottom">
      <div>
        <van-datetime-picker v-model="currentDate" type="time" :min-hour="minHour" :max-hour="maxHour" />
      </div>
    </van-popup>

    <!-- 时间选择器 -->
    <van-popup v-model="TimeShow" position="bottom">
      <div style="position:relative;">
        <p style="position:absolute;text-align:center;top:140px;width:100%;">---</p>
        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onTimeChange" />
      </div>
    </van-popup>
    <van-cell-group>
      <!-- 单元格营业时间 -->
      <van-cell title="营业时间:" :value="yingyeTime" @click="chooseTime" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="phoneNumber" label="机构联系方式:" placeholder="请输入机构联系方式" type="number" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="telNumber" label="个人联系方式:" placeholder="暂不可修改个人联系方式" type="number" disabled />
    </van-cell-group>
    <!-- 诊所介绍 -->
    <van-cell-group>
      <van-field v-model="clinicIntroduce" label="机构介绍:" type="textarea" placeholder="请输入诊所介绍" rows="2" autosize />
    </van-cell-group>

    <van-panel title="机构环境:" desc="点击图标修改或上传机构" status="">
      <div style="min-height:45px;padding:10px;position:relative;">
        <!-- 上传图片 -->
        <!-- <van-button type="default" style="position:absolute;left:10px;top:10px;">上传环境图片</van-button> 
      <van-uploader :after-read="mechanism" multiple style="position:absolute;left:10px;top:10px;width:116px;height:45px;">
        <van-icon name="photograph" />
      </van-uploader> -->
        <el-upload class="upload-demo" :action="upLoadUrl" :on-preview="handlePreview2" :on-remove="handleRemove2" :file-list="fileList2"
          :on-success="handleSuccess2" :limit="9" :on-exceed="handleExceed2" :multiple="true" list-type="picture">
          <el-button size="small" type="primary">点击上传机构环境图片</el-button>
        </el-upload>


      </div>
      <!-- <div v-if="picUrlArr&&picUrlArr.length">
          <img :src="item"  v-for="(item,index) in picUrlArr" alt="" style="width:32%;height:100px;border:1px solid #eee; border-radius:10px;" @click="showEnvient(index)">
    </div> -->

    </van-panel>
    <van-button type="default" size="large" style="width:90%;margin-left:5%;margin-top:10px;margin-bottom:20px;" @click="submit">提交</van-button>

    <van-popup v-model="showTip" :close-on-click-overlay="false">
      <van-loading type="spinner" color="white" />
    </van-popup>

  </div>
</template>
<script>
import { Cell, CellGroup, Icon, Badge } from "vant";
import { Toast } from "vant";
import { CellSwipe } from "vant";
import { Field } from "vant";
import { ImagePreview } from "vant";
import { upLoadUrl } from "../api/api";
import { changeMessage } from "../api/api";

const citys = {
  "8:00": [
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "8:30": [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "9:00": [
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "9:30": [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "10:00": [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "10:30": [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "11:00": [
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "11:30": [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "12:00": [
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "12:30": [
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "13:00": [
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "13:30": [
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "14:00": [
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "14:30": [
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "15:00": [
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "15:30": [
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "16:00": [
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "16:30": [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "17:00": [
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "17:30": [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "18:00": [
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00"
  ],
  "18:30": ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
  "19:00": ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
  "19:30": ["20:00", "20:30", "21:00", "21:30", "22:00"],
  "20:00": ["20:30", "21:00", "21:30", "22:00"],
  "20:30": ["21:00", "21:30", "22:00"],
  "21:00": ["21:30", "22:00"],
  "21:30": ["22:00"]
};
export default {
  // components: {
  //   [Cell.name]: Cell,
  //   [CellGroup.name]: CellGroup,
  //   [Icon.name]: Icon,

  // },
  data() {
    return {
      upLoadUrl: upLoadUrl,
      activeKey: 0,
      show: false,
      picUrl: "",
      clinicIntroduce: "",
      phoneNumber: "", //诊所联系方式
      telNumber: "", //个人联系方式
      picUrlArr: [],
      currentDate: "12:00",
      minHour: 5,
      maxHour: 25,
      TimeShow: false,
      allData: {},
      openingStart: "", //开始时间
      openingEnd: "", //结束时间
      changeMessage: changeMessage,
      columns: [
        {
          values: Object.keys(citys),
          className: "column1"
        },
        {
          values: citys["8:00"],
          className: "column2",
          defaultIndex: 10
        }
      ],
      fileList1: [],
      fileList2: [],
      showTip: false,
      citys: citys
    };
  },
  created() {
    var self = this;
    if (
      Object.keys(this.$route.params) &&
      Object.keys(this.$route.params).length != 0
    ) {
      this.allData = this.$route.params;
    } else {
      if (window.localStorage.getItem("params")) {
        this.allData = JSON.parse(window.localStorage.getItem("params"));
      } else {
        this.$router.push({
          name: "HelloWorld",
          params: {
            id: "1111"
          }
        });
        return;
      }
    }
    //头像
    this.fileList1 = [
      {
        name: "头像",
        url: this.allData.headUrl
      }
    ];
    this.picUrl = this.allData.headUrl;
    this.phoneNumber = this.allData.edtPhone;
    this.telNumber = this.allData.mobile;
    this.clinicIntroduce = this.allData.clinicIntroduce;
    this.openingHours = this.allData.openingHours;
    if (
      this.allData.clinicEnvironmentPic &&
      this.allData.clinicEnvironmentPic.length
    ) {
      this.allData.clinicEnvironmentPic.forEach(function(item, index) {
        self.fileList2.push({
          name: "图片" + index + 1,
          url: item
        });
      });
    }
  },
  computed: {
    // 计算属性的 getter
    yingyeTime: function() {
      // `this` 指向 vm 实例
      if (!this.openingEnd || !this.openingEnd) {
        if (this.openingHours) {
          return this.openingHours;
        }
        return "暂无";
      }
      return this.openingStart + "--" + this.openingEnd;
    }
  },
  methods: {
    onClick(key) {
      this.activeKey = key;
    },
    shower() {
      this.show = true;
    },
    onChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      Toast("我是提示文案，建议不超过十五字~");
    },
    onRead(file) {
      this.picUrl = file.content;
      // Toast(file);
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
    //点击返回
    onClickLeft() {
      //点击返回的时候移除 存储的localstorage
      window.localStorage.removeItem("params");
      this.$router.push({
        name: "HelloWorld",
        params: {
          id: "1111"
        }
      });
    },
    //点击按钮
    onClickRight() {
      Toast("按钮");
    },
    //机构环境图片上传
    mechanism(file) {
      var self = this;
      if (!file.length && file.content) {
        self.picUrlArr.push(file.content);
        return;
      }
      file.forEach(function(item) {
        self.picUrlArr.push(item.content);
      });
    },
    //显示头像
    showHeadUrl() {
      var arr = [this.picUrl];
      ImagePreview(arr);
    },
    //显示环境图片
    showEnvient(index) {
      ImagePreview(this.picUrlArr, index);
    },
    //选择时间
    chooseTime() {
      // this.show=true;
      // 点击时间选择是 回显时间
      var start = 0,
        end = 0;
      if (this.openingHours) {
        var open = this.openingHours.split("—");
        start = _.indexOf(Object.keys(this.citys), open[0]);
        end = _.indexOf(this.citys[open[0]], open[1]);
        this.columns = [
          {
            values: Object.keys(this.citys),
            className: "column1",
            defaultIndex: start
          },
          {
            values: this.citys[open[0]],
            className: "column2",
            defaultIndex: end
          }
        ];
      }
      this.TimeShow = true;
    },
    onConfirm(value, index) {
      this.openingStart = value[0];
      this.openingEnd = value[1];

      this.TimeShow = false;
    },
    onCancel() {
      this.TimeShow = false;
    },
    //时间改变
    onTimeChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      var arr = [file.url];
      ImagePreview(arr);
    },
    handleSuccess(response, file, fileList) {
      this.picUrl = response.imgUrl;
    },
    handleExceed() {
      Toast("只可以上传一张图片");
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview2(file) {
      var img = file.response.imgUrl;
      var index = _.indexOf(this.picUrlArr, img);
      ImagePreview(this.picUrlArr, index);
    },
    handleSuccess2(response, file, fileList) {
      var self = this;
      this.picUrlArr = [];
      fileList.forEach(function(item) {
        if (item.response && item.response.imgUrl) {
          console.log(item.response.imgUrl);
          self.picUrlArr.push(item.response.imgUrl);
        }
      });
    },
    handleExceed2() {
      Toast("最多上传九张图片哦");
    },
    cannotChange() {},
    submit() {
      var self = this;
      var params = {
        headUrl: this.picUrl,
        openingStart: this.openingStart,
        openingEnd: this.openingEnd,
        edtPhone: this.phoneNumber,
        mobile: this.telNumber,
        clinicIntroduce: this.clinicIntroduce,
        clinicEnvironmentPic: this.picUrlArr.join(","),
        id: this.allData.id
      };
      this.showTip = true;
      this.changeMessage(params)
        .then(function() {
          Toast("提交成功");
          self.showTip = false;
        })
        .catch(function() {
          self.showTip = false;
        });
    }
  }
};
</script>
<style>

</style>


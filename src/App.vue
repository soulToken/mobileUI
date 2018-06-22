<template>
  <div id="app">
     <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app'
};
</script>
<style>
*{
  margin:0;
  padding:0;
}
html,body{
  height:100%;
  width:100%;
}
.van-cell__title .van-icon {
  font-size: 18px;
}
.van-popup{
  background:rgba(0,0,0,.7)
}
.van-field__control{
  text-indent: 12px;
}
.van-search__action{
  line-height: 45px;
}
</style>

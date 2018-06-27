import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      count: 0,
      //登录信息
      loginInfo:''
    },
    mutations: {
      increment (state) {
        state.count++
      },
      //存储用户信息的数据
      setLoginInfo (state,data){
        window.localStorage.setItem("loginInfo", data);
        state.loginInfo=data;
      },
      //删除用户信息
      removeLoginInfo(){
          window.localStorage.removeItem("loginInfo");
          state.loginInfo=""
      }
    },
    getters:{
        loginInfo(state){
            if(!state.loginInfo){
                state.loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'))
            }
            return state.loginInfo
        }
    },
  })
  export default store
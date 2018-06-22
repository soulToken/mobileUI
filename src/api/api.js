import axios from 'axios';

// 这边是所有的请求接口的配置文件，不同环境修改 这个 base 就好了， 包括正式环境 也是修改 这里面（在这里测试一下 登录接口， 我随便用了之前项目的一个接口）  下面的都是 promise 语法，在其他组件里面调用就行了
// let base='http://192.168.1.55:8080/apis'
// let base="http://13.250.177.118/ManagerServer"
// let base="/apis"
// let base="http://clinic.100care.cn"
// let base="http://192.168.0.119:8080"
let base="/apis"

export const searchClient = params => { return axios.post(`${base}/100care_manage/manage/clinic/queryForApp`,  params); };

export const changeMessage = params => { return axios.post(`${base}/100care_manage/homepage/clinic/updateForPhone`, params); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
//服务详情
export const getServiceDetail = params => { return axios.post(`${base}/100care_server/clinicserviceitem/serverDetail`, params); };

export const mock = params => { return axios.get(`${base}/msg`, { params: params }); };

export const upLoadUrl = `${base}/100care_manage/homepage/clinic/uploadimage`;
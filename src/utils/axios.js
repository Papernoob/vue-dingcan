import axios from 'axios'
export default axios.create({
  baseURL: 'http://127.0.0.1:3000/api/',
  timeout: 15000, // 请求超时uploadBuildExcel
  responseType: 'json',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  // },
})
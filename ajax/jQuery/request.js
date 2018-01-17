import jq from 'jquery';
const API_URL = '/'; //baseurl

const api = {
   getlist : 'api/getlist',//获取列表
};
var  request = {
    get(path,sendData) {
      return new Promise((resolve, reject) => {
         jq.ajax({
            url:`${API_URL}/${path}`,
            data : sendData || {}
         }).then(res => {
           let response;
           try {
             response = JSON.parse(res);
           } catch (e) {
             response = res;
           }
            if (response.status === 200) {
              return response;
            } else if(response.status === 500) {
              let errors = `请求出现异常${response.status}`
              throw errors
            }
          })
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err)
          });
      });
    },
    post(path,sendData) {
      return new Promise((resolve, reject) => {
         jq.ajax({
            url:`${API_URL}/${path}`,
            type : 'post',
            data : sendData || {}
         }).then(res => {
            if (res.status === 200) {
              let data;
              try {
                data = JSON.parse(res.data);
              } catch (e) {
                data = res.data;
              }
              return data;
            } else if(res.status === 500) {
              let errors = `${res.status}, ${res.statusText}`
              throw errors
            }
          })
          .then(json => {
              resolve(json);
          })
          .catch(err => {
              reject(err);
          });
      });
    },
}
export {request,api};

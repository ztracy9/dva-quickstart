import fetch from 'dva/fetch';

function parseJSON(response) {
  return  response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    /*const token = response.headers.get('access-token');
    if (token) {
      console.log('token: '+token);
      sessionStorage.setItem('access_token', token);
    }*/
    return response;
  }
  return response;
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
//这里传过来的body一定是JSON.stringfy后的字符串才行
export default function request(url,body) {
  return fetch(url,{
    method:'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Token': sessionStorage.getItem('access_token') || '', // 从sessionStorage中获取access tokeness
      'Access-IsAdmin':sessionStorage.getItem('isAdmin')||'',
      'User-Id':sessionStorage.getItem('userId')||'',
      'Get-Avartar':sessionStorage.getItem('avatar')||''
    },
    body
  })
    .then(checkStatus)
    .then(parseJSON)
    .then( (data) => {
      if(url=='http://localhost:8080/order/add')
        return data;
      let t = data.data.token;
      if(t){
        sessionStorage.setItem('access_token', data.data.token);
        sessionStorage.setItem('avatar',"http://localhost:8080"+data.data.data.avatar);
        sessionStorage.setItem('userId',data.data.data.id);
        if(data.data.data.isAdmin){
          sessionStorage.setItem('isAdmin','true');
        }
        else
          sessionStorage.setItem('isAdmin','false');
      }
      return data.data.data;
    })
    .catch(err => ({ err }));
}

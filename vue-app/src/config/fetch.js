import { baseUrl } from './env'

const serialize = (ob) => {
  let output = '';
  for (var k in ob) {
    output += encodeURIComponent(k) + '=' + encodeURIComponent(ob[k]) + '&'
  }
  return output.replace(/&$/, '');
}

function interceptor(resp) {
  //通用拦截处理
  const status = resp.status;
  console.log(resp,666666666)
  let err = resp.headers.get('x-hpx-error-desc');
  err = decodeURIComponent(err);
  if(status >= 200 && status < 300){
    	return resp;
  }else{
	if(status == 400){//bad request
		console.log(err)
      	throw err;
    }else if(status == 401){//未认证
      	throw err;
    }else if(status == 403){//没有权限
      	throw err;
    }else if(status >= 500){
		err = decodeURIComponent( resp.headers.get('x-error-alert'))
		
		throw err;
    }
  }
}

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	// url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'FORM') {
			requestConfig.method = 'POST';
			requestConfig.headers = {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
			Object.defineProperty(requestConfig, 'body', {
				value: serialize(data)
			})
		}
		
		if(type == 'POST' || type == 'PATCH' || type == 'PUT'){
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		const response = await fetch(url, requestConfig);
		return interceptor(response);
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);
			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
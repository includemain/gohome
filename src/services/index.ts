import { request } from '@umijs/max';

// 文件转化为Blob
export const toBlob = (val: any, headers?: any) =>
    toString?.call(val) === '[object Blob]' ? val : new Blob([val], {type: headers['content-type']});

export const download = async(response: any) => {
    let {data, headers} = response;

    const fileName = response.headers['content-disposition'];
    const CFilename = decodeURIComponent(fileName)?.split(`utf-8''`)

  console.log('xxx-window.navigator', window.navigator)
  // 检测是否为 IE 浏览器
  if (window.navigator && window.navigator?.msSaveBlob) {
    // 使用 IE 的 msSaveBlob 方法
    const blob = new Blob([data], { type: headers['content-type'] });
    window.navigator?.msSaveBlob(blob, CFilename?.[1] || 'downloaded-file');
  } else {
    const blob = toBlob(data, headers);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.download = CFilename?.[1]

    link.href = URL.createObjectURL(blob); // 创建下载的链接
    document.body.appendChild(link);
    link.click(); // 点击下载
    document.body.removeChild(link); // 完成移除元素
    window.URL.revokeObjectURL(link.href); // 释放blob对象
  }
    return response.status === 200 ? Promise.resolve(response.data)  : Promise.reject(response.data)
};

// 营销环境调用以存储cookie
export async function ssoLogin(
    params: {
          loginStrategy:string,
          marketingToken:string,
          tokenDomain:string,
    },
  ) {
    return request<API.Response<any>>('/rest/uni/sso/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    });
  }
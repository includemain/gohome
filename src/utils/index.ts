/*
 * @Author: dong_xueou d1124717813@163.com
 * @Date: 2024-12-11 09:00:02
 * @LastEditors: wangtao wangtao@bjblackhole.com
 * @LastEditTime: 2025-01-13 11:32:20
 * @FilePath: /csibs-fontend/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cookies from 'js-cookie';
import {LayoutEnv} from '@/constants'
// ie11不支持localStorage
export const getLocalItem = (item: string) => {
  return Cookies.get(item);
};

export const setLocalItem = (item: string, value: string) => {
  return Cookies.set(item, value);
};

export const getCustomerId = (tabKey: string) => {
  try {
    const customerStr = Cookies.get(tabKey);
    const { customerId = '' } = JSON.parse(customerStr || '{}');
    return customerId;
  } catch (error) {
    Cookies.remove(tabKey);
  }
  return '';
};

// export const getLocalItem = (item: string) => {
//       return sessionStorage.getItem(item)
//   }

//   export const setLocalItem = (item: string, value: string) => {
//       return sessionStorage.setItem(item, value);
//   }

//   export const getCustomerId = () => {
//       try {
//           const customerStr =sessionStorage.getItem('customerId')
//           const { customerId = '' } = JSON.parse(customerStr || '{}')
//           return customerId
//         } catch (error) {
//           sessionStorage.removeItem('customerId');
//         }
//         return ''
//   }

export function isIE() {
  return /MSIE|Trident/.test(navigator.userAgent);
}
export const timeDay = (decimal: any) => {
  const day = new Date(decimal)
  const year = day.getFullYear()
  const month = ('0' + (day.getMonth() + 1)).slice(-2);
  const date = ('0' + day.getDate()).slice(-2);
  return year + '-' + month + '-' + date
};
//时间戳转化年月日时分秒
export const timeDayMinute = (decimal: any) => {
  const day = new Date(decimal)
  const year = day.getFullYear()
  const month = ('0' + (day.getMonth() + 1)).slice(-2)
  const date = ('0' + day.getDate()).slice(-2)
  const hour = ('0' + day.getHours()).slice(-2)
  const minute = ('0' + day.getMinutes()).slice(-2)
  const second = ('0' + day.getSeconds()).slice(-2)
  return year + '-' + month + '-' + date + ' ' + '' + hour + ':' + minute + ':' + second
};

//时间戳转化年月日时分
export const timeDayHour = (decimal: any) => {
  const day = new Date(decimal)
  const year = day.getFullYear()
  const month = ('0' + (day.getMonth() + 1)).slice(-2)
  const date = ('0' + day.getDate()).slice(-2)
  const hour = ('0' + day.getHours()).slice(-2)
  const minute = ('0' + day.getMinutes()).slice(-2)
  return year + '-' + month + '-' + date + ' ' + '' + hour + ':' + minute
};

// 遇到有跳转地址的地方，使用这个作为host地址

export const getOriginUrl = () => {
  if (process.env.UMI_APP_LAYOUT === LayoutEnv.yx) {
    const prodYxOrigin = location.protocol === 'http:' ? '//csoip.chinaamc.com:6300' : '//csoip.chinaamc.com'
    const originUrl = 'test' === process.env.MODE
        ? "//csoip.chinaamc.com:8005"
        : prodYxOrigin

    return originUrl
  }else {
    return location.origin
  }
}

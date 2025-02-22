// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}
// 处理千分符号
export function addThousandSeparator(str) {
  if (typeof str === 'undefined' || str === '' || str === null) return '';
  let numberStr = String(str);
  // console.log('xxx-numberStr', numberStr);
  // 处理负号
  let negative = numberStr.startsWith('-');
  if (negative) {
    numberStr = numberStr.substring(1);
  }

  // 分离小数部分和整数部分
  let [integerPart, decimalPart] = numberStr.split('.');

  // 给整数部分添加千分位符号
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // 组合整数部分和小数部分
  let result = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

  // 如果是负数，添加负号
  if (negative) {
    result = `-${result}`;
  }

  return result;
}

// 将url参数字符串转换为对象并进行,最终得到json字符串，通过header传给后端
/**
 * queryString: custid=xxx&type=转热狗&dd=aa
 */

export function parseQueryString(queryString: string) {
  let params = {};
  queryString.split('&').forEach(param => {
      let [key, value] = param.split('=');
      // 只对值进行 URL 编码，不对 key 编码
      params[key] = encodeURIComponent(value);
  });
  return params;
}
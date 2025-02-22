// 运行时配置
import '@/style/index.less';
import { getCookie, setCookie } from '@/utils/cookie';
import { isIE } from '@/utils/index';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React from 'react';
import type { RequestConfig } from 'umi';
dayjs.locale('zh-cn');
moment.locale('zh-cn');
dayjs.locale('zh-cn');
import customizeRenderEmpty from '@/components/customizeRenderEmpty';
import { LayoutEnv } from '@/constants/index'
import {setLocalItem}  from '@/utils/index'
// 判断是否为IE浏览器,如果是ie，额外加载less文件

if (isIE()) {
  import('@/style/ie-polyfill.less');
}

// 两边ifream嵌套试试，解决cookie被拦截
Promise.resolve(() => {
  window.document.domain = 'chinaamc.com'
})

window.addEventListener('message', (value) => {
  let data = value.data;
  for (let i in data) {
    setCookie(i, data[i]);
  }

  // 设置iframe统一源
  let domain = getCookie('DOMAIN') || '';
  if (domain) document.domain = domain;

  // 设置屏幕缩放比
  let zoom = getCookie('ZOOM') || 1;
  let style: any = document.body.style;
  style.zoom = zoom;

  // 获取页面body宽高，并存储到本地，直接获取不到，只能添加id，
  document.body.setAttribute('id', 'body');
  let body: any = document.getElementById('body');
  // localStorage.setItem("bodyWidth", body.offsetWidth);
  // localStorage.setItem("bodyHeight", body.offsetHeight);
});

export const layout = () => {
  return {
    fixSiderbar: true,
    layout: 'top',
    splitMenus: false,
    navTheme: 'light',
    contentWidth: 'Fixed',
    colorPrimary: '#1677FF',
    footerRender: false,
    menuHeaderRender: false,
    fixedHeader: false,
    logo: false,
    title: false,
    contentStyle: { padding: 0 },
    headerRender:
      process.env.NODE_ENV === 'development' && !isIE() ? true : false,
    locale: false,
  };
};

// proComponnet中，要兼容chome88一下浏览器，需要配置这个
export function rootContainer(container: React.ReactElement) {
  return React.createElement(
    StyleProvider,
    {
      hashPriority: 'high',
      transformers: [legacyLogicalPropertiesTransformer],
    },
    React.createElement(
      ConfigProvider,
      {
        autoInsertSpaceInButton: false,
        locale: zhCN,
        renderEmpty: customizeRenderEmpty,
      },
      container,
    ),
  );
}

// 乾坤生命周期
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('seat-bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('seat-mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('seat-unmount', props);
  },
};

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

const ErrorMsg = {
  9901: '没有权限请登录',
};
// url前缀
const baseUrl = process.env.UMI_APP_LAYOUT === LayoutEnv.yx ? '/sub-cs' : '';

// 运行时配置
export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 60000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      // 优先使用接口message提示
      if (!error?.config?.skipErrorHandler) {
        const errorCode = error.code;
        const msg = error.errData?.message || '';
        message.error(ErrorMsg[errorCode] || msg || '服务异常');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config) => {
      // 拦截请求配置，每个接口，将url厂商给的参数透传给后端
      const hash = window.location.hash || '';
      const paramsString = hash.split('?')[1] || '';
      const params = new URLSearchParams(paramsString);
      const searchParams = Object.fromEntries(params);
      const jsonString = JSON.stringify(searchParams)
      config.headers['Csibs-Query'] = encodeURIComponent(jsonString)
      config.url = baseUrl + config.url
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data, config } = response;
      // 9901这里不确定是否有用
      if (data.code === 9901) {
        window?.parent?.postMessage({ info: 'reLogin' }, '*');
      }

      // 为true时跳过错误拦截，可全局搜索skipErrorHandler查看使用方式
      if (data.code !== '0000' && !config.skipErrorHandler) {
        return Promise.reject({
          code: data.code,
          errData: data,
        });
      }

      return response;
    },
  ],
};


// 在营销和开的户运营中，开局调用接口种cookie
if (process.env.UMI_APP_LAYOUT === LayoutEnv.yx) {
const params = {
  marketingToken: localStorage.getItem("imp_token") || '',
  tokenDomain: 'test' === process.env.MODE ? document.domain : "imp.chinaamc.com",
  loginStrategy: "marketing",
}

// 客户运营
const csopParams = {
  ticket: '',
  service: '',
  loginStrategy: '',
  tokenDomain: ''
}

fetch('/sub-cs/rest/uni/sso/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params)
})

// 营销只有一个租户，种cookie chinaamc
setLocalItem('csoip_tenant', 'chinaamc')
}
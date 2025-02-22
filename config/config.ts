/*
 * @Author: wangtao wangtao@bjblackhole.com
 * @Date: 2024-11-30 10:49:50
 * @LastEditors: wangtao wangtao@bjblackhole.com
 * @LastEditTime: 2025-01-10 14:57:24
 * @FilePath: /csibs-fontend/config/config.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { defineConfig } from '@umijs/max';

// 营销一体化嵌入，按照规范，前面必须时sub-开头，路由需要改
const yxPreRoute = '';

export default defineConfig({
  proxy: {
    '/zwwsbm': {
      // target: 'http://10.16.16.72:9600/',
      target: 'http://115.28.96.217:8081/',
      // target: 'http://10.16.102.220:8080/', // 庆武
      // target: 'http://10.16.99.119:8080/', //汪星辰
      // target: 'http://10.16.99.85:9090/', //崔扬科
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
  routes: [
    // {
    //     name: ' CRUD 示例',
    //     path: '/customerQuery',
    //     component: './customerLayout',
    // },
    {
      path: '/',
      redirect: yxPreRoute + '/questionnaireRecord',
    },

    {
      name: '问卷提交记录',
      path: yxPreRoute + '/questionnaireRecord',
      component: './questionnaireRecord'
    },
  ],
});

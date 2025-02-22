import { defineConfig } from '@umijs/max';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import configts from './config/config';
import {LayoutEnv} from './src/constants/index'
// 营销一体化微前端配置
const impYxConfig = {
  publicPath: '/sub-know-seat/',
  base:  '/sub-know-seat/',
  outputPath: 'sub-know-seat',
  manifest: {
    basePath: '/sub-know-seat/'
  },
  runtimePublicPath: {},
  headScripts: [
    'window.publicPath = "/sub-know-seat/"',
    // 先进入这个文件，判断是否需要那两个polyfill，需要再加载
    { src:  '/sub-know-seat/active-polyfill.js' },
    // { src:  '/sub-know-seat/resizeObserver.min.js' },
    // { src:  '/sub-know-seat/webcomponents-lite-min.js' },
  ],
  qiankun: {
    slave: {},
  },
  chainWebpack: () => {
    const packageName = 'sub-know-seat'
    return {
      output: {
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${packageName}`,
      },
    }
  },
}

// 客户运营平台配置
const csopConfig = {
  publicPath: '/seat/',
  outputPath: 'seat',
  headScripts: [
    // 先进入这个文件，判断是否需要那两个polyfill，需要再加载
    { src:  '/seat/active-polyfill.js' },
    { src:  '/seat/resizeObserver.min.js' },
    // { src:  '/sub-know-seat/webcomponents-lite-min.js' },
  ],
}

const isQiankun =  process.env.UMI_APP_LAYOUT === LayoutEnv.yx ? impYxConfig : csopConfig;
console.log('xxx-process.env.UMI_APP_LAYOUT', process.env.UMI_APP_LAYOUT)
// 打包时公用配置
const compatible = {
  ...isQiankun,
  legacy: {
    buildOnly: false,
  },
  targets: { 
    chrome: 67,
    firefox: 62,
    ie: 11,
  },
  extraBabelPresets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 67,
          firefox: 62,
          ie: 11,
        },
        useBuiltIns: 'usage', // 按需引入 polyfill
        corejs: 3,
      },
    ],
  ],
  // extraBabelPlugins:  ['transform-remove-console', 'lodash'],
  extraPostCSSPlugins: [
    postcssPresetEnv({
      stage: 3, // 选择阶段，3是较为稳定的阶段
      features: {
        'hexadecimal-alpha-notation': true, // 启用十六进制颜色透明度转换，ie不支持color: #fe399f04这种后面两个数字表示透明度的格式
      },
      autoprefixer: { grid: true }, // 保持自动添加前缀的功能
    }),
  ],
}

// 本地调试ie时再使用这个
const devIe = {
  legacy: {
    buildOnly: false,
  },
  targets: { 
    // chrome: 67,
    // firefox: 62,
    ie: 11,
  },
  headScripts: [
    // 先进入这个文件，判断是否需要那两个polyfill，需要再加载
    { src:  'http://10.16.16.72:8005/seat/' + 'polyfill.min.js' },
    { src:  'http://10.16.16.72:8005/seat/' + 'resizeObserver.min.js' },
    { src:  'http://10.16.16.72:8005/seat/' + 'webcomponents-lite-min.js' },
  ],
  extraBabelPresets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 67,
          firefox: 62,
          ie: 11,
        },
        useBuiltIns: 'usage', // 按需引入 polyfill
        corejs: 3,
      },
    ],
  ],
  extraPostCSSPlugins: [
    postcssPresetEnv({
      stage: 3, // 选择阶段，3是较为稳定的阶段
      features: {
        'hexadecimal-alpha-notation': true, // 启用十六进制颜色透明度转换，ie不支持color: #fe399f04这种后面两个数字表示透明度的格式
      },
      autoprefixer: { grid: true }, // 保持自动添加前缀的功能
    }),
  ],
}
// 开发环境不考虑兼容，打包时根据再降级兼容
const legacy = process.env.NODE_ENV === 'development' ?  {} : compatible
const ENV_URL = 'test' === process.env.MODE ? "//csoip.chinaamc.com:8005" 
: (process.env.UMI_APP_LAYOUT === LayoutEnv.yx ?  '//csoip.chinaamc.com:6300' : '//10.5.31.80:6300')

export default defineConfig({
  request: {
    dataField: 'data'
  },
  initialState: {},
  antd: {
    configProvider: {
      autoInsertSpaceInButton: false,
    },
  },
  define: {
    'process.env.MODE': process.env.MODE || 'pord',
    'process.env.UMI_APP_LAYOUT': process.env.UMI_APP_LAYOUT
  },
  lessLoader: {
    modifyVars: {
      "ENV_URL": JSON.stringify(ENV_URL)
    },
    javascriptEnabled: true
  },
  plugins: [
    "umi-plugin-keep-alive"
  ],
  history: {type:"hash"},
  styledComponents: {},
  access: {},
  model: {},
  layout: {locale: false},
  alias: {
    '@': path.resolve(__dirname, './src')
  },
  ...legacy,
  ...configts,
  npmClient: 'npm',
});


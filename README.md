# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)


## 坐席目前存在问题

2. csibs-frontend\src\pages\customerLayout\index.module.less 这里的样式，有些样式应该被抽离到全局
3. csibs-frontend\src\pages\customerLayout\customerQuery\index.less 这里样式在整个客户查询模块都生效，部分以xx_xx的方式命名的class类名为之前开发者遗留，发现这里有样式问题，先确认影响范围，或新建类名修改
5. csibs-frontend\src\pages\customerLayout\customerQuery\data，许多枚举、表格column数组都记录在这里，应该让每个模块都有自己的data


## 打包发版
1. feature分支为主要开发分支，dev为上线分支，上线后需要将feature合并到dev上
2. npm run build:st 发测试分支
3. npm run build:prod 发生产分支
4. build:qiankun 无效，qiankun的还不行
5. 上线时不再需要修改字体引入地址，配置了ENV_URL，可以根据npm run build:prod自动改变


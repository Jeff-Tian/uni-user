# uni-user

> UniSSO 统一登录组件。

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.com/Jeff-Tian/uni-user.svg?branch=master)](https://travis-ci.com/Jeff-Tian/uni-user)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://uni-user-story.pa-ca.me/)

## 用途

各个项目不用再写登录相关的逻辑，只需要引用此包即可。

## usage

### Web

```javascript
import { UniUser } from 'uni-user';

User.getInfo();

// 若需要重新获取信息
User.clearCache();
User.getInfo();
```

start:

```shell
npm run dev
```

build:

```
npm run build
```

test：

```
npm run next-app
```

## 自动化测试

```shell
npm test
# 或者
yarn test
```

## 发布

```
npm publish
```

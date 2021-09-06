[English](./README.en.md) | 简体中文
<h1 align="center">
<img src="https://user-images.githubusercontent.com/6822604/130725631-dde49c00-24fe-44c6-a3fd-a5c709ce6e57.png" width="40%"/>
</h1>

<p align="center" style="margin: 30px 0 0px;">基于React开发的移动web调试工具   <a href="https://github.com/tnfe/mdebug/blob/master/CHANGELOG.md">更新日志</a></p>

<table>
  <tr>
    <th><h4 align="center"><h4 align="center">简单易用</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">功能全面</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">易扩展</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">高性能</h4 align="center"></th>
  </tr>
  <tr>
    <td width="20%" align="center"><sub>使用cdn方式,一键接入</sub></td>
    <td width="20%" align="center"><sub>类Chrome devtools, 内嵌React开发者工具,支持日志,网络,元素,代理,存储,性能等, 具有更好的网络捕获能力和丰富的日志展现形式</sub></td>
    <td width="20%" align="center"><sub>暴露内部丰富的事件, 可以和react组件无缝进行集成</td>
    <td width="20%" align="center"><sub>支持大数据量展示, 不卡顿</td>
  </tr>
</table>

<div align="center">
<a href="https://npmjs.org/package/mdebug" target="_blank"><img src="https://img.shields.io/npm/v/mdebug.svg" alt="NPM Version" /></a>
<a href="https://github.com/tnfe/mdebug/pulls" target="_blank"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs"/></a>
<a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg" alt="Node Version" /></a>
</div>

## 一、快速体验

https://tnfe.github.io/mdebug

![image](https://user-images.githubusercontent.com/6822604/131059931-7efb7494-82fe-4a27-bd79-ed2bd9ce2c11.png)

<img src="https://user-images.githubusercontent.com/6822604/131216593-59803c8f-1819-4907-b02a-e4bad0c1666b.png" width="40%"/>

## 二、Examples

+ Vanilla

[![Edit crimson-sun-py8x7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/crimson-sun-py8x7?fontsize=14&hidenavigation=1&theme=dark)

## 三、安装

#### Install using npm 
``` 
npm install mdebug --save

```
## 四、使用

### 1. ES6
```javascript
  import mdebug from 'mdebug';
  mdebug.init();
```

### 2.CDN
```javascript
(function() {
    var scp = document.createElement('script');
    // 加载最新的mdebug版本
    scp.src = 'https://unpkg.com/mdebug@latest/dist/index.js';
    scp.async = true;
    scp.charset = 'utf-8';
    // 加载成功并初始化
    scp.onload = function() {
        mdebug.init();
    };
    // 加载状态切换回调
    scp.onreadystate = function() {};
    // 加载失败回调 
    scp.onerror = function() {};
    document.getElementsByTagName('head')[0].appendChild(scp);
})();
```
## 五、API

### 1. init
```javascript
mdebug.init({
    containerId: '' // mdebug挂载容器id, 如果传空, 内部会自动生成一个不重复的id,
    plugins: [], // 传入mdebug插件
    hideToolbar: [], // 传入需要隐藏的tab id
});
```
### 2. addPlugin
```javascript
mdebug.addPlugin({
    id: '', // tab id
    name: '', // tab对应的中文title,
    enName: '', // tab对应的英文title
    component: () => {}, // tab对应的react组件
});
```

### 3. removePlugin
```javascript
// 支持移除的panel对应的id
/*
System => system;
Elements => elements;
Console => console
Application => application
NetWork => network
Performance => performance
Settings => settings
*/
mdebug.removePlugin([]);
```

### 4. exportLog
```javascript
/*
@returned {
  type: '' // 日志类型
  source: [], // 原始日志
}
@params type
// type等于log, 返回所有的console日志
// type等于net, 返回所有的net日志
*/
mdebug.exportLog(type);

```

### 5. on
```javascript
mdebug.on(eventName, callback);
```
### 6. emit
```javascript
mdebug.emit(eventName, data);
```

## 六、事件列表
| **事件名称**     | **数据**     | **触发时机**     |
| ---------- | :-----------:  | :-----------: |
| ready | object | mdebug加载完毕
| addTab | object | 增加面板
| removeTab | array | 移除面板 |
| changeTab | object | 面板切换|


## 七、开发

1. npm i
2. npm start   // 启动开发
3. npm run build  //打包
4. npm run test // 单元测试

## 八、相关文章
1. [移动端前端开发调试](https://www.cnblogs.com/yzg1/p/5160594.html?utm_source=tuicool&utm_medium=referral)
2. [Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/)

## 九、相关项目
1. [eruda](https://github.com/liriliri/eruda)
2. [vConsole](https://github.com/Tencent/vConsole)
3. [react-json-tree](https://github.com/alexkuz/react-json-tree)
4. [基于React的移动端调试解决方案](https://github.com/abell123456/mdebug)
5. [a useful debugger for mobile](https://github.com/ghking1/mdebug)
6. [autoDevTools](https://github.com/chokcoco/autoDevTools)
7. [react-inspector](https://github.com/xyc/react-inspector)
8. [web-console](https://github.com/whinc/web-console)
9. [ChromeDevTools](https://github.com/ChromeDevTools/devtools-frontend)

## 十、License
The MIT License (MIT). Please see [License File](./LICENSE) for more information.

English | [简体中文](./README.md)
<h1 align="center">
<img src="https://user-images.githubusercontent.com/6822604/130725631-dde49c00-24fe-44c6-a3fd-a5c709ce6e57.png" width="40%"/>
</h1>

<p align="center" style="margin: 30px 0 0px;">A Lightweight, Easy To Extend Web Debugging Tool Build With React</p>
<table>
  <tr>
    <th><h4 align="center"><h4 align="center">Easy to use</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">Full-featured</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">Easy to expand</h4 align="center"></th>
    <th><h4 align="center"></h4 align="center"><h4 align="center">high performance</h4 align="center"></th>
  </tr>
  <tr>
    <td width="20%" align="center"><sub>Use the cdn method, one-click access</sub></td>
    <td width="20%" align="center"><sub>Similar to Chrome devtools, supports log, network, storage, performance, etc., has better network capture capabilities and rich log display</sub></td>
    <td width="20%" align="center"><sub>Expose rich internal events, which can be seamlessly integrated with react components</td>
    <td width="20%" align="center"><sub>Support large amount of data display, no lag</td>
  </tr>
</table>

<div align="center">
<a href="https://npmjs.org/package/mdebug" target="_blank"><img src="https://img.shields.io/npm/v/mdebug.svg" alt="NPM Version" /></a>
<a href="https://github.com/tnfe/mdebug/pulls" target="_blank"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs"/></a>
<a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg" alt="Node Version" /></a>
</div>

## Demos

https://tnfe.github.io/mdebug

![image](https://user-images.githubusercontent.com/6822604/131059931-7efb7494-82fe-4a27-bd79-ed2bd9ce2c11.png)

<img src="https://user-images.githubusercontent.com/6822604/131216593-59803c8f-1819-4907-b02a-e4bad0c1666b.png" width="40%"/>

## Examples

+ Vanilla

[![Edit crimson-sun-py8x7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/crimson-sun-py8x7?fontsize=14&hidenavigation=1&theme=dark)


## Installation

#### Install using npm 
``` 
npm install mdebug --save

```
## Useage

### 1. ES6
```javascript
  import mdebug from 'mdebug';
  mdebug.init();
```

### 2.CDN
```javascript
(function() {
    var scp = document.createElement('script');
    // Load the latest mdebug version
    scp.src = 'https://unpkg.com/mdebug@latest/dist/index.js';
    scp.async = true;
    scp.charset = 'utf-8';
    // Successfully loaded and initialized
    scp.onload = function() {
        mdebug.init();
    };
    // Load state switch callback
    scp.onreadystate = function() {};
    // Load failed callback 
    scp.onerror = function() {};
    document.getElementsByTagName('head')[0].appendChild(scp);
})();
```
## API

### 1. init
```javascript
mdebug.init({
    containerId: '' // mdebug mounts the container id, if it is empty, a unique id will be automatically generated internally,
    plugins: [], // Incoming mdebug plugin
    hideToolbar: [], // Pass in the tab id that needs to be hidden
});
```
### 2. addPlugin
```javascript
mdebug.addPlugin({
    id: '', // tab id
    name: '', // Chinese title corresponding to tab,
    enName: '', // English title corresponding to tab
    component: () => {}, // React component corresponding to tab
});
```

### 3. removePlugin
```javascript
// Support the id of the panel to be removed
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
  type: '' // Log type
  source: [], // Original log
}
@params type
// type is equal to log, return all console logs
// type is equal to net, return all net logs
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

## Event list
| **Event name**     | **params**     | **Trigger timing**     |
| ---------- | :-----------:  | :-----------: |
| ready | object | mdebug loaded
| addTab | object | Add panel
| removeTab | array | Remove panel |
| changeTab | object | Panel switch|


## development

1. npm i
2. npm start
3. npm run build 
## Projects
1. [eruda](https://github.com/liriliri/eruda)
2. [vConsole](https://github.com/Tencent/vConsole)
3. [react-json-tree](https://github.com/alexkuz/react-json-tree)
4. [React-based mobile debugging solution](https://github.com/abell123456/mdebug)
5. [a useful debugger for mobile](https://github.com/ghking1/mdebug)
6. [autoDevTools](https://github.com/chokcoco/autoDevTools)
7. [react-inspector](https://github.com/xyc/react-inspector)
8. [web-console](https://github.com/whinc/web-console)
9. [ChromeDevTools](https://github.com/ChromeDevTools/devtools-frontend)

## License
The MIT License (MIT). Please see [License File](./LICENSE) for more information.

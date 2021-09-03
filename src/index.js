import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Protector from '@/components/protector';
import { __DEV__ } from '@/utils';
import { emitter } from '@/utils/emitter';
import { exportLog } from '@/utils/log';
import { init as polyfillInit } from './polyfill';
import './index.css';
import store from './store';

const { on, trigger: emit } = emitter;

let ready = false;
const init = (options = {}) => {
  if (!ready) {
    // polyfill fetch console etc
    polyfillInit();
    // 创建mdebug节点
    const { containerId, containerClass = '__mdebug' } = options;
    const mdebugContainerId =
      containerId || `mdebug${parseInt(Math.random() * Number.MAX_SAFE_INTEGER, 10)}`;
    const mdebugRoot = document.createElement('div');
    mdebugRoot.id = mdebugContainerId;
    document.body.appendChild(mdebugRoot);
    mdebugRoot.classList.add(containerClass);

    // 渲染mdebug
    ReactDOM.render(
      <Protector>
        <Provider store={store}>
          <App options={options} />
        </Provider>
      </Protector>,
      document.getElementById(mdebugContainerId),
      () =>
        emit('ready', {
          dom: mdebugRoot,
          id: mdebugContainerId,
        }),
    );
    ready = true;
  } else {
    console.warn('mebug has inited!');
  }
};
// 注册tab
const addPlugin = plugin => emit('addPlugin', plugin);
const removePlugin = pluginId => emit('removePlugin', pluginId);

if (__DEV__) {
  on('ready', data => console.log('ready', data));
  on('addTab', data => console.log('addTab', data));
  on('removeTab', data => console.log('removeTab', data));
  on('changeTab', data => console.log('changeTab', data));
  init({
    containerId: `mdebug${parseInt(Math.random() * Number.MAX_SAFE_INTEGER, 10)}`,
    containerClass: '__mdebug',
    hideToolbar: [],
  });
  console.log('init', 'ok');
  console.log({
    a: 1,
  });
  console.debug(1);
  console.log([1, 2, 3], Symbol('CCC'), true);
  console.warn(Symbol('CCC'), true, new Map(), function ab() {}, [1, 2, 3]);
  console.info(true);
  console.error(function ab() {});
  console.log(new XMLHttpRequest());
  function perf_observer(list, observer) {
    // Process the "measure" event
    // 处理 "measure" 事件
    console.log(list, observer);
  }
  var observer2 = new PerformanceObserver(perf_observer);
  observer2.observe({ entryTypes: ['resource'] });
  setTimeout(() => {
    const image = new Image();
    image.src = 'https://mat1.gtimg.com/rain/bailing20/0842aa48dd82.logonew.png';
  }, 3000);
}
export default {
  init,
  on,
  emit,
  addPlugin,
  removePlugin,
  exportLog,
};

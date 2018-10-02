import React, { Component } from 'react';
import '@/App.css';
import { initData } from '@/mock';
import Inspector from 'react-inspector';
import { MdebugHeader, MdebugApplication } from '@/modules';
import { __DEV__ } from '@/utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDebug: __DEV__,
    };
    this._times = 1;
    this._lastTapTime = null;
  }
  componentDidMount() {
    // 三指连击唤起mdebug
    const context = this;
    window.addEventListener('touchend', e => {
      const { showDebug } = context.state;
      var nowTime = new Date();
      var touches = e.touches.length;
      if (context._times === 1) {
        context._times++;
        context._lastTapTime = nowTime;
        setTimeout(() => {
          context._times = 1;
        }, 1000);
        return;
      }
      if (
        touches === 2 &&
        context._times === 2 &&
        nowTime - context._lastTapTime < 1000
      ) {
        context._times = 1;
        context._lastTapTime = new Date();
        if (!showDebug) {
          this.setState({
            showDebug: true,
          });
        } else {
          this.setState({
            showDebug: false,
          });
        }
      }
    });
  }
  render() {
    const { showDebug } = this.state;
    return (
      <div
        className={'mdebug'}
        style={{
          display: showDebug ? 'block' : 'none',
        }}
      >
        <MdebugHeader />
        <MdebugApplication id={'mdebug-application'}>
          <h1>Mdebug</h1>
          <Inspector data={initData} />
        </MdebugApplication>
        <MdebugApplication id={'mdebug-system'}>{navigator.userAgent}</MdebugApplication>
        <MdebugApplication id={'mdebug-trategy'}>trategy</MdebugApplication>
        <MdebugApplication id={'mdebug-debug'}>debug</MdebugApplication>
        <MdebugApplication id={'mdebug-emonitor'}>emonitor</MdebugApplication>
      </div>
    );
  }
}

export default App;

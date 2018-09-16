import React, { Component } from 'react';
import './App.css';
import JSONTree from 'react-json-tree';
import { initData } from './mock';
import { MdebugHeader, MdebugApplication } from './modules';

class App extends Component {
  render() {
    return (
      <div className={'mdebug'}>
          <MdebugHeader/>
          <MdebugApplication id={"mdebug-application"}>
              <JSONTree data={initData} />
          </MdebugApplication>
          <MdebugApplication id={"mdebug-system"}>
            {navigator.userAgent}
          </MdebugApplication>
      </div>
    );
  }
}

export default App;

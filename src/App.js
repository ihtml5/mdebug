import React, { Component } from 'react';
import '@/App.css';
import JSONTree from 'react-json-tree';
import { initData } from '@/mock';
import { MdebugHeader, MdebugApplication } from '@/modules';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDebug: true,
    };
    this._times = 1;
  }
  componentDidMount() {
		const { showDebug } = this.state;
		window.addEventListener('touchend', function(e) {
			var nowTime = new Date();
			var touches = e.touches.length;

			if (this._times === 1) {
				this._times++;
				this._lastTapTime = nowTime;

				setTimeout(function() {
					this._times = 1;
				}, 1000);
				return;
			}

			if (touches === 2 && this._times === 2 && nowTime - this._lastTapTime < 1000) {
				if (!showDebug) {
					this.setState({
						showDebug: true
					});
				} else {
					this.setState({
						showDebug: false
					});
				}

				this._times = 1;
			}
		});
	}
  render() {
    const { showDebug } = this.state;
    return (
      <div className={'mdebug'} style={{
        display: showDebug ? 'block' : 'none',
      }}>
          <MdebugHeader/>
          <MdebugApplication id={"mdebug-application"}>
              <h1>Mdebug</h1>
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

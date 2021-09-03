import React, { PureComponent } from 'react';
import { getPfTiming, timingToObject } from '@/utils/performance';
import { Inspector } from 'react-inspector';
import { PERFORMANCEMAPPING } from '@/constants';
import styles from './performance.module.css';

const keyMappings = {
  time6: '首次加载耗时',
  time7: '整页耗时',
  time8: 'dom解析耗时',
  time_dns: 'dns解析耗时',
  time_tcp: 'tcp解析耗时',
  time_domready: 'domReady耗时',
  time_response: '后端响应耗时',
  time_firstpaint: 'html下载耗时',
};
class MPerformance extends PureComponent {
  constructor(props) {
    super(props);
    const { system = {} } = props;
    const { performance = {} } = system || {};
    this.state = {
      performance,
      tabName: 'emonitor',
    };
    this.getPf = this.getPf.bind(this);
  }
  getPf() {
    const { getPerformance } = this.props;
    setTimeout(() => getPerformance(getPfTiming()), 0);
  }
  onSelectTab(tabName) {
    this.setState({
      tabName,
    });
  }
  getSubSelected(curTabName) {
    const { tabName } = this.state;
    if (tabName === curTabName) {
      return styles.mdebugSubSelected;
    }
    return;
  }
  componentDidMount() {
    window.addEventListener('load', this.getPf, false);
    if (document.readyState === 'complete') {
      this.getPf();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('load', this.getPf, false);
  }
  render() {
    const { tabName: curTabName } = this.state;
    const { system = {} } = this.props;
    const { performance = {} } = system || {};
    console.warn('');
    return (
      <div>
        <ul className={styles.mdebugPerfHeader}>
          {PERFORMANCEMAPPING.map(tabName => (
            <li
              className={this.getSubSelected(tabName)}
              key={tabName}
              onClick={() => this.onSelectTab(tabName)}>
              {tabName}
            </li>
          ))}
        </ul>
        <div className={styles.mdebugCon}>
          {curTabName === 'emonitor' ? (
            <ul className={styles.mdebugPerformance}>
              <div className={styles.mdebugPerfTitle}>页面常用性能指标</div>
              {Object.keys(performance).map(
                pfKey =>
                  keyMappings[pfKey] && (
                    <li key={keyMappings[pfKey] || pfKey}>
                      <span className={styles.mdebugPerformanceKeyName}>
                        {keyMappings[pfKey] || pfKey}
                      </span>
                      {`${performance[pfKey]}ms`}
                    </li>
                  ),
              )}
            </ul>
          ) : (
            timingToObject() && (
              <div className={styles.mdebugStandardTiming}>
                <div className={styles.mdebugPerfTitle}>
                  原始性能数据: 取自window.performance.timing
                </div>
                <a
                  href="https://www.w3.org/TR/navigation-timing-2/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    className={styles.mdebugPerfPoster}
                    src="https://www.w3.org/TR/navigation-timing-2/timestamp-diagram.svg"
                    alt="timestamp"
                  />
                </a>
                <Inspector data={timingToObject()} />
              </div>
            )
          )}
        </div>
        <div></div>
      </div>
    );
  }
}

export default MPerformance;

import React, { Fragment, PureComponent } from 'react';
import { networkLog } from '@/constants';
import ShowMore from '@/components/showmore';
import { emitter } from '@/utils/emitter';
import styles from './network.module.css';
import MdebugPrinter from '@/components/printer';
import { change } from '@/utils/console';
import { fixLink } from '@/utils/url';

const { on, off } = emitter;

class NetWork extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabName: 'all',
      network: [...networkLog],
      loading: true,
    };
    this.updateLog = this.updateLog.bind(this);
  }
  updateLog() {
    this.setState({
      network: [...networkLog],
    });
  }
  componentDidMount() {
    on('network', this.updateLog);
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 100);
  }
  componentWillUnmount() {
    off(this.updateLog);
  }
  stringify(value) {
    try {
      return typeof value === 'object' ? JSON.stringify(value) : String(value);
    } catch (err) {
      return String(value);
    }
  }
  formate({ name, value }) {
    if (name === 'delay') {
      let valueFormat = value;
      let unit = 'ms';
      if (value >= 1000) {
        valueFormat = (valueFormat / 1000).toFixed(2);
        unit = 's';
      }
      return {
        value: `${valueFormat}${unit}`,
        name,
      };
    }
    if (name === 'httpcode') {
      return {
        name: 'status',
        value,
      };
    }
    if (name === 'starttime') {
      return {
        name,
        value: `${new Date(Number(value))}`,
      };
    }
    return {
      name,
      value: <ShowMore textColor={'#000'}>{this.stringify(value)}</ShowMore>,
    };
  }
  formateName({ key, data }) {
    if (key === 'name') {
      return (
        <a
          href={data.name}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.networkName}>
          {data.type === 'img' ? (
            <img src={data.name} className={styles.imgDesc} alt={data.name} />
          ) : (
            data.name
          )}
        </a>
      );
    }
    return this.formate({
      name: key,
      value: data[key],
    }).value;
  }
  onChange(e) {
    this.props.onSetKeywords({
      network: e.currentTarget.value,
    });
  }
  onSelectTag(tabName) {
    this.setState({
      tabName,
    });
  }
  render() {
    const { keywords = {} } = this.props;
    const { network: networkWords } = keywords;
    const { currentShow, network, loading, tabName } = this.state;
    const NETWORKTAGS = Array.from(new Set(network.map(tag => tag.type)));
    NETWORKTAGS.unshift('all');
    const networkData = network.filter(net => net.type === tabName || tabName === 'all');
    return (
      <div className={styles.mdebugNetWorkCon}>
        <ul className={styles.mdebugNetWorkHeaderWrap}>
          <li className={styles.mdebugInputWrap}>
            <div className={styles.mdbugNetworkInputWrap}>
              <input
                type="text"
                placeholder="filter network"
                value={networkWords}
                onChange={this.onChange.bind(this)}
                className={styles.mdebugNetworkInput}
              />
            </div>
            <div className={styles.mdbugTagWrap}>
              {NETWORKTAGS.map((tag, ind) => (
                <span
                  className={`${styles.mdbugTagItem} ${tag === tabName && styles.isActive}`}
                  onClick={() => this.onSelectTag(tag)}
                  key={ind}>
                  {tag}
                </span>
              ))}
            </div>
          </li>
          <li className={styles.mdebugNetWorkHeader}>
            <div className={styles.mdebugNetWorkFixed}>Name</div>
            <div className={styles.mdebugNetWorkCenter}>Status</div>
            <div className={styles.mdebugNetWorkCenter}>initiator</div>
            <div className={styles.mdebugNetWorkCenter}>Time</div>
          </li>
        </ul>
        {loading ? (
          <div className={styles.mdebugLoding}>loading</div>
        ) : (
          <ul className={styles.mdebugNetWorkTable}>
            {networkData
              .filter(netinfo =>
                Object.keys(netinfo).some(netkey => {
                  return (
                    !networkWords ||
                    netkey.toLowerCase().indexOf(networkWords.toLowerCase()) !== -1 ||
                    `${netinfo[netkey]}`.indexOf(networkWords.toLowerCase()) !== -1 ||
                    change([netinfo], networkWords)
                  );
                }),
              )
              .map((nw, index) => {
                const { name, httpcode, initiatorType, delay, type, messages = [], wsClosed } = nw;
                const isCurShow = currentShow === `${index}1`;
                const formatterName = fixLink(name);
                return (
                  <Fragment key={index}>
                    <li
                      className={styles.mdebugNetWorkData}
                      style={{
                        color:
                          (typeof httpcode === 'number' && httpcode >= 200 && httpcode <= 304) ||
                          type === 'websocket'
                            ? undefined
                            : '#ef4f4f',
                      }}
                      onClick={() =>
                        this.setState({
                          selectedIndex: index,
                          currentShow: currentShow !== `${index}1` ? `${index}1` : `${index}0`,
                        })
                      }>
                      <div
                        className={styles.mdebugNetWorkFixed}
                        key="cgiurl"
                        style={{
                          fontWeight: isCurShow ? 700 : undefined,
                        }}>
                        <ShowMore>{formatterName}</ShowMore>
                      </div>
                      <div
                        className={styles.mdebugNetWorkCenter}
                        key="httpcode"
                        style={{
                          fontWeight: isCurShow ? 700 : undefined,
                        }}>
                        {httpcode}
                      </div>
                      <div
                        className={styles.mdebugNetWorkCenter}
                        key="type"
                        style={{
                          fontWeight: isCurShow ? 700 : undefined,
                        }}>
                        {initiatorType}
                      </div>
                      <div
                        className={styles.mdebugNetWorkCenter}
                        key="delay"
                        style={{
                          fontWeight: isCurShow ? 700 : undefined,
                        }}>
                        {type === 'websocket' && !wsClosed
                          ? 'pending'
                          : this.formate({
                              name: 'delay',
                              value: delay,
                            }).value}
                      </div>
                    </li>
                    {isCurShow && (
                      <ul className={styles.mdebugNetWorkDataDetail} key={name}>
                        {type === 'websocket'
                          ? messages
                              .filter(message => {
                                const { wsType } = message;
                                return wsType !== 'open' && wsType !== 'close';
                              })
                              .map((message, idx) => {
                                const { wsType, content, time } = message;
                                let args = content;
                                try {
                                  args = JSON.parse(content);
                                } catch (err) {}
                                return (
                                  <li key={idx}>
                                    <div className={styles.mdebugNetWorkDataDetailNk}>{wsType}</div>
                                    <div className={styles.mdebugNetWorkDataDetailNd}>
                                      {typeof args === 'string' ? (
                                        args
                                      ) : (
                                        <MdebugPrinter data={[args]} />
                                      )}
                                    </div>
                                    <div className={styles.mdebugNetWorkDataDetailNd}>{time}</div>
                                  </li>
                                );
                              })
                          : Object.keys(nw).map((nk, detailIndex) => (
                              <li key={detailIndex}>
                                <div className={styles.mdebugNetWorkDataDetailNk}>
                                  {
                                    this.formate({
                                      name: nk,
                                      value: nw[nk],
                                    }).name
                                  }
                                </div>
                                <div className={styles.mdebugNetWorkDataDetailNd}>
                                  {this.formateName({
                                    key: nk,
                                    data: nw,
                                  })}
                                </div>
                              </li>
                            ))}
                      </ul>
                    )}
                  </Fragment>
                );
              })}
          </ul>
        )}
      </div>
    );
  }
}

export default NetWork;

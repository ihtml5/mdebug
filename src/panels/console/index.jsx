import React, { PureComponent } from 'react';
import styles from './console.module.css';
import { CONSOLEMAPPING, sessionLog } from '@/constants';
import { emitter } from '@/utils/emitter';
import { noop } from '@/utils/shared';
import MdebugPrinter from '@/components/printer';
import { change } from '@/utils/console';

const { off, on, trigger: emit } = emitter;

class Console extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabName: 'all',
      consoleKey: CONSOLEMAPPING[0],
      consolelog: [...sessionLog],
      expandIndex: [],
      loading: true,
      command: 'filter',
      commandKeyWords: '',
    };
    this.updateLog = this.updateLog.bind(this);
    this.updateCommandLog = this.updateCommandLog.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getSubSelected = this.getSubSelected.bind(this);
  }
  getSubSelected(curTabName) {
    const { tabName } = this.state;
    if (tabName === curTabName) {
      return styles.mdebugSubSelected;
    }
    return;
  }
  onSelectTab(tabName) {
    this.setState({
      tabName,
    });
  }
  updateCommandLog() {
    const { commandKeyWords } = this.state;
    if (!commandKeyWords) {
      return;
    }
    let evalValue = null;
    try {
      evalValue = eval(commandKeyWords);
    } catch (err) {
      evalValue = commandKeyWords;
    }
    emit('console', {
      type: 'info',
      value: [evalValue],
      timestamp: new Date().getTime(),
    });
  }
  updateLog() {
    this.setState({
      consolelog: [...sessionLog],
    });
  }
  componentDidMount() {
    on('console', this.updateLog);
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 100);
  }
  componentWillUnmount() {
    off(this.updateLog);
  }
  onChange(e) {
    const { command } = this.state;
    const { onSetKeywords = noop } = this.props;
    const value = e.currentTarget.value;
    if (command === 'command') {
      this.setState({
        commandKeyWords: value,
      });
    } else {
      onSetKeywords({
        console: value,
      });
    }
  }
  render() {
    const { consolelog, tabName, loading, command, commandKeyWords } = this.state;
    const { keywords = {}, onSetKeywords = noop } = this.props;
    const { console: consoleWords } = keywords || {};
    const curConsoleInfo = consolelog.filter(logInfo => {
      return logInfo.type === tabName || tabName === 'all';
    });
    const isConsoleEmpty = curConsoleInfo.length <= 0;
    return (
      <div className={styles.mdebugConsoleCon}>
        <div className={styles.mdebugFixeHeader}>
          <ul className={styles.mdebugConsoleHeader}>
            {Object.keys(CONSOLEMAPPING).map(tabName => (
              <li
                className={this.getSubSelected(tabName)}
                key={tabName}
                onClick={() => this.onSelectTab(tabName)}>
                {tabName}
              </li>
            ))}
          </ul>
          <div className={styles.mdebugInputWrap}>
            <input
              type="text"
              onChange={this.onChange}
              className={styles.mdebugConsoleInput}
              placeholder={command === 'command' ? 'excute command' : 'filter console'}
              value={command === 'filter' ? consoleWords : commandKeyWords}
            />
            <div className={styles.mdebugConsoleCommand}>
              <div
                className={styles.mdebugConsoleCommandTag}
                onClick={() => {
                  this.setState({
                    command: command === 'filter' ? 'command' : 'filter',
                  });
                  onSetKeywords({ console: '' });
                }}
                style={{
                  color: command === 'command' ? 'rgb(40, 131, 233)' : undefined,
                }}>
                command
              </div>
              <div
                className={styles.mdebugConsoleCommandTag}
                onClick={this.updateCommandLog}
                style={{
                  color: command === 'command' ? '#000' : undefined,
                }}>
                OK
              </div>
            </div>
          </div>
        </div>
        <ul className={`${styles.mdebugConsoleDetail} ${isConsoleEmpty ? styles.invisible : ''}`}>
          {curConsoleInfo
            .filter(log => {
              const { type, value } = log;
              return (
                !consoleWords ||
                type.indexOf(consoleWords.toLowerCase()) !== -1 ||
                change(value, consoleWords.toLowerCase())
              );
            })
            .map((clInfo, index) => (
              <li
                style={{ color: CONSOLEMAPPING[clInfo.type].color || '#999' }}
                key={index}
                className={styles.mdebugConsoleDetailLi}>
                {tabName === 'all' && (
                  <div
                    className={styles.mdebugConsoleLabel}
                    style={{
                      backgroundColor: CONSOLEMAPPING[clInfo.type].color || '#999',
                    }}>
                    {clInfo.type}
                  </div>
                )}
                <div
                  className={styles.mdebugConsoleValues}
                  style={
                    !Array.isArray(clInfo.value) || clInfo.value.length <= 1
                      ? {
                          border: 'none',
                          paddingLeft: 0,
                        }
                      : null
                  }>
                  {loading ? (
                    index === 0 ? (
                      'loading...'
                    ) : (
                      ''
                    )
                  ) : (
                    <MdebugPrinter data={clInfo.value} />
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default Console;

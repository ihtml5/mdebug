import React, { PureComponent } from 'react';
import { download, exportLog } from '@/utils/log';
import styles from './toolbar.module.css';
import { emitter } from '@/utils/emitter';

const { trigger: emit, off } = emitter;

class ToolBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
    };
  }
  stringify(value) {
    try {
      return JSON.stringify(value);
    } catch (err) {
      console.error(err);
      return String(value);
    }
  }
  componentWillUnmount() {
    const { tabInfo = {} } = this.props;
    const { curTab = {} } = tabInfo || {};
    const { enName = '' } = curTab || {};
    off(`${enName}Add`);
  }
  render() {
    const { onShowDebug, tabInfo = {}, options = {} } = this.props;
    const { curTab = {} } = tabInfo || {};
    const { enName = '' } = curTab || {};
    const { exportToolBar = [], addToolBar = ['proxy'] } = options || {};
    const canExport =
      Array.isArray(exportToolBar) && exportToolBar.indexOf(enName.toLowerCase()) !== -1;
    const canAdd = Array.isArray(addToolBar) && addToolBar.indexOf(enName.toLowerCase()) !== -1;
    return (
      <div className={styles.mdebugtoolbarcon}>
        <ul className={styles.mdebugtoolbar}>
          {canExport && (
            <li
              onClick={() => {
                download(
                  this.stringify(exportLog(enName.toLowerCase())),
                  `mdebug${new Date().toLocaleString()}.txt`,
                  'text/plain',
                );
              }}>
              Export
            </li>
          )}
          {canAdd && <li onClick={() => emit(`${enName.toLowerCase()}Add`)}>Add</li>}
          <li
            onClick={() =>
              onShowDebug({
                showDebug: false,
              })
            }>
            Hide
          </li>
        </ul>
      </div>
    );
  }
}

export default ToolBar;

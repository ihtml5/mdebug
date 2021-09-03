import React, { PureComponent } from 'react';
import styles from './settings.module.css';

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.mdebugSettings}>
        <h3>Mdebug by Tencent News TNT Web Team</h3>
        <p>
          author: <a href="https://github.com/ihtml5">ihtml5</a>
        </p>
        <p>version: 1.0.3</p>
      </div>
    );
  }
}

export default Settings;

import React, { PureComponent } from 'react';
import Inspector from 'react-inspector';
import styles from './elements.module.css';

class Elements extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.mdebugElementsCon}>
        <Inspector data={document} />
      </div>
    );
  }
}

export default Elements;

import React, { PureComponent } from 'react';
import styles from './about.module.css';

class About extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.mdebugAbout}>
        <h3>ttdebug by scen Web Team</h3>
        <p>
          author: a big hero
        </p>
        <p>version: 1.0.2</p>
      </div>
    );
  }
}

export default About;

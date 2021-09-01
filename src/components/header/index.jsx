import React, { PureComponent, Fragment } from 'react';
import styles from './header.module.css';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }
  render() {
    const { tabs, onSelectTab, curTab = {}, options } = this.props;
    const { currentIndex } = curTab;
    const { hideToolbar = ['custom'] } = options || {};
    return (
      <Fragment>
        <ul className={styles['mdebug-header']}>
          {tabs
            .filter(tab => !tab.alias || hideToolbar.indexOf(tab.alias) < 0)
            .map((source, index) => (
              <li
                key={source.name}
                onClick={() => {
                  this.setState({
                    showDebug: true,
                    currentIndex: index,
                  });
                  onSelectTab({
                    currentIndex: index,
                    name: source.name,
                    enName: source.enName,
                    id: source.id,
                  });
                }}
                className={
                  index === currentIndex
                    ? styles['mdebug-selectedTab']
                    : styles['mdebug-noselected']
                }>
                {source.enName}
              </li>
            ))}
        </ul>
      </Fragment>
    );
  }
}
export default Header;

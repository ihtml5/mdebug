import React, { PureComponent } from 'react';
import { isNumber, isString } from '@/utils/shared';
import styles from './showmore.module.css';

class ShowMore extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
    };
  }
  render() {
    const { limit = 300, children, textColor } = this.props;
    const { isExpand } = this.state;
    const formatterLimit = isNumber(limit) ? limit : 300;
    if (isString(children)) {
      const isNoLong = children.length < formatterLimit;
      if (isNoLong) {
        return children;
      }
      return (
        <span className={styles.showmore}>
          {isExpand ? (
            <span className={styles.showmoreContent}>
              {children}
              <span
                className={styles.showmoreText}
                style={{
                  color: textColor,
                }}
                onClick={() => {
                  this.setState({
                    isExpand: false,
                  });
                }}>
                收起&uarr;
              </span>
            </span>
          ) : (
            <span className={styles.showmoreContent}>
              {children.slice(0, limit)}
              <span
                className={styles.showmoreText}
                style={{
                  color: textColor,
                }}
                onClick={() => {
                  this.setState({
                    isExpand: true,
                  });
                }}>
                展开&darr;
              </span>
            </span>
          )}
        </span>
      );
    }
    return children;
  }
}

export default ShowMore;

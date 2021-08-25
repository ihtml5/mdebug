import { PureComponent } from 'react';
import { getSysInfo } from '@/utils/ua';

const { os } = getSysInfo(navigator.userAgent);
// 用于弹窗滚动效果
class LockScroll extends PureComponent {
  static defaultProps = {
    scrollName: 'can-scroll',
    noScrollName: 'no-scroll',
  };

    componentDidMount() {
    // 解决安卓微信webview的scroll禁止不彻底
    if (os.name === 'android') {
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.height = '100%';
      document.querySelector('html').style.height = '100%';
      document.querySelector('html').style.overflow = 'hidden';
    }
    const { scrollName, noScrollName } = this.props;
    let noScrollElement = false;
    if (noScrollName === 'window') {
      noScrollElement = document || window;
    } else {
      noScrollElement = document.querySelector(`.${noScrollName}`);
    }
    const scrollElement = document.querySelector(`.${scrollName}`);
    if (noScrollElement) {
      noScrollElement.addEventListener('touchmove', (e) => {
        e.preventDefault();
      });
    }
    let startY;
    if (scrollElement) {
      scrollElement.addEventListener('touchstart', (e) => {
        startY = e.touches[0].pageY;
      });
      // 处理移动过程中换方向无响应
      let topY = false;
      let bottomY = false;
      scrollElement.addEventListener('touchmove', (e) => {
        const moveEndY = e.changedTouches[0].pageY;
        const Y = moveEndY - startY;
        const { scrollTop } = scrollElement;
        if (Y > 0 && scrollTop <= 0) {
          // 到顶
          if (topY && Y <= topY) {
            e.stopPropagation();
          } else {
            e.preventDefault();
          }
          topY = Y;
        } else if (Y < 0 && scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
          // 到底
          if (bottomY && Y >= bottomY) {
            e.stopPropagation();
          } else {
            e.preventDefault();
          }
          bottomY = Y;
        } else {
          e.stopPropagation();
        }
      });
      scrollElement.addEventListener('touchend', () => {
        bottomY = false;
        topY = false;
      });
    }
  }
  componentWillUnmount() {
    if (os.name === 'android') {
      document.querySelector('body').style.overflow = 'auto';
      document.querySelector('body').style.height = 'auto';
      document.querySelector('html').style.overflow = 'auto';
      document.querySelector('html').style.height = 'auto';
    }
    const { scrollName, noScrollName } = this.props;
    let noScrollElement = false;
    if (noScrollName === 'window') {
      noScrollElement = window || document;
    } else {
      noScrollElement = document.querySelector(`.${noScrollName}`);
    }
    const scrollElement = document.querySelector(`.${scrollName}`);
    if (noScrollElement) {
      noScrollElement.removeEventListener('touchmove', (e) => {
        e.preventDefault();
      });
    }
    let startY;
    if (scrollElement) {
      scrollElement.removeEventListener('touchstart', (e) => {
        startY = e.touches[0].pageY;
      });
      // 处理移动过程中换方向无响应
      let topY = false;
      let bottomY = false;
      scrollElement.removeEventListener('touchmove', (e) => {
        const moveEndY = e.changedTouches[0].pageY;
        const Y = moveEndY - startY;
        const { scrollTop } = scrollElement;
        if (Y > 0 && scrollTop <= 0) {
          // 到顶
          if (topY && Y <= topY) {
            e.stopPropagation();
          } else {
            e.preventDefault();
          }
          topY = Y;
        } else if (Y < 0 && scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
          // 到底
          if (bottomY && Y >= bottomY) {
            e.stopPropagation();
          } else {
            e.preventDefault();
          }
          bottomY = Y;
        } else {
          e.stopPropagation();
        }
      });
      scrollElement.removeEventListener('touchend', () => {
        bottomY = false;
        topY = false;
      });
    }
  }

  render() {
    return null;
  }
}
export default LockScroll;
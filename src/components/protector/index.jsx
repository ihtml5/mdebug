import { PureComponent } from 'react';
// https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
class MnuProtector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
    };
  }
  componentDidCatch(err, info) {
    const { name } = this.props;
    this.setState(
      {
        ready: false,
      },
      () => {
        // 2018.10.19 正常输出错误并设置级别为warn
        console.warn(`module ${name} err`, err, info);
      },
    );
  }
  render() {
    const { children } = this.props;
    const { ready } = this.state;
    if (!ready) {
      return null;
    }
    return children;
  }
}

export default MnuProtector;
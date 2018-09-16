import { PureComponent } from 'react';

class Panel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render () {
        const { isActive, children } = this.props;
        if (isActive) {
            return children;
        }
        return null;
    }
}

export default Panel;
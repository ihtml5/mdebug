import React, { PureComponent } from 'react';
import styles from './pannel.module.css';
class Panel extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { isActive, children } = this.props;
		if (isActive) {
			return <div className={styles['mdebug-panel']}>{children}</div>;
		}
		return null;
	}
}

export default Panel;

import React, { PureComponent } from 'react';
import Protector from '@/components/protector';
import styles from './pannel.module.css';
class Panel extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { isActive, children, id } = this.props;
		if (isActive) {
			return <Protector name={id}><div className={styles['mdebug-panel']}>{children}</div></Protector>;
		}
		return null;
	}
}

export default Panel;

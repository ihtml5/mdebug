import React, { Component } from 'react';
import './header.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { dataSource } = this.props;
		return (
			<ul className={'mdebug-header'}>
				{dataSource.map(source => (
					<li key={source.name}>{source.name}</li>
				))}
			</ul>
		);
	}
}

Header.defaultProps = {
	dataSource: [
		{
			name: '应用',
			enName: 'application',
			id: 'mdebug-application'
		},
		{
			name: '系统',
			enName: 'system',
			id: 'mdebug-system'
		}
	]
};

export default Header;
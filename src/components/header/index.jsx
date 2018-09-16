import React, { PureComponent, Fragment } from 'react';
import './header.css';

class Header extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showDebug: false,
			currentIndex: 0,
		};
	}
	render() {
		const { tabs, onSelectTab, curTab = {} } = this.props;
		const { showDebug } = this.state;
		const { currentIndex } = curTab;
		return (
			<Fragment>
				<ul className={'mdebug-header'}>
					{tabs.map((source, index) => (
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
							className={index === currentIndex ? 'mdebug-selectedTab' : 'mdebug-noselected'}
						>
							{source.name}
						</li>
					))}
				</ul>
				<div
					id="medebug-content"
					style={{
						display: showDebug ? 'block' : 'none'
					}}
				>
					
				</div>
			</Fragment>
		);
	}
}
export default Header;

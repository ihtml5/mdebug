import React, { Component, Fragment } from 'react';
import './header.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDebug: false,
			currentIndex: 0,
		};
		this._times = 1;
	}
	componentDidMount() {
		const { showDebug } = this.state;
		window.addEventListener('touchend', function(e) {
			var nowTime = new Date();
			var touches = e.touches.length;

			if (this._times === 1) {
				this._times++;
				this._lastTapTime = nowTime;

				setTimeout(function() {
					this._times = 1;
				}, 1000);
				return;
			}

			if (touches === 2 && this._times === 2 && nowTime - this._lastTapTime < 1000) {
				if (!showDebug) {
					this.setState({
						showDebug: true
					});
				} else {
					this.setState({
						showDebug: false
					});
				}

				this._times = 1;
			}
		});
	}
	render() {
		const { tabs, onSelectTab, curTab = {} } = this.props;
		const { showDebug } = this.state;
		const { currentIndex } = curTab;
		console.warn('currentIndex:::', currentIndex, curTab);
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

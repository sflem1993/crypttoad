import React from 'react';
import {LeftSidebarContainer} from './LeftSidebar';
import {MainInfoContainer} from './MainInfo';

export default class Crypttoad extends React.PureComponent {

	render() {
		return <div className="crypttoad">
			<div className="main">
				<LeftSidebarContainer {...this.props}/>
				<MainInfoContainer {...this.props}/>
			</div>
			<div className="footer">
			</div>
		</div>
	}
}
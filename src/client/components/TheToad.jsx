import React from 'react';

import logo from './../img/logo.gif';

export default class TheToad extends React.PureComponent {

	render() {
		return <div className="theToad">
			<img src={logo}/>
		</div>
	}
}
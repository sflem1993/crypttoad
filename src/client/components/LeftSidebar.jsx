import React from 'react';
import {MarketSelectContainer} from './MarketSelect';
import logo from './../resources/logo.gif';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const LeftSidebar =  class LeftSidebar extends React.PureComponent {
	render() {
		return this.props.selectedMarkets.size == 0 ? <div></div> :
			<div className="leftSide">
				<div className="logo"><div className="logoWrapper"><img src={logo}/></div></div>
				<MarketSelectContainer {...this.props}/>
			</div>
	}
}

function mapStateToProps(state) {
  return {
    selectedMarkets: state.get('selectedMarkets')
  };
}

export const LeftSidebarContainer = connect(mapStateToProps, actionCreators)(LeftSidebar);
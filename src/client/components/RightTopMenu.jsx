import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const RightTopMenu =  class RightTopMenu extends React.PureComponent {
	render() {
		return this.props.selectedMarkets.size == 0 ? <div></div> :
			<div className="rightTopMenu">
			</div>
	}
}

function mapStateToProps(state) {
  return {
    selectedMarkets: state.get('selectedMarkets')
  };
}

export const RightTopMenuContainer = connect(mapStateToProps, actionCreators)(RightTopMenu);
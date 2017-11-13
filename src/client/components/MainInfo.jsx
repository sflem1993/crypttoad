import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {AutoSelectContainer} from './AutoSelect';
import {MarketsContainer} from './Markets';
import {RightTopMenuContainer} from './RightTopMenu';
import * as actionCreators from '../action_creators';

export const MainInfo = class MainInfo extends React.PureComponent {
	render() {
		return <div className="mainPageInfo">
			<div className="top">
				<div className="topStuff">
					<div className="currencySelect"><AutoSelectContainer {...this.props}/></div>
					<RightTopMenuContainer/>
				</div>
			</div>
			<MarketsContainer {...this.props}/>
		</div>
	}
}

function mapStateToProps(state) {
  return {
    selectedMarkets: state.get('selectedMarkets')
  };
}

export const MainInfoContainer = connect(mapStateToProps, actionCreators)(MainInfo);
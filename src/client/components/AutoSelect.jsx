import React from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {toJS} from 'immutable';


// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.marketCurrencyLong + ' (' + suggestion.marketCurrency + ')'}
  </div>
);
const getSuggestionValue = suggestion => suggestion.marketCurrency

export const AutoSelect = class AutoSelect extends React.PureComponent {
	getMarkets() {
		if (this.props.markets)
			return this.props.markets.toJS()
		else
			return [];
	}
	constructor() {
		super();
		this.state = {
	    	value: '',
	    	suggestions: []
	    };

	    this.onKeyDown = this.onKeyDown.bind(this);
	}

	handleKeyDown(event) {
		if (e.keyCode === 13) { // Enter
	        // Stop it here
	        e.preventDefault();
	        e.stopPropagation();
	       	console.log("@@ " + e.target.value + " @@");
	       	return this.props.addSelectedMarket(e.target.value);
	        // Do something else...
	    }
	}
// Teach Autosuggest how to calculate suggestions for any given input value.
getSuggestions = value => {
	  const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

	  return inputLength === 0 ? [] : this.getMarkets().filter(market =>
	   market.marketCurrency.toLowerCase().slice(0, inputLength) === inputValue || market.marketCurrencyLong.toLowerCase().slice(0, inputLength) === inputValue
	  );
};

	onChange = (event, { newValue }) => {

    	this.setState({
      	value: newValue
    	});
  	};

  	onKeyDown(e) {
	    if (e.keyCode === 13) { // Enter
	        e.preventDefault();
	        e.stopPropagation();
	       	return this.props.addSelectedMarket(e.target.value);
	    }
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
		if (method === 'click') {
			return this.props.addSelectedMarket(suggestionValue);
		}
	};

	 render() {
		const { value, suggestions } = this.state;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Select a coin!',
			value,
			onChange: this.onChange,
			onKeyDown: this.onKeyDown
		};

		// Finally, render it!
		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				onSuggestionSelected={this.onSuggestionSelected}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
			/>
		);
	}
}

function mapStateToProps(state) {
  return {
    markets: state.get('markets')
  };
}

export const AutoSelectContainer = connect(mapStateToProps, actionCreators)(AutoSelect);
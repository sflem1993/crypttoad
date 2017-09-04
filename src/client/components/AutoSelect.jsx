import React from 'react';
import Autosuggest from 'react-autosuggest';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
    {
    name: 'Elmo',
    year: 2012
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

const getSuggestionValue = suggestion => suggestion.name;

export default class AutoSelect extends React.PureComponent {
	constructor() {
		super();
		this.state = {
	    	value: '',
	    	suggestions: []
	    };
	}

	onChange = (event, { newValue }) => {

    	this.setState({
      	value: newValue
    	});
  	};

  	onKeyDown(e) {
	    if (e.keyCode === 13) { // Enter
	        // Stop it here
	        //e.preventDefault();
	       // e.stopPropagation();
	       	console.log("@@ " + e.target.value + " @@")
	        // Do something else...
	        e.target.value = 'afd';
	    }
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
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
			console.log("selected: " + suggestionValue  + " @@@ method: " + method);
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
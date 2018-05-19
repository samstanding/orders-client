import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import Geocode from 'react-geocode';

// Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

// Geocode.enableDebug();

// const geocode = (address) => {
//     Geocode.fromAddress(address).then(
//     response => {
//       const { lat, lng } = response.results[0].geometry.location;
//       console.log(lat, lng);
//     },
//     error => {
//       console.error(error);
//     }
//   );
// }

class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.state ={
            pickup: '',
            delivery: '',
            when: 'ASAP',
            vehicle: 'Car',
            price: '',
        }
    }

    handleSelect = (address) => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error))
      }

    handleChange = (pickup) => {
        this.setState({ ...this.state, pickup })
    }

    handleChangeDelivery = (delivery) => {
        this.setState({ ...this.state, delivery })
    }

    handleChangeFor = propertyName => (event) => {
        this.setState({...this.state.order,[propertyName]: event.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render(){
        return (
            <div>
                <h1>OrderForm</h1>
                <form onSubmit={this.handleSubmit}> 
                    <div className="input group">
                    <PlacesAutocomplete
                        value={this.state.pickup}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                    <label>Pickup Location: </label>
                    <input
                        {...getInputProps({
                        className: 'location-search-input'
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => {
                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                            <span>{suggestion.description}</span>
                    </div>
                        )
                    })}
                    </div>
                </div>
                )}
                </PlacesAutocomplete>
                    </div>
                    <div className="input group">
                    <PlacesAutocomplete
                        value={this.state.delivery}
                        onChange={this.handleChangeDelivery}
                        onSelect={this.handleSelect}
                    >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                    <label>Delivery Location: </label>
                    <input
                        {...getInputProps({
                        className: 'location-search-input'
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => {
                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                            <span>{suggestion.description}</span>
                        </div>
                        )
                    })}
                    </div>
                    </div>
                    )}
                </PlacesAutocomplete>
                    </div>
                    <div className="input group">
                        <label>When? </label>
                        <select value={this.state.when} onChange={this.handleChangeFor('when')}>
                            <option value="ASAP">ASAP</option>
                            <option value="In 3 Hours">In 3 Hours</option>
                        </select>
                    </div>
                    <div className="input group">
                        <label>Vehicle Needed </label>
                        <select value={this.state.vehicle} onChange={this.handleChangeFor('vehicle')}>
                            <option value="Car">Car</option>
                            <option value="Mid Sized">Mid Sized</option>
                            <option value="Pickup Truck">Pickup Truck</option>
                            <option value="Cargo Van">Cargo Van</option>
                        </select>
                    </div>
                    <div className="input group">
                        <input type="submit" name="Generate Price Estimate" value="Generate Price Estimate"/>
                    </div>
                </form>
                <div className="price">
                    <h2>Price: ${this.state.price}</h2>
                </div>
                <button>Submit Order</button>
            </div>
        )
    }
}

export default OrderForm;
import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';

const distance = (lat1, lon1, lat2, lon2) => {
	let radlat1 = Math.PI * lat1/180
	let radlat2 = Math.PI * lat2/180
	let theta = lon1-lon2
	let radtheta = Math.PI * theta/180
	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist
}


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
        this.pCoords = {};
        this.dCoords= {};
    }



    handleSelectP = (address) => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => this.pCoords =latLng)
          .catch(error => console.error('Error', error))
      }

    handleSelectD = (address) => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => this.dCoords =latLng)
          .catch(error => console.error('Error', error))
      }   
    
    calculatePrice = (pickup, delivery) => {
        let price = 15.50;
        let dist = distance(pickup.lat, pickup.lng, delivery.lat, delivery.lng);
        if (this.state.when === 'In 3 Hours' && dist > 10 ) {
            price += (dist - 10) * 1;
            console.log('in 3 hrs and dist over 10');
            
        }
        else if (this.state.when === 'ASAP' && dist > 7) {
            price += (dist - 7) * 1;
            console.log('in ASAP and dist over 7');
        } 
        if (this.state.vehicle === 'Mid Sized') {
            price = price * 1.1935;
            console.log('in midsized');
        } else if (this.state.vehicle === 'Pickup Truck') {
            price = price * 1.2139;
            console.log('in pickup');
            
        } else if (this.state.vehicle === 'Cargo Van' ) {
            price = price * 1.2674;
            console.log('in van');
            
        }
        this.setState({price: price.toFixed(2)});
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
        console.log(this.pCoords, this.dCoords);
        this.calculatePrice(this.pCoords, this.dCoords);
    }

    newOrder = () => {
        axios.post('http://localhost:3001/api/v1/orders', {order: this.state})
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        this.setState({
            pickup: '',
            delivery: '',
            when: 'ASAP',
            vehicle: 'Car',
            price: '',
        })
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
                        onSelect={this.handleSelectP}
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
                        onSelect={this.handleSelectD}
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
                <button onClick={this.newOrder}>Submit Order</button>
            </div>
        )
    }
}

export default OrderForm;
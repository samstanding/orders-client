import React, { Component } from 'react';
import axios from 'axios';

class OrderTracker extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders: [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/v1/orders.json')
        .then(response => {
            console.log(response);
            this.setState({
                orders: response.data
            });
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h1>All Orders</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Pickup</th>
                                <th>Delivery</th>
                                <th>When</th>
                                <th>Vehicle Needed</th>
                                <th>Estimated Price</th>
                            </tr>
                        </thead>
                        
                            <tbody>
                            {this.state.orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.pickup}</td>
                                    <td>{order.delivery}</td>
                                    <td>{order.when}</td>
                                    <td>{order.vehicle}</td>
                                    <td>{order.price}</td>
                                    </tr>
                            )})}
                            </tbody>
                    </table>
            </div>
        );
    }
}

export default OrderTracker;
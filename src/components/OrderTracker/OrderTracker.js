import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Table from 'react-bootstrap/lib/Table';

class OrderTracker extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders: [],
        }
    }

    deleteOrder = (status_id, id) => {
        console.log('in delete function');
        
        axios.delete(`http://localhost:3001/api/v1/statuses/${status_id}/orders/${id}`)
        .then((response) => {
            let orderIndex = this.state.orders.findIndex(x => x.id === id)
            let orders = update(this.state.orders, {$splice: [[orderIndex, 1]]});
            this.setState({orders: orders})
        }).catch(errors => console.log(errors));
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/v1/statuses.json')
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
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Pickup</th>
                                <th>Delivery</th>
                                <th>When</th>
                                <th>Vehicle Needed</th>
                                <th>Estimated Price</th>
                                <th>Status</th>
                                <th>Delete</th>
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
                                    <td>${order.price.toFixed(2)}</td>
                                    <td>{order.status}</td>
                                    <td><button onClick={()=> this.deleteOrder(order.status_id, order.id)}>Delete</button></td>
                                    </tr>
                            )})}
                            </tbody>
                    </Table>
            </div>
        );
    }
}

export default OrderTracker;
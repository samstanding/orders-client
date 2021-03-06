import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import OrderTable from '../OrderTable/OrderTable';

class OrderTracker extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders: [],
        }
    }

    ordersGet = () => {
        axios.get('http://localhost:3001/api/v1/statuses.json')
        .then(response => {
            this.setState({ orders: response.data });
        }).catch(error => console.log(error))
    }

    deleteOrder = (status_id, id) => {
        axios.delete(`http://localhost:3001/api/v1/statuses/${status_id}/orders/${id}`)
        .then((response) => {
            let orderIndex = this.state.orders.findIndex(x => x.id === id)
            let orders = update(this.state.orders, {$splice: [[orderIndex, 1]]});
            this.setState({orders: orders})
        }).catch(errors => console.log(errors));
    }

    changeStatus = (order) => {
        let updatedOrder = {
            pickup: order.pickup,
            delivery: order.delivery,
            price: order.price,
            when: order.when,
            vehicle: order.vehicle,
            status_id: order.status_id + 1
        }
        axios.put(`http://localhost:3001/api/v1/statuses/${order.status_id}/orders/${order.id}`, {order: updatedOrder})
        .then(response =>{
            this.ordersGet();
        }).catch(error => console.log(error));
    }

    componentDidMount(){
       this.ordersGet();
    }


    render() {
        return (
            <div>
                <h1>All Orders</h1>
                <OrderTable orders={this.state.orders} changeStatus={this.changeStatus} deleteOrder={this.deleteOrder}/>
            </div>
        );
    }
}

export default OrderTracker;
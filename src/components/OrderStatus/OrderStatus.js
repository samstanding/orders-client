import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import OrderTable from '../OrderTable/OrderTable';

class OrderStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
        }
    }

   

    componentDidMount(){
        const { match: { params } } = this.props;
        this.getOrdersbyID = () => {
            axios.get(`http://localhost:3001/api/v1/statuses/${params.id}.json`)
            .then(response => {
                this.setState({ orders: response.data })
            }).catch(error => console.log(error))
        }
        this.getOrdersbyID();
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
            this.getOrdersbyID();
        }).catch(error => console.log(error));
    }

    render(){
        let status; 
        if (this.state.orders.length > 0) {
            status = this.state.orders[0].status;
        }
        
        return (
            
            <div>
                <h1>{ status }</h1>
            <OrderTable orders={this.state.orders} changeStatus={this.changeStatus} deleteOrder={this.deleteOrder}/>
            <Link to="/admin">Back to All Orders</Link>
            </div>
        )
    }
}

export default OrderStatus;
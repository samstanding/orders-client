import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table';
import { Link } from 'react-router-dom';

class OrderTable extends Component {
    render() {
        return (
            <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Order#</th>
                                <th>Time Submitted</th>
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
                            {this.props.orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.created_at}</td>
                                    <td>{order.pickup}</td>
                                    <td>{order.delivery}</td>
                                    <td>{order.when}</td>
                                    <td>{order.vehicle}</td>
                                    <td>${order.price.toFixed(2)}</td>
                                    <td><Link to={`/admin/${order.status_id}`}>{order.status} </Link> <button onClick={()=>this.props.changeStatus(order)}>Next Status</button> </td>
                                    <td><button onClick={()=> this.props.deleteOrder(order.status_id, order.id)}>Delete</button></td>
                                    </tr>
                            )})}
                            </tbody>
                    </Table>
        );
    }
}

export default OrderTable;
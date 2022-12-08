import { Button, Container, List, ListItem, Typography } from '@mui/material';
import React, { Component } from 'react';
import OrderService from '../../services/OrderService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class MyOrders extends Component {

    constructor(props){
        super(props);

        this.state={
            orders : [],
        }
    }

    fetchOrderData(){
        OrderService.getOrdersByUserId(localStorage.getItem("userId")).then( response =>{
            console.log(response.data);
            this.setState({
                orders:response.data.object,
            })
        })    
    }


    componentDidMount(){
        this.fetchOrderData();
    }

    handleCancelOrder = (orderId) =>{
        OrderService.cancelOrder(orderId, localStorage.getItem("userId")).then( () =>{
            this.fetchOrderData();
        })
    }

    render() {
        return (
            <div>
                <Container>
                
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell> # ID</TableCell>
                                <TableCell align="right">Order Date</TableCell>
                                <TableCell align="right">Book Name</TableCell>
                                <TableCell align="right">Quantity </TableCell>
                                <TableCell align="right">Total Price</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.orders.map((row) => (
                                <TableRow
                                key={row.orderId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.orderId}
                                    </TableCell>
                                    <TableCell align="right">{row.orderDate}</TableCell>
                                    <TableCell align="right">{row.book.bookName}</TableCell>
                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.orderPrice}</TableCell>
                                    {row.cancel?(
                                        <TableCell align="right"> <Button variant='outlined' color="error" disabled>Cancelled</Button> </TableCell>    
                                    ):(
                                        <TableCell align="right"> <Button variant='outlined' color="error" onClick={ () => this.handleCancelOrder(row.orderId)}>Cancel</Button> </TableCell>  
                                    )}
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>

                </Container>
            </div>
        );
    }
}

export default MyOrders;
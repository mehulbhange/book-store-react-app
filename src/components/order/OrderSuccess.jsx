import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderSuccess extends Component {
    render() {
        return (
            <div>
                <Container>
                
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                sx={{ width:'100%', marginTop:'10px' }}> 
                    <img width='200px'  src='https://dbdzm869oupei.cloudfront.net/img/sticker/preview/28824.png'></img>
                    <Typography variant='h4' sx={{marginTop:'5px'}}>
                        Order Placed Successfully
                    </Typography>
                    <center>
                    <Typography variant='body1' sx={{marginTop:'10px'}}>
                    hurray!!! your order is confirmed <br/>
                    the order id is #123456 save the order id for further communication.
                    </Typography>
                    </center>
                    
                    <Button variant='contained' component={Link} to='/home' sx={{marginTop:'20px'}}>
                        Continue Shopping
                    </Button>
                    
                </Box>
                </Container>
            </div>
        );
    }
}

export default OrderSuccess;
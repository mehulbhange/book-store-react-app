import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
import { Badge } from '@mui/material';
import CartService from '../../services/CartService';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';




class Header extends Component {

    constructor(props){
        super(props);
        this.state ={
            isUserLoggedIn : false, 
            cartItems:[],
            anchorEl:null,
        }
    }

    isUserLoggedIn = () =>{
        let token = localStorage.getItem("token")
        console.log(token)
        if(token){
            this.setState({
                isUserLoggedIn : true,    
            })
        }
    }

    getCartItemsCount= ()=>{
        CartService.getCartItemsByUserId(localStorage.getItem("userId")).then(response =>{ 
            this.setState({
                cartItems: response.data.object,
            })
        })
    }

    componentDidMount(){
        this.isUserLoggedIn();
        this.getCartItemsCount();
    }


    logout = () =>{
        localStorage.removeItem("token");
        window.location.reload();
    }

    handleMenu = (event) => {
        this.setState({
            anchorEl:event.currentTarget,
        })
        //setAnchorEl(event.currentTarget);
    };
    
    handleClose = () => {
        this.setState({
            anchorEl:null,
        })
        //setAnchorEl(null);
    };
    

    render() {
        return (
            <div>
                <Box sx={{ flexGrow: 1, }}>
                    <AppBar position="static" style={{background:'brown'}}>
                        <Toolbar sx={{ marginX: '10%' }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuBookIcon />
                            </IconButton>
                            <Typography variant="h5" component={Link} to='/home' sx={{ flexGrow: 1, textDecoration:'none', color:'inherit' }}>
                                Bookstore
                            </Typography>
                        
                            {
                            this.state.isUserLoggedIn?(
                            <>
                                {/* <Button variant="text" color='inherit' component={Link} to={'/cart'} startIcon={<ShoppingCartOutlinedIcon />}>
                                    Cart
                                </Button> */}
                                <Button variant="text" color='inherit' component={Link} to={'/cart'} startIcon={<Badge badgeContent={this.state.cartItems?this.state.cartItems.length:'0'} >
                                    <ShoppingCartOutlinedIcon />
                                </Badge>}>
                                    Cart
                                </Button>
                                
                                {/* <Button variant="text" color='inherit' onClick={this.logout}>
                                    Logout
                                </Button> */}
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        open={Boolean(this.state.anchorEl)}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem component={Link} to='/my-orders' onClose={this.handleClose}>My Orders</MenuItem>
                                        <MenuItem onClick={this.logout}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </>
                            ):(
                            <>
                                <Stack spacing={1} direction='row'>
                                <Button variant="text" color='inherit' component={Link} to={'/login'}>
                                    Login
                                </Button>
                                <Button variant="text" color='inherit' component={Link} to={'/register'}>
                                    Register
                                </Button>
                                </Stack>
                            </>
                            )
                            }
                            
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        );
    }
}

export default Header;
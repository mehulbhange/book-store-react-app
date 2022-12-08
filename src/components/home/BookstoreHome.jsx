import React, { Component } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Icon, IconButton, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Stack } from '@mui/system';
import BookService from '../../services/BookService';
import CartService from '../../services/CartService';
import { Link } from 'react-router-dom';

class BookstoreHome extends Component {

    constructor(props){
        super(props);

        this.state ={
            userId:'',
            books : [],
            cntMap : new Map(),
            addedToCart:[],
        }
    }

    fetchBooksData(){
        BookService.getAllBooks().then( response => {
            console.log(response.data.object);
            this.setState({
                books : response.data.object,
            })
        })
    }

    cartItems(){
       
        CartService.getCartItemsByUserId(localStorage.getItem("userId")).then( response =>{
            //let bookId = response.data.object.book.bookId;
            //console.log(response.data.object)
            response.data.object.map( cart => {
                let bookId = cart.book.bookId;
                if(!this.state.addedToCart.includes(bookId)){
                    let books = this.state.addedToCart;
                    books.push(bookId);
                    let cnt = this.state.cntMap;
                    cnt.set(bookId, cart.quantity);
                    this.setState({
                        addedToCart : books,
                        cntMap:cnt,
                    })
                }
            })
                        
        })
    }

    componentDidMount(){
        this.setState({
            userId:localStorage.getItem("userId"),
        })

        this.fetchBooksData();
        this.cartItems();
    }

    componentDidUpdate(){
        
    }

    incrementQuantity = (id) =>{
        let cnt = this.state.cntMap;
        if(cnt.has(id)){
            cnt.set(id, cnt.get(id)+1);
        }else{
            cnt.set(id,2);
        }
        this.setState({
            cntMap:cnt,
        })
    }


    decrementQuantity = (id) =>{
        let cnt = this.state.cntMap;
        if(cnt.has(id) && cnt.get(id) > 1){
            cnt.set(id, cnt.get(id)-1);
        }
        this.setState({
            cntMap:cnt,
        })
    }

    addToCart = (bookId) =>{
        let userId = localStorage.getItem("userId");
        let qnt = this.state.cntMap.get(bookId)?this.state.cntMap.get(bookId):1;
        let object = {
            "bookId":bookId,
            "quantity":qnt,
        }

        CartService.addToCart(userId, object).then( (response) =>{
            this.cartItems();
        })

        window.location.reload()
        
    }

    handleSort = (event) =>{
        if(event.target.value === 1){
            BookService.getAllBooksSortedByPriceAsc().then((response)=>{
                this.setState({
                    books : response.data.object,
                })    
            })
        }else if(event.target.value === 2){
            BookService.getAllBooksSortedByPriceDesc().then((response)=>{
                this.setState({
                    books : response.data.object,
                })    
            })    
        }else{
            BookService.getAllBooksSortedByName().then((response)=>{
                this.setState({
                    books : response.data.object,
                })    
            })
        }
    }

    render() {
        return (
            <div>
                <Container >
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        sx={{ marginTop:'10px', }}>
                        <Typography gutterBottom variant="h4">
                            Books({this.state.books.length})
                        </Typography>

                        <FormControl size='small' sx={{width:'100px'}}>
                            <InputLabel id="sort">Sort</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label"
                            id="sort"
                            label="Sort"
                            name="sortBy"
                            onChange={this.handleSort}
                            >
                            <MenuItem value={1} >
                                <Typography variant="caption">Price: Low to High</Typography>
                            </MenuItem>
                            <MenuItem value={2}>
                                <Typography variant="caption" >Price: High to Low</Typography>
                            </MenuItem>
                            <MenuItem value={3}>
                                <Typography variant="caption" >Name: Ascending</Typography>
                            </MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    

                    <Box sx={{ flexGrow: 1, padding: '15px', background:'#EFF5F5' }}>
                       
                        <Grid container spacing={2}>

                            {this.state.books.map( book => (  
                                <Grid item xs={6} sm={4} md={3}>
                                    <Card sx={{ maxWidth: 300 }}>
                                        <CardActionArea>
                                            <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png"
                                            />
                                            <CardContent>
                                            <Typography gutterBottom variant="body1" >
                                                {book.bookName}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                by {book.author}
                                            </Typography>
                                            <Typography gutterBottom variant="body2" >
                                                Rs. {book.price}
                                            </Typography>
                                            
                                            <Stack direction='row'>
                                            <IconButton  size='small' onClick={()=> this.decrementQuantity(book.bookId)}>
                                                <RemoveCircleIcon />
                                            </IconButton>
                                            <IconButton size='small'>{this.state.cntMap.get(book.bookId)?this.state.cntMap.get(book.bookId):1}</IconButton>
                                            <IconButton  size='small' onClick={() => this.incrementQuantity(book.bookId)}>
                                                <AddCircleIcon />
                                            </IconButton>
                                                                                           
                                                {this.state.addedToCart.includes(book.bookId)?(
                                                    <>
                                                    
                                                    <Button variant="contained" size='small' component={Link} to={'/cart'} startIcon={<AddShoppingCartIcon />}>
                                                        <Typography gutterBottom variant="caption" >
                                                            Go to Cart
                                                        </Typography>
                                                    </Button>
                                                    </>
                                                ):(
                                                    <>
                                                    <Button variant="outlined" size='small' startIcon={<AddShoppingCartIcon />} onClick={ () => this.addToCart(book.bookId)}>
                                                        <Typography gutterBottom variant="caption" >
                                                            Add to Cart
                                                        </Typography>
                                                    </Button>
                                                    </>
                                                )}
                                                
                    
                                            </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                
                            ))}

                            
                            
                        </Grid>
                    </Box>


                </Container>
                
            </div>
        );
    }
}

export default BookstoreHome;

import { Stack } from '@mui/system';
import React, { Component } from 'react';
import './Login.css'
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email : '',
            password : '',
            errorMsg:'',
        }
    }

    onValueChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    loginUser = () =>{
        let user = {
            email: this.state.email,
            password: this.state.password,
        }

        UserService.loginUser(user).then( (response) => {
            localStorage.setItem("token", response.data);
            UserService.getUserByToken(response.data).then( response =>{
                console.log("data fetched")
                console.log(response.data.object.userId);
                localStorage.setItem("userId",response.data.object.userId);
                
                this.props.history.push('/home')
            }).catch( (error) =>{
                console.log("something went wrong")
                console.log(error.response)   
            })
           
        }).catch( (erro) =>{
            this.setState({
                errorMsg:'Invalid login credentials!'
            })
        })
        
    }

    render() {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '50ch', },
                    }}
                    noValidate
                    autoComplete="off"
                    display='flex'
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={this.preventDefault}
                >
                    <div className='loginBox'>
   
                        <Typography variant="h4" component="h4">
                            Login
                        </Typography>

                        <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        name="email"
                        type={'email'}
                        onChange={this.onValueChange}
                        />

                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={this.onValueChange}
                        />
                        
                        <Typography component='body2' color='red'>
                            {this.state.errorMsg}
                        </Typography>

                        <Stack spacing={4} direction="row">
                            <Button variant="text"> Forgot Password ?</Button>
                            <Button variant="outlined" onClick={this.loginUser}>Login</Button>
                            <Button variant="outlined" component={Link} to={'/register'}>Register</Button>
                            
                        </Stack>
                    </div>
                </Box>

            </div>
        );
    }
}

export default Login    
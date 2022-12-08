import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import './Register.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';


class Register extends Component {

    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            date:'01 01 2000',
            submitMsg:'',
        }
    }

    onValueChange = (event) => {

        this.setState({
            [event.target.name] : event.target.value
        })
        
    }

    onSubmit = () =>{
        let date = new Date(this.state.date);
        let day = date.getDate().toString().length<2?`0${date.getDate()}`:`${date.getDate()}`;
        let mn = date.getMonth() + 1;
        let month = mn.toString().length<2?`0${mn}`:`${mn}`;
        let year = date.getFullYear();
        
        let user = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            dob:`${day} ${month} ${year}`,    
        }
        // console.log("user data")
        // console.log(user)
        UserService.createUser(user).then( response => console.log("User created successfully!"+response))
        .catch(erro => {
            this.setState({
                submitMsg : 'Something went wrong! User not created',
            })
        });
    }
    
    render() {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '75ch', },
                    }}
                    noValidate
                    autoComplete="off"
                    display='flex'
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <form className='registerBox'>
   
                        <Typography variant="h4" component="h4">
                            Register
                        </Typography>

                        <Box sx={{width:'75ch'}}
                            display='flex'
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                        <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        type={'text'}
                        name="firstName"
                        onChange={this.onValueChange}
                        />

                        <TextField
                        id="outlined"
                        label="Last Name"
                        type="text"
                        required
                        name="lastName"
                        onChange={this.onValueChange}
                        />
                        </Box>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birth Date"
                                value={this.state.date}
                                onChange={(newValue) => {
                                    
                                    this.setState({
                                        date : newValue
                                    })
                                }}
                                
                                
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField
                        required
                        id="outlined-email-required"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={this.onValueChange}
                        />

                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={this.onValueChange}
                        />

                        <Typography component='body2' color='red'>
                                {this.state.submitMsg}
                        </Typography>

                        <Stack display='flex'
                            flexDirection="row" 
                            justifyContent="end"
                            spacing={2} 
                            direction="row">
                            
                            <Button variant="outlined" component={Link} to={'/login'} >Cancel</Button>
                            <Button variant="outlined" onClick={this.onSubmit}>Submit</Button>
                            
                        </Stack>
                    </form>
                </Box>
            </div>
        );
    }
}

export default Register;
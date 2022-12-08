import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container, Stack } from '@mui/system';
import CartService from '../../services/CartService';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton, TextareaAutosize, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OrderService from '../../services/OrderService';

class Cart extends Component {

    constructor(props){
        super(props);

        this.state ={
            activeStep: 0,
            cartItems:[],
            firstName:'',
            lastName:'',
            city:'',
            zip:'',
            address:'',
            landmark:'',
            addressType:'',
            contactNo:'',
            cnt:0,
        }
    }

    fetchCartItems = () =>{
        
        CartService.getCartItemsByUserId(localStorage.getItem("userId")).then( response =>{

            console.log(response.data)
            this.setState({
                cartItems : response.data.object,
            })
            if(response.data.object){
                this.setState({
                    firstName:response.data.object[0].user.firstName,
                    lastName:response.data.object[0].user.lastName,    
                })
            }
                        
        })
    }

    onValueChange = (event) => {

        this.setState({
            [event.target.name] : event.target.value
        })
    }

    checkValues = () =>{
        console.log(this.state)
    }


    componentDidMount(){
        this.fetchCartItems();
    }
    
    handleNext = () => {
        
        if(this.state.activeStep < 3){
            this.setState((prevState) =>({
                activeStep: prevState.activeStep+1
            }))
        }
    };

    handleBack = () => {
        
        if(this.state.activeStep > 0){
            this.setState((prevState) =>({
                activeStep: prevState.activeStep-1
            }))
        }
    };

    handleRemove = (cartItemId) =>{
        
        CartService.deleteCartItem(cartItemId).then( () =>{
            this.fetchCartItems();
        })
    }

    handleIncrement = (cartId) =>{
        console.log(cartId)
        let item = this.state.cartItems.filter( (item)=> item.cartId == cartId);
        if(item){
            CartService.updateQuantity(localStorage.getItem("userId"),cartId,item[0].quantity+1).then(()=>{
                this.fetchCartItems();
            });
        }
    }

    handleDecrement = (cartId) =>{
        console.log(cartId)
        let item = this.state.cartItems.filter( (item)=> item.cartId == cartId);
        if(item){
            CartService.updateQuantity(localStorage.getItem("userId"),cartId,item[0].quantity-1).then(()=>{
                this.fetchCartItems();
            });
        }      
    }

    handleCheckout = () =>{
        
        OrderService.placeOrder(localStorage.getItem("userId"),this.state.address).then( (response) =>{
            console.log("order placed success");
            this.props.history.push('/order-success');
        })
        
    }

    
    render() {
        return (
            
            <div>
                {this.state.cartItems==null?(
                    <Container>
                        <Typography variant='h6'>
                            Cart is empty!!!
                        </Typography>
                    </Container>
                ):(

                <Container>
                    <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                        <Step>
                            <StepLabel> Cart Items ({this.state.cartItems.length}) </StepLabel>
                            
                            <StepContent>
                            
                            {this.state.cartItems.map( (item) =>(
                                <>
                                    <Box
                                        sx={{
                                        '& .MuiTextField-root': { m: 1, width: '50ch', },
                                        paddingLeft:'10px',
                                        
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        display='flex'
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="left"
                                        
                                    >

                                        <CancelIcon sx={{marginRight:'20px'}} onClick={() => this.handleRemove(item.cartId)} /> 

                                        <img height='100px' width='65px'
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAEYCAMAAADCuiwhAAABOFBMVEX+8gAAAAAAre//9QD/9wAAAAP/+gFZVQH//AD/+AD88ADQxgOrpAX16gHUzAMoKASFfwMWGAK+tQNtaQXs4QQ6OABWTwLTzgIiIQEAqfhMSQMAqu9GQQIAre4AqvQ9PAIAqPu3rQNmXwPc0gDL4k3B31wApf+z22w0MQNOu8xkxKwYtNf28QBDuNCBy5k1uO+x2XPK4VdiwLk1tu////zG6vjV7vdPvu/j9ftpx/Kb04Dn2wPv7iCz4PaG0vR3cAMOCwOemAfk6ylHvMWu1obb50Le6D0ost6c1IWQzZE8uvS63WRSvb5+zPOg3fZ7yKR20/Da9ve+6vNt0PGn2PWUjwppxfTX7vyd3/I5wvL9//fd6R+QzZqo040gHgcIEQLm6T7S4mLW5VFjwrST1XVnxqJzxb19x6wqij38AAAW0ElEQVR4nO2di1vaSNfAA5MBkhBEQGuMSUG8YEXRRi5yFVxEa8W33drufu3abn3f3f//P/hmAiSTZJKgotLnyenFlmSSX07OnDkzc2ZgmEACCSSQQAIJJJBZCv/SAFMLAEyx1//ZP2vif/4SApqX+3sDTZEVZbD7tt7/BbDZjTeaqspyGAv6IYX36sX55gY/T1U1bBVZLZ0z84sNiv+qcpgi6mBjbqn7A7uWDW1LFy8N5yLbsqzQmZV3ivS2+NJ8FAEHEmkaGsEvazU5rJ7OHzW4VGWtGtaOdcx38h/HugfBf2mKVkGPoL5/aUaH9GVZbh9VtUoY+Tul8u6dFm5fKe1hWSm3alcYOixdz1lt5HeRStutMoIuf6wcH7WGV612uV2plv9Tk9BPTXci23NFDfaR35CPh+1hrVqWPpTK79qfKtUhgkV/ypV2SxvZdvOlQQkB/bCMoctq+Ug7Gh5Vhx/aQ608DF9ppZKshccNZFj9d45UDd5iBy2X2vrvqqLIiBNJ2N7UKP2XRjUEKVonCsuIFlW5kbtGARP+wOK61fmpi+BadWlVqlft47G25Tmz6uKuTqQZDYqi6ZAysvJ2G2tbq5baI1UfvDTsRH7qIUe1Vm5hVmTL7yqy9lnThtXqlzbyfeVSrVUdKvjJ1LdPax886naw+LffieBcr4bVL6Uy8nqlarn96ei48h+lNqwdl69atWH5GDXjn0dGsuvRmLMOuecTspEY20ikkAgNNhZhvaDf69Da0ceP1drww7vylVZBhnFV+/33auW43Gq1/qyElXJpZB9n7tcRclZJpRIiuvWU5CDCpJJLMDQWuJRMAc61bHFPjzKUmvSlXfvzuNSulWrDYeWqWh5qV1pVrpbkSUVEbfml63Uiq8YdjTuH4GpXYNzvbQjLCml8OiTKhuC6AFzU3RyMat+HDy0ZNd0IVNY0WdWjJeT20C/CXat1d+ionXl8d5jM+3SQAZMqOJ5YL7uQ46lFm9rYqcly2N6iyLoTURXDJar794bGsp7nPJg5wfmSDOzXAq1oz8VJIz3Lx78r4avycakiPw46BJOiW0HA30BXZv1FUZTdU6gdQ1mrtNvl1qfSh3e1agV1XuRHQYcKryLUYmxm1YsZ2/brhqNWNEtj6BEWakxk3Zq11vBLSa4NP6koSh22w/oLUS8eBo3vnuIoA1Zc/sS7GJbFhN1Exg0igjrWSlV5qAxb71rlNmoPW+WqWrtqSa12rTZuLtWDB0NjagqzXcv0Cukw7J1xJ7zVqh3XNPSnXG6hkENGzUwZdVpqn2pa5fijpj+adOjG7A8dggm7AwMNmpu0uL6x5K3KQvHS2OfJrc+tWrv64fi4dYUQSx9RZ0aTFeQD8SCZrmqlNwU0TCeRdFa/2+99K9qYxRUrMFyPCw1RbAjxdWgpDG+tFRlsS6Oa166VwwrqpFTb49gJxaXyyHAmv+Q992acgE7EOCyxRs7iyyBMW98yWLcgF3J8TG/7ActG+JzVda9bVd0zHbUycswOV4KeQSmhiuoVUBPmIYzPAlwEu2CimRPI8lycwIKwaw1WONAllQ3jVts6lcd+Gf+ieW3lo6bIR3gcwd2kSU2baDwAN6TCCoSqQeaEeJxCw+ESuTwRi0CYIR8JHNiGw1Cny3TXuJkMVzRFq2neQR4VGn+eI6mJQyBJMK+JlCiDFZeJUzqWpyoORqar6D0tWS4dy1jlVQ3zfy6Vy9qXauWPo5KsnnvEEG7QDNclqFdjBjPpOZboDSYQXxMGYlW1HlGHtbDyWVOOh1ca6oqjSHr4Z1j+o/yufHw1/NIuS5XP8sBraMwVmmGJ+gYbk2OEoqH5qZ2afLKkVdW4fUFNSblVKx1VK1fIPf8xrLZaclj7vdIul9tfPpfLlWrWvWXxhLbcOT6xapH2oUPIygqtV91UZeVI0ipS5c8jBSFXP3zCgQfuJf4uHx/LGnLTsrzjGWB6QEcIpa6N7YM1aeCq12VNA4E5i92DfUlGFjFEIfX/DYdKNYx+yyP3J5su0Lsr7g5tUTUcNzCs6SGh4NGzYgXzvKjVwYAdVS7podKRqqJKKDtdn3ToHcl7QDOxNdMUxgd5omfl/QYXjDNPbBFXcXfs96rUQBUx173ieB9o0oGMGgkgmNBdetBqlHV/Jc09VW/45DCteZE9+llTQIOEidjRH541HwMmPC8NzEDQ3ioiXb91m3LBUci2V4feH5o1zWNZr4mRjoGy4DMvHDPfUsf5ti9kl/ExaW+KOVAvaCby3bjxkg4dKxgfrHpaB+7mmw9MObV/SpuTU5ULepf4HtCceeOCftBbfdaySfOBKdAAbO5IViORVXm/OdV4i7emzUZxQfd5MdNeuj7QbNf2wE7s/vVAkvBMs6yqqqSe/jbtLLMXNB/pGDdesUM7apcdOm4+sKv5s18Pvr15v3P69vqvwyI79RSzt6afGhrrG6DOwz3zJryh03Zo06b9zINw1Av3Ino0NFERGRt00g/6xizr42hmCg1iZg+2MPLT5gfRGOVqJLRZideeE5o04ZFbJnqUBR+bjpnDOWmflzJTaNAwodMjTZtdR5j3bsYzRlHoZ/6zhc7Z6x1rfmILk+1Cnpma9eyJFzTRtoxvDDJEH8BTf7E188zMc0KLxNjHuDsIFozTQ688WFCQNykLl3yq7EyhubgBDRfGDoAljNqrfhEeHnZ9Q80ZQvMrJuDEKxMaRL0ZVxpWIHpqbn32p4AmPAUZ8RO26jLsgQc+iEGm1Zlbh8dgDaGs0K3RPHA580lg2qXVYM2Yheb+nwyay9+aNw4RZskTw6IwSdUiR46c0YLpJ4EGTCSxSDCT4y0gR46npiMOPQKuQ46bPoGiLdATdQLboCm0DCWBKAENCw3b4DXXWCLKerqYGUCHBE4PbiNA7C5amJesWJbJCwiTDVxsdIxjM9g0zBNOZt6wWKFhPCEIQiqeXLZN+9gHC6yjwPrsRUMUeV4UM3j+wnKMMss0U2iDwTJXBW3GgYXos07KLL6OLr9etE9yzT5UcoF28CSdLxikvQtNhFL0eaCpNwZpr+naUUFUdObt93TQboGD1b24FH0a2/CDhieOmeKJcCmfuXEoPEGrMgU0vPHo2rOZqAc1TLvmLzwdNNLU7Y3oqSsQEdao2oYQriaeTs0YepnGfLKUnCIfiOWEdVrhtOBs3GcqXHLdKunOTU5osNxUNZ+NNXLrBTyXr7topOOldCrzxMgoaOMiFolFOO4+g1QARMS8EE8mO51kMi7kRc8ctzkSHLDoct8xuUACCSSQQAIJxBDAcpEYEtSgTp0kz/kJkXMVcUoM3YqKYpSPeE3IcRFGiN90osvL0fRNPNVAoc8U4Fxn6bWnLBjTFCCxsGSXtWiymxKdGfUgXxiXX3KfROdA/qYwDsnhKIiH0XgD+HbT/HNNTWjB5Qy41s3Y3ixIGEe/u4yacmKXmugOl+Li1EkqD4fWBxoylhsR0Iv0QUrxhpZRq18L9fO8sWcDjW9lmXf2gQYgt+JxMdTXSz0PNEwSE/Le0CCz7jkCgQ6eiI5Ss4fG0pkSmkvc+o6aeA6aPAga2n5O/mvmYnlB+wyZ6Ff67qXoB2rajZpwj67QkRw9Gd/6+FNWRLcr0aBfC7qk4rYxvag/NNKznRDqVYIcrrWn8rlDp0SqGOUJ81iOjRenRbiUZeB/8oSu0ETa3LjIyVoylxISSAXd6HgS0Dm67AbtMS3ohDYvCoCZ9kbMN7pAA3HBAg1Xc5kYh1NrAAu4GEjc6A2OT1PumToxDbR13Lcw+cwFmu2QzHBVsAVJgONTa36Kngl0g1ipI3pCA9KgIezytER3puu3f80MoJmI2VRMpshcoHkihd19MPhRaZvTQhMp3jDHeUBbF25QF9JNJbOAJpvKuBc0v0QwP2Lia+bQHuZBWjT0yzabG2hiUmzlMTMFs7Fp4qV7QBOLIHy92pNDE7lOk0afBs0S1rHiGRA9AzTppyHvDk3kRPrmT04NnYhRetsRosF2geaIFjHqEXuwZhLoIzNXCOhoJ02RpPEiXWIPS0rKpM9FgwamN198XHKCb2i6QIEOjaEBinHy5PTYZDkMFdpcbhJae9w0h28noEDVdIyLcByTEbpLlmc1TJUCDfLmedHHTTM+CFoP2o2/zQ/Nha00aKK434KCp4GmysRJ/0LQkOzY+UG/iHnQoMksCxq0+VFofWbQdPcxFTQq+t0StdG8B5GN7beyZ2poSN8pYDpNw451tS019jCr7cKjWnFLM87wNDFBXKG/32Q411FTs3Excyp90tzvAz11b9y8OYSFdDzhHFGmNuNkevKsYo97BEzRmCnUsXtqwEQsb1ydmaYfGprSzqWZB7FXhXNXiDmFZnhzYWBoHTxin9vnhGbJNPLHLMl4TmhLau1jOonPCW0ZQIPLvwo0OWQK16eZMnx5aIYjFguE4Cp9Dss/Eep5oUGGzNrHo0yOWVMOpHzby+eFZjhbwviqwHNGnjseoxbjBQjXfVaZ+PbGzczAWUAjA7GlwReSQkYEqPfGiJl8dzT+6qdq++5ATjG39pgFNMNYtsPRo1pYWEbd/uhSKDQ55NOHJKBduuO0KblHQJOrjVzFZ8+Ch80jPkbTQHztT+2t6ueHZgDvlXk9voNnnPwC0MhL3FDvRMryvEHj2fEF6r1MWZv5hP6joRkWdE9cZ8hRf6jr2Sy+EDS6sXhDTflAXm/BJ0eFXITvDw0nsuYLbZ4LXZo3wImp9Vub04ahQjrlvRYBF82/8hHTuMREfiSv/DvTxrl5j3NBJCPcrL/+rrcwiDfaiefFyBSZ48BPqOf6XnbKcwEb4cRMQxfUmk+9CezLy9SKCCSQQAIJJJDnEZzpHomN1sr9Gg0q4Jh8N72gbxQMlzpdgXcmoFMmNXwP2z+jzpG4zpl4I7MZe3wLo92MNV4yd89YoSVFExvaGKEhsdPXaLKfvtTULlNN+HNiEjrm5CDeiZ5IOCPGD2n70BBjXubsVcRczT+Gpq1wfRA0l1px6fvAZWIHjQdAc08Gbdni1oHdmVjYXGk64sWMOsaP0fRTQZNb+VDEHKKaJ2jeixkSWX9zBM1Zh3vGGeNGAj2RjPYU0C4K84PmLcTrOQF1oIXc+mSBRI5M4pgFdHJt1RQz+fR2lRSfCX82ZRKH0o0YC0Y714ipqL6WinjkmUAz5Or6mHHzUMcypO/NTGxsBWGH3BCAxd/IYRmTnw00XWMht42o6NDmuCu07dEJwI1lm+6ZNC4zgSY2tnOWs05gz4+mTWh44zNCN0fQpnn47U41P9Dkzul+E4lzA02Ugz7pcvMDTezliTdd8lL2/EAjozahYdT5HT1zCc28snwtiCNb7XHQT+Onkaqt66m+J/MxOrYFmjL8njES755e0wxvnR9DRkL/bjUCuiBmnJJ/RvOwfkXLiHvxRqRslEhswU8Vo/wzQDNsZsExqQeTjnkxxwJIV3kOaAaIjr3kUFzatQdQ8wXNAC7nXBYNCwlbqu58QevDNc6UD/uy+3mDRtfPJBftd7dsTPgQ6Kfy0yYUl4nbE0hI6nnUNBaOF6zbFEBiPdu8QuOvxMxbE7rIZffGgZM1ipgLaJ8bGltJ3pKaEKWOMHGOb2WNPGsz7sSOWVfwGkvf5ifKowknEGsx0r8INBMhNxjnfxFoPO9gICYmyznnJ56mC+nfjCXK865pxvQFk71Y5h8aiMY0DJxDaJa29wNedTDH0FwOCpTOFbnZwvzZNH8SgtGEfcADiETHUZg3aH0FNe7LisTOsYATo3Psp0cLqvR08WQiw0VY/MWuETFHrFgiVrDPiZ8GxlQ16k2v4I3kUvGb9RXLXvCT9b7zomnbaogRqy1qfm1QzQc04YxdhfimhjmBJlf4uDB3Zzv5+Xho3nfrfHLf/DmBRnGz5wIOywL2uYFmAEgRX0dqlyXLVklzA42xEx3nUJ6eyBS37uM0PfTKM4yaxkQhifVtDoqG4EJHsAdSIPF9ZSS31C8eyhQmh1+b0DeTMt/p0OOjiw/Y04GN8Bmhm0yvLi0sFFbTyXhepOxfz2cykw3paBfhjaPEYXHyYYZWhlpkauFxwBFhGZ4XeZ5zy8qbMlfvl0jpCySQQAIJJJBAAgkkkEACCSSQQAL5heQeayiB5YdT+HtdbUr5uvHV8Vn/9NpvIWOvf4ZPaW709Iv0nRfBAvDhjdP9+wCx/puOsXvZgeOkjexe0afc9pbSRFDftu5QaVbbuqDdCWxvZZtgc2tvWmCA1xl2Bb/TziRZPnRAS37Q4IcsnaEfp+ouOrOoqo5r6HIphZvMZnZnOmSGuUkz6xDe+nwFJ9iXTqU39hFSf2imuCttA6Yoy+E+Pj9MP183j6mhQRcmcXZMMRVveFHzA+mrrDXvDw3eS98A4jnN1gH4Tdpl6ZUAMGBqaMDfwkI0FFrEW3nlPDY1ulRP2bvsAX6uYq8Jen//LIIxNGj2egzf0ytas4c+Rn8V/z4cPyC4kN4CcK1eyviH9C8qBYo//z5DpZr6+fzPv5vomj0G6ND61RgA+qM7YDkz/6kLz09yTHBis/uINbiT6uzm1im+5Xb47bm8pe71R9Ds4aB0CH4MsM2CO/kA6Vb57242ez6+z2F2t8juKsW9QZPdyf6GVNrfUyX1+jx8AcD/lIud7NY+OFT2AIZGf2mDDXTKjpxVdy9x+R76pzQ4MKkj6YSxef9S/pU7dE9TkToGYVyntrPa4OByR0XOBHkPcIkqF2B+hHXot+hlsKeqfHpx15sULcnNYvZ95N9sH2jSV/xBdu/8oqSp+wC8UcN753d9cIjsBpsHuy0pG0i3Svb9xVtV3kTvYpDd+XYnS9uGh4/Bxehk8ufktutq1MgY71jAXmeRw0LQyhkATS17hjS9c6CqfVTuhzKClnToHaKZKO5m+5db5wD96YVVFlVpdYfB5SUMLe3qSQ2Hqg59+l81fAZ49F6vkX+sY83vZ5FZgW11YNSFmDXz0nUTUbCnnl5fX99JiAxBn7IMz5ayGwB5A3XQw6V+KANT09ltMsn3jXRwjc79obzdlN6jAzvZTWxl33TosRWNoCVFHTQBfk4Vv6fiQOmx6JHxGbvZs8k12bhlki3tVhP7sqyqkiQp0uEYmhlDK/LgjHFAb5IPXJeud2VUffYG+9iRIOgN/PlFVof+jYTW5AGmbQ6Q1+YRu3LGDbJfda1l+8YVIykjX3QlvthxgUbv6G7j8PBwQ6/9FmhkHlpfv4/0A91+V/2bYUeqNOSnOpDfA+xBBtIlwHV6H2t6R3JAZ0/rkoI1uqOf2Fd3m0gN6F2AniYb7hYIcWMxOMyl3PakRK/rEB9Clyk1rZreAwdq+CdGyZ72f+xLg6YDulkKq38hK96WZAm//E1VPu/1rlXVCb3D1iWtD8CBVNr+cbiLn25TVQ5+HO5k35j5PA04WZgMQ2mXxTYMqkODURsC9rYO2O2tHVYPIxD01m4RbMsqMofeblZSs8omA9i9rUvySuyetIVfxpk8jl4u1CyqCv/bugbgbusv/aPN7ABBb+1hXhkpaF/KIkd3hy3uXM2q2ewp0a5x8UW4kjwJQaRw92/HOKxPVLdR32TO6riegYN6j+nVt9G/Nuv/RVcX6//+c65Xyu16z1J8s17XG6WD+uX4Ktf/nBd/1jfwoZGp9uoHjHG1A3S1n/v/XI9qBuh/++ffS8sF2UxDjKPWkP0OPZtxQ+uMJSQeJWEZG46C0XHneh37/0eX4c1Tgf1kYkcu4IyzI/iL5gQxORXz3AjI5Hng/63ycybBzmiBBBJIIIEEEkgggQQyY/l/seOje7KoREoAAAAASUVORK5CYII="></img>
                                        
                                        <Box
                                            sx={{ marginLeft:'15px'}}
                                            display='flex'
                                            flexDirection="column"
                                        >
                                            <Typography variant='body1'>
                                                {item.book.bookName}
                                            </Typography>
                                            <Typography variant='caption'>
                                                by {item.book.author}
                                            </Typography>
                                            <Typography variant='body1'>
                                                Rs. {item.book.price}
                                            </Typography>

                                        
                                            <Stack direction='row'>
                                                
                                                <IconButton  size='small' onClick={()=> this.handleDecrement(item.cartId)}>
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                                <IconButton size='small'>{item.quantity}</IconButton>
                                                <IconButton  size='small' onClick={() => this.handleIncrement(item.cartId)}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Stack>                                            
                                        </Box>
                                    </Box>
                                </>        
                            ))}
                                

                            <Button variant='contained' onClick={this.handleNext} sx={{marginLeft:'35%'}}>Continue</Button>

                            </StepContent>
                            
                        </Step>
                        <Step>
                            <StepLabel> Customer Details </StepLabel>
                            <StepContent>
                            
                                <Box
                                    component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '30ch', },
                                    }}
                                    
                                    display='flex'
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="left"
                                >
                                    <form className='registerBox'>
                                           <Box sx={{}}
                                           display='flex'
                                           flexDirection='row'
                                           >
                                            
                                            <TextField
                                            required
                                            id="outlined-required"
                                            label="First Name"
                                            type={'text'}
                                            name="firstName"
                                            onChange={this.onValueChange}
                                            value={this.state.firstName}
                                            />

                                            <TextField
                                            id="outlined"
                                            label="Last Name"
                                            type="text"
                                            required
                                            name="lastName"
                                            onChange={this.onValueChange}
                                            value={this.state.lastName}
                                            />
                                            
                                            </Box>

                                            <Box sx={{}}
                                            display='flex'
                                            flexDirection='row'
                                            whiteSpace={2}>
                                            
                                            <TextField
                                            required
                                            id="outlined-required"
                                            label="Phone Number"
                                            type='number'
                                            name="contactNo"
                                            onChange={this.onValueChange}
                                            />

                                            <TextField
                                            id="outlined"
                                            label="Pincode"
                                            type="number"
                                            required
                                            name="zip"
                                            onChange={this.onValueChange}
                                            />
                                            
                                            </Box>

                                            <Box sx={{mx:'8px'}}
                                            display='flex'
                                            flexDirection='row'

                                            >
                                            <TextareaAutosize
                                            required
                                            aria-label="Address"
                                            lable="Address"
                                            minRows={3}
                                            placeholder="Customer Address"
                                            name='address'
                                            style={{  width:'100%' }}
                                            onChange={this.onValueChange}
                                            />
                                            </Box>

                                            <Box sx={{}}
                                            display='flex'
                                            flexDirection='row'
                                            >
                                            
                                            <TextField
                                            required
                                            id="outlined-required"
                                            label="City/Town"
                                            type='text'
                                            name="city"
                                            onChange={this.onValueChange}
                                            />

                                            <TextField
                                            id="outlined"
                                            label="Landmark"
                                            type="text"
                                            required
                                            name="landmark"
                                            onChange={this.onValueChange}
                                            />
                                            
                                            </Box>

                                            <Box sx={{mx:'8px'}}
                                            display='flex'
                                            flexDirection='row'
                                            >
                                                <FormControl>
                                                <FormLabel id="addressType">Address Type</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="addressType"
                                                    name="addressType"
                                                    onChange={this.onValueChange}
                                                >
                                                    <FormControlLabel value="home" control={<Radio />} label="Home" />
                                                    <FormControlLabel value="work" control={<Radio />} label="Work" />
                                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                    
                                                </RadioGroup>
                                                </FormControl>
                                            </Box>

                                            <Box sx={{mx:'8px'}}
                                            display='flex'
                                            flexDirection='row'
                                            justifyContent='right'
                                            >
                                                <Button variant='contained' onClick={this.handleNext} size='small'>Continue</Button>
                                                <Button variant='text' onClick={this.handleBack}>Back</Button>
                                            </Box>
                                            

                                    </form>
                                </Box>
                            
                            
                            

                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel> Order Summary </StepLabel>
                            <StepContent>
                                {this.state.cartItems.map( item => (
                                    <>
                                    <Box
                                        sx={{
                                        '& .MuiTextField-root': { m: 1, width: '50ch', },
                                        paddingLeft:'10px',
                                        margin:'5px'
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        display='flex'
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="left"
                                    >
                                        <img height='100px' width='65px'
                                        src="data:image/png;base64,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"></img>
                                        
                                        <Box
                                            sx={{ marginLeft:'15px'}}
                                            display='flex'
                                            flexDirection="column"
                                        >
                                            <Typography variant='body1'>
                                                {item.book.bookName}
                                            </Typography>
                                            <Typography variant='caption'>
                                                by {item.book.author}
                                            </Typography>
                                            <Typography variant='body1'>
                                                Total Price Rs. {item.book.price * item.quantity}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    </>
                                ))}

                                
                                <Button variant='contained' sx={{marginLeft:'35%'}} onClick={this.handleCheckout} size='small'>Checkout</Button>
                                <Button variant='text' onClick={this.handleBack}>Back</Button>      
                            </StepContent>
                        </Step>
                    </Stepper>
                
                </Container>

                )}
                 
            </div>
        );
    }
}

export default Cart;
import './App.css';
import Header from './components/header/Header';
import Login from './components/user/Login';
import Register from './components/user/Register';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import BookstoreHome from './components/home/BookstoreHome';
import VerticalLinearStepper from './components/cart/VerticalLinearStepper';
import Cart from './components/cart/Cart';
import OrderSuccess from './components/order/OrderSuccess';
import MyOrders from './components/order/MyOrders';

function App() {
  return (
    <div>
      {/* <Header /> */}
      
      <BrowserRouter>
        <Header />
        <Switch> 
          
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/home' component={BookstoreHome} />
          <Route path='/cart' component={Cart} />
          <Route path='/order-success' component={OrderSuccess} />
          <Route path='/my-orders' component={MyOrders} />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

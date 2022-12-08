import axios from "axios";

class OrderService{
    baseUrl ="http://localhost:8081/order";

    placeOrder(userId, data){
        return axios.post(`${this.baseUrl}/place-order/${userId}`,data);
    }

    getOrdersByUserId(userId){
        return axios.get(`${this.baseUrl}/user-orders/${userId}`);
    }

    cancelOrder(orderId, userId){
        return axios.put(`${this.baseUrl}/cancel-order/${orderId}/${userId}`);
    }

}

export default new OrderService();
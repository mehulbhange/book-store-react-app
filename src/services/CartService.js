import axios from "axios";

class CartService{

    baseUrl ="http://localhost:8081/cart";

    getCartItemsByUserId(userId){
        return axios.get(`${this.baseUrl}/user-cart/${userId}`);
    }

    addToCart(userId, data){
        return axios.post(`${this.baseUrl}/add-to-cart/${userId}`, data);
    }

    deleteCartItem(id){
        return axios.delete(`${this.baseUrl}/delete/${id}`);
    }

    updateQuantity(userId,cartId,quantity){
        return axios.put(`${this.baseUrl}/update-quantity/${userId}/${cartId}`,null,{params: {quantity}} );
    }

}

export default new CartService();
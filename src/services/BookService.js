import axios from 'axios'

class BookService{
    baseUrl ="http://localhost:8081/book";

    getAllBooks(){
        return axios.get(`${this.baseUrl}/books`);
    }

    getAllBooksSortedByPriceAsc(){
        return axios.get(`${this.baseUrl}/get-books-sorted-by-price-asc`);
    }

    getAllBooksSortedByPriceDesc(){
        return axios.get(`${this.baseUrl}/get-books-sorted-by-price-desc`);
    }

    getAllBooksSortedByName(){
        return axios.get(`${this.baseUrl}/get-books-sorted-by-name`);
    }

}

export default new BookService();
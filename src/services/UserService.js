import axios from 'axios'

class UserService{

    baseUrl ="http://localhost:8081";

    createUser(data){
        return axios.post(`${this.baseUrl}/user`,data);
    }

    loginUser(data){
        return axios.post(`${this.baseUrl}/login`,data);
    }

    async getUserByToken(data){
        return axios.get(`${this.baseUrl}/user-token/${data}`);
    }

}

export default new UserService();
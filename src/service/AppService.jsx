import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/customer/";


class AppService {

    fetchCustomer() {
        return axios.get(USER_API_BASE_URL +"all");
    }

    fetchCustomerById(id) {
        return axios.get(USER_API_BASE_URL +"loadbyid/"+id);
    }

    saveCustomerData(user) {
        return axios.post(USER_API_BASE_URL +"saverecord", user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL +"updaterecord", user)
    }

    deleteCustomer(id) {
        return axios.delete(USER_API_BASE_URL +"deleteById/"+id);
    }

}

export default new AppService();
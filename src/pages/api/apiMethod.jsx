import axios from "axios";
import { API_URL } from "../../utils/constants";


const findAllProducts=()=>{
    return axios.get(API_URL + `products`);
}


export default{
    findAllProducts
}

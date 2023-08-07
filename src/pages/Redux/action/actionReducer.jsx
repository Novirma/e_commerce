/* eslint-disable no-unused-vars */
import ActionTypes from "./actionType";
import apiMethod from "../../api/apiMethod";
import swal from "sweetalert";

// export const getAllProducts = () => async(dispatch) => {
//     try {
//         const res = await apiMethod.findAllProducts();
//         dispatch({
//             type: ActionTypes.GET_PRODUCTS,
//             payload: res.data
//         })
//     } catch (error) {
//         swal(error.message)
//     }
// }

export const doGetProductRequest = () => {
    return{
        type: ActionTypes.GET_PRODUCTS
    }
}

export const doGetProductResponse = (payload) => {
    return{
        type: ActionTypes.GET_PRODUCTS_RESPONSE,
        payload
    }
}


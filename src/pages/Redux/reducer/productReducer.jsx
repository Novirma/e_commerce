/* eslint-disable no-unused-vars */
import ActionTypes from "../action/actionType";

const initialState = {
    products: [],
    message: '',
    status: '',
    refresh: ''
}

function productReducers(state = initialState,action) {
    const {type,payload} = action;

    switch(type) {
        case ActionTypes.GET_PRODUCTS_RESPONSE:
            return {state,products:payload,refresh:true}
    }
}

export default productReducers

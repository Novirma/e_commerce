/* eslint-disable no-unused-vars */
import { call,put } from "redux-saga/effects";
import apiMethod from "../../api/apiMethod";
import { doGetProductResponse } from "../action/actionReducer";

function* handleGetAllProduct(){
    try {
        const result = yield call(apiMethod.findAllProducts);
        console.log("saga", result);
        yield put(doGetProductResponse(result))
    } catch (error) {
        yield put(doGetProductResponse({message:error,status:400}))
    }
}

export{
    handleGetAllProduct
}
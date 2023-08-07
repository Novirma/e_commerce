/* eslint-disable no-unused-vars */
import { takeEvery, all } from "redux-saga/effects";
import ActionTypes from "../action/actionType";
import { handleGetAllProduct } from "./productSaga";

function* watchAll(){
    yield all([
        takeEvery(ActionTypes.GET_PRODUCTS,handleGetAllProduct)
    ])
}

export default watchAll;
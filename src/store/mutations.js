import {ADD_NEW,ADD_OLD} from "./mutation-types";

export default {
  [ADD_OLD](state,payload){
    payload.count+=1
  },
  [ADD_NEW](state,payload){
    payload.checked=false
    state.cartList.push(payload)
  },
}
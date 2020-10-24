import {ADD_NEW,ADD_OLD} from "./mutation-types";
export default {
  addCart: function (context, payload) {
    return new Promise((resolve, reject) =>{
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_OLD, oldProduct)
        resolve('当前数量加1')
      } else {
        payload.count = 1
        context.commit(ADD_NEW, payload)
        resolve('添加新的商品')
      }
    })

  }
}
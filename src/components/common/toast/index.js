import Toast from "./Toast";
const obj={}
obj.install=function (Vue){
  //1创建组件构造器
  const ToastContrustor=Vue.extend(Toast)
  //2根据组件构造器，创建出来一个组件对象
  const toast=new ToastContrustor()
  //3将组件对象，手动挂载到某一元素上
  toast.$mount(document.createElement('div'))
  //toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast=toast
}
export default obj
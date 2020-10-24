<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :value="isSelectAll" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <span class="span2">合计:¥{{TotalPrice}}</span>
    <span class="span3" @click="toasts">去计算     ({{length}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CheckButtonBar",
  components:{
    CheckButton
  },
  computed:{
    TotalPrice(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((pre,item)=>{
        return pre+item.price*item.count
      },0)
    },
    length(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).length
    },
    isSelectAll(){
      if (this.$store.state.cartList.length===0) return false
      return !this.$store.state.cartList.find(item=>!item.checked)
    },
  },
  methods:{
    selectAll(){
      if (this.isSelectAll){
        this.$store.state.cartList.forEach(item=>item.checked=false)
      }else {
        this.$store.state.cartList.forEach(item=>item.checked=true)
      }
    },
    toasts(){
      if (this.$store.state.cartList.filter(item=>item.checked).length===0){
        this.$toast.show('请添加商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.check-button{
  line-height: 20px;
  margin-right: 5px;
}
.check-all{
  display: flex;
  align-items: center;
  line-height: 40px;
  margin-left: 10px;
  flex: 1;
}
.bottom-bar{
  background-color: #eeeeee;
  display: flex;
  align-items: center;
}
.span2{
  flex: 1;
}
.span3{
  background-color: pink;
  color: white;
  flex: 1;
  line-height: 40px;

}
</style>
<template>
  <div v-show="isShow" class="toast">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return{
      isShow:false,
      message:''
    }
  },
  methods:{
    show(res,time){
      this.isShow=true
      this.message=res
      setTimeout(()=>{
        this.isShow=false
        this.message=''
      },time)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  background-color: rgba(0,0,0,.6);
  color: #EEEEEE;
}
</style>
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backactive">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="detail">
        <div v-for="(item,index) in Titles" class="title-item"
             :class="{active:index===currentindex}"
             @click="colorrange(index)"
        >
          <div >{{item}}</div>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data(){
    return{
      Titles:['商品','参数','评论','推荐'],
      currentindex:0
    }
  },
  components:{
    NavBar,

  },
  methods:{
    colorrange(index){
      this.currentindex=index
      this.$emit('titleClick',index)
    },
    backactive(){
      this.$router.go(-1)

    }
  }
}
</script>

<style scoped>
.detail{
  display: flex;
}
.title-item{
  flex: 1;
  margin-top: 10px;
}
.active{
  color: var(--color-high-text);
}

.back img{
  margin-top: 9px;
  width: 20px;
}
</style>